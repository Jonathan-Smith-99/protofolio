import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import type { RegisterForm, LoginForm } from "./types.server";
import { prisma } from "./prisma.server";
import bcrypt from "bcryptjs";
import { createUser } from "./user.server";

export async function register(user: RegisterForm) {
    const exists = await prisma.user.findUnique({ where: { email: user.email } });
    if (exists) {
        return json({ error: "Email already exists" }, { status: 400 });
    }

    const newUser = await createUser(user);
    if (!newUser) {
        return json(
            { 
                error: "Error creating user",
                fields: { email: user.email, password: user.password }
            }, 
            { status: 400 });
    }
    return createUserSession(newUser.id, "/main");
}

export async function login({ email, password }: LoginForm) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return json({ error: "Invalid email or password" }, { status: 400 });
    }

    return createUserSession(user.id, "/main");
}

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'portofolio-session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
    },
})

export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession()
    session.set('userId', userId)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
        })
    }

export async function requireUserId(request: Request, redirectTo: string = new URL(request.url).pathname) {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    if (!userId || typeof userId !== 'string') {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
        throw redirect(`/sign-in?${searchParams}`)
    }
    return userId
}

export async function redirectIfLoggedIn(request:Request) {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    if (!userId || typeof userId !== 'string') {
        throw redirect('/main')
    }
}


function getUserSession(request: Request) {
    return storage.getSession(request.headers.get('Cookie'))
}

async function getUserId(request: Request) {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    if (!userId || typeof userId !== 'string') {
        return null
    }
    return userId
}

export async function getUser(request: Request) {
    const userId = await getUserId(request)
    if (typeof userId !== 'string') {
        return null
    }

    try {
        return await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, firstName: true, lastName: true },
        })
    } catch {
        throw logout(request)
    }
}

export async function logout(request: Request) {
    const session = await getUserSession(request)
    session.unset('userId')
    return redirect('/', {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}

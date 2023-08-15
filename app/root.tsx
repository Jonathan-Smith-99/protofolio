import { type V2_MetaFunction, type LinksFunction, type DataFunctionArgs, redirect, LoaderArgs } from "@remix-run/cloudflare";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";

import { Clerk } from "@clerk/backend" 
import { getAuth } from "@clerk/remix/ssr.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Protofolio, the Remix app" },
    { name: "description", content: "The best app for your protofolio." },
  ];
};


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader(args: LoaderArgs) {
  const clerk = Clerk({
    secretKey: (args.context.env as any).CLERK_SECRET_KEY,
  });
  const { sessionClaims, userId } = await getAuth(args, {
    secretKey: (args.context.env as any).CLERK_SECRET_KEY,
  });

  if (!userId) {
    return redirect("/sign-in");
  }
  //@ts-ignore
  if (sessionClaims.publicMetadata?.onboarded) {
    return redirect("/");
  } else {
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboarded: true,
      },
    });
    return redirect("/sign-up");
  }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

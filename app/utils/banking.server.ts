import { prisma } from './prisma.server';

export const getAccounts = async (userId: string) => {
    return await prisma.accounts.findMany({
        where: {
            userId: userId,
        },
    });
}
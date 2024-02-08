import {serverAuth$} from "@builder.io/qwik-auth";
import type {Provider} from "@auth/core/providers";
import Credentials from "@auth/core/providers/credentials";
import prisma from "~/lib/prisma";
import { compareSync } from "bcrypt-ts";

export async function getUserByName(name: string) {
    return prisma.user.findUnique({
        where: {
            name,
        },
    });
}


export async function checkUser(username: string, password: string) {
    const user = await getUserByName(username);

    if (!user) {
        throw new Error('User not found');
    }

    const match = compareSync(password, user.password);

    if (match) {
        return user;
    }
}

export const {onRequest, useAuthSession, useAuthSignin, useAuthSignout} =
    serverAuth$(({env}) => ({
        secret: env.get("AUTH_SECRET"),
        trustHost: true,
        providers: [
            Credentials({
                name: "Credentials",
                credentials: {
                    username: {label: "Username", type: "text", placeholder: "Name"},
                    password: {label: "Password", type: "password"},
                },
                async authorize(credentials) {
                    // Add logic here to look up the user from the credentials supplied

                    if (!credentials.username || !credentials.password) {
                        throw new Error('No credentials provided');
                    }

                    const user = await checkUser(credentials.username as string, credentials.password as string);
                    if (user) {
                        // Any object returned will be saved in `user` property of the JWT
                        return user
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        return null

                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    }


                },
            }),
            // GitHub({
            //     clientId: env.get("GITHUB_ID")!,
            //     clientSecret: env.get("GITHUB_SECRET")!,
            // }),
        ] as Provider[],
    }));

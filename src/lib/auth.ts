/* eslint-disable  @typescript-eslint/no-explicit-any */
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { fetchLoginAPI } from "@/lib/http/auth";
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string,
        new: boolean,
        user: {
        } & DefaultSession["user"]
    }
}
declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string,
        new: boolean,
    }
}
export const authOptions: NextAuthOptions = {
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account }: any) {
            if (account) {
                const login = await fetchLoginAPI(account.access_token)
                token.accessToken = login.token
                if (typeof login.new !== "undefined") {
                    token.new = login.new;
                }
            }
            return token
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken
            if (typeof token.new !== "undefined") {
                session.new = token.new;
            }
            return session
        },
    },
}
export default NextAuth(authOptions)
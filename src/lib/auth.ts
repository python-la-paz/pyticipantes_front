import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { fetchLoginAPI } from "@/lib/http/auth";
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        accessToken: string,
        user: {
            /** The user's postal address. */
        } & DefaultSession["user"]
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
                const accessToken = await fetchLoginAPI(account.access_token)
                console.log(accessToken)
                token.accessToken = accessToken
            }
            return token
        },
        async session({ session, token, user }: any) {
            session.accessToken = token.accessToken
            console.log(token.accessToken)
            return session
        }
    }
}
export default NextAuth(authOptions)
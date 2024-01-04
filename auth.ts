import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from "./lib/prismadb"
import {  getUserById } from "./lib/server-actions/actions"



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
    callbacks: {
   
      async jwt({ token, user }) {

        if(!token.sub) return token

        const existingUser = await getUserById(token.sub)

        if(!existingUser) return token
        token.role = existingUser.role
        token.name = existingUser.businessName

        return token
      },
       
      async session({ session, token }) {
        if (token.sub && session.user) {
          session.user.id = token.sub
        }

        if(token.role && session.user) {
          session.user.role = token.role
        }

        if(token.name && session.user) {
          session.user.name = token.name
        }
        return session
      }
    },
    adapter: PrismaAdapter(prismadb),
    session: {strategy: 'jwt'},
    ...authConfig,
})
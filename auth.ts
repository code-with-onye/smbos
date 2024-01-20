import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismadb from "./lib/prismadb"
import {  getUserById } from "./lib/server-actions/actions"
import { UserRole } from "@prisma/client"
import { getOrgByUserId } from "./lib/server-actions/org"



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({

   pages: {
    signIn: '/login',
    error: '/error',
     
   },
    events: {
      async linkAccount({ user }) {
        await prismadb.user.update({
          where: {
            id: user.id
          },
          data: {
            emailVerified: new Date()
          }
        })
      }
    },
    callbacks: {
   
      async jwt({ token, user }) {

        if(!token.sub) return token

        const existingUser = await getUserById(token.sub)
        const existingOrg = await getOrgByUserId(token.sub)
        


        if(!existingUser) return token
        token.role = existingUser.role
        token.name = existingUser.name
        token.accessToken = existingUser.accessToken
        token.orgnization = existingOrg?.id
        

      

        return token
      },
       
      async session({ session, token }) {
        if (token.sub && session.user) {
          session.user.id = token.sub
        }

        if(token.role && session.user) {
          session.user.role = token.role as UserRole
        }

        if(token.name && session.user) {
          session.user.name = token.name
        }

        if(token.accessToken && session.user) {
          session.user.accessToken = token.accessToken as string
        }

        if(token.orgnization && session.user) {
          session.user.orgnization = token.orgnization as string
        }
        
      
        return session
      }
    },
    adapter: PrismaAdapter(prismadb),
    session: {strategy: 'jwt'},
    ...authConfig,
})
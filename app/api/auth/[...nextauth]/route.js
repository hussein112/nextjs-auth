import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try{
          const res = await axios.post('https://express-auth-9qaq.onrender.com/login', credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
          });
          console.log(res);
          const user = await res.data
          if(res.status == 429){
            throw new Error(user.error);
          }
  
          if (res.status == 200 && user) {
            return user
          }
          return null
        }catch(error){
          if(typeof error.response.data.error !== 'undefined'){
            throw new Error(error.response.data.error);
          }else{
            throw new Error(error.response.data);
          }
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },

    async session({ token, session }) {
      session.user = token.user
      return session
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
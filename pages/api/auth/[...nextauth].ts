import NextAuth from "next-auth";
import dbConnect from "../../../lib/db";
import User from "../../../models/User";
import CredentialsProvider from "next-auth/providers/credentials";

// Remplace par l'email autorisé
const allowedEmail = process.env.SMTP_USER;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();
        // Vérifie que l'email correspond à l'utilisateur autorisé
        if (credentials?.email !== allowedEmail) {
          return null;
        }
        const user = (await User.findOne({ email: credentials?.email })) as {
          _id: any;
          name: string;
          email: string;
          password: string;
        } | null;
        // Comparaison du mot de passe en clair
        if (user && credentials?.password) {
          if (credentials.password === user.password) {
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
            };
          }
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  // secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === "development",
});

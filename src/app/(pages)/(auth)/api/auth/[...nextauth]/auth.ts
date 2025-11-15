import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prismadb } from "@/lib/db";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing password or email");
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          photo: user.photo,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as User;
        token.id = u.id;
        token.email = u.email;
        token.username = u.username;
        token.firstName = u.firstName;
        token.lastName = u.lastName;
        token.photo = u.photo;
      }
      return token;
    },
    async session({ session, token }) {
      // cast session.user to any so we can add custom fields without type errors
      const user = (session.user ?? {}) as User;
      if (token) {
        user.id = token.id as string;
        user.email = token.email as string;
        user.username = token.username as string;
        user.firstName = token.firstName as string;
        user.lastName = token.lastName as string;
        user.photo = token.photo as string;
      }
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

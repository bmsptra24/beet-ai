import { validation } from "@/utils/authorize";
import { prismaFindUniqueUser } from "@/utils/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        console.log(credentials);

        const user = await prismaFindUniqueUser({
          email: credentials?.email,
        });
        if (await validation(user, credentials as any)) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/app/sign/in",
  },
};

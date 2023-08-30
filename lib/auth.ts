import { Authorize } from "@/types/types";
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
      // credentials: {
      //   name: { label: "Name", type: "text", placeholder: "Your Cool Name" },
      //   username: {
      //     label: "Username",
      //     type: "text",
      //     placeholder: "your_amazing_username",
      //   },
      //   email: {
      //     label: "Email",
      //     type: "email",
      //     placeholder: "example@example.com",
      //   },
      //   password: { label: "Password", type: "password" },
      // },
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
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
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === baseUrl + "/") {
        return "/home";
      }

      // if (url === process.env.URL + "/home") return console.log(2);
      return url;
    },
  },
};

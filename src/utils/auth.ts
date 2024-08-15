import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;

export function getServerAuth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}

export function getClientAuth() {
  return getSession();
}

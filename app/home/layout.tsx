"use client";
import { NextAuthProvider } from "@/app/providers";
import ReduxWrapper from "@/store/ReduxWrapper";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxWrapper>
      <NextAuthProvider>{children}</NextAuthProvider>
    </ReduxWrapper>
  );
}

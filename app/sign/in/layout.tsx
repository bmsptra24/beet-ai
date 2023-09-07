import { NextAuthProvider } from "@/app/providers";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}

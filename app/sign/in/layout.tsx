import { NextAuthProvider } from "@/app/providers";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}

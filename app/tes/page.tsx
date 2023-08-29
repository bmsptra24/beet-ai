import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/components/test/Button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/components/test/user.component";
import { prismaFindMany } from "@/utils/prisma";
export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  // const users = await prismaFindMany("user");
  // console.log(users);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />

        <h1>Server Session</h1>
        <pre>{JSON.stringify(session)}</pre>

        <User />
      </div>
    </main>
  );
}

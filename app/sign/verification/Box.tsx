import { User } from "@/types/types";
import { prismaFindUniqueUser, prismaUpdateUser } from "@/utils/prisma";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const Box = () => {
  // ! send email (dont use useEffect)
  // ! verivication the code and go to home
  // ! also go this page if user login and not verificated

  const { data: session, status } = useSession();

  const code = useRef(0);
  const email = session?.user?.email || "";
  const router = useRouter();

  const isCodeValid = async () => {
    const data: User = await prismaFindUniqueUser({
      where: { email },
      include: { Verification: true },
    });
    if (!data?.Verification?.[0]?.code) return false;
    if (data?.Verification?.[0]?.code !== code.current) return false;
    await prismaUpdateUser({ where: { email: email }, data: { status: true } });
    alert("User verificated!");
    return true;
  };

  return (
    <main className="min-h-screen relative text-xl flex items-center justify-center bg-primary-four ">
      <div className="flex flex-col">
        <p>{email}</p>
        <input
          type="number"
          onChange={(e) => (code.current = Number(e.target.value))}
        />
        <button
          onClick={async () => {
            if (!(await isCodeValid())) throw "Verification Fail!";
            router.push("/home");
          }}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Box;

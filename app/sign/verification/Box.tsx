import { prismaFindUniqueUser } from "@/utils/prisma";
import { useSession } from "next-auth/react";
import { useRef } from "react";

const Box = () => {
  // ! send email (dont use useEffect)
  // ! verivication the code and go to home
  // ! also go this page if user login and not verificated

  const { data: session, status } = useSession();
  const email = session?.user?.email || "";
  //   console.log(session, status);
  const code = useRef("");

  const isCodeValid = async () => {
    // ! perbaiki type data
    const data = await prismaFindUniqueUser({ email }, { Verification: true });
    console.log(data);

    // if (data. !== Number(code)) {
    // }
  };
  isCodeValid();

  return (
    <main className="min-h-screen relative text-xl flex items-center justify-center bg-primary-four ">
      <div className="flex flex-col">
        <p>{email}</p>
        <input
          type="number"
          onChange={(e) => (code.current = e.target.value)}
        />
        <button>Next</button>
      </div>
    </main>
  );
};

export default Box;

"use client";

import { Card, CardAddproject } from "@/components/elements/Card";
import { signOut } from "next-auth/react";

const page: React.FC = () => {
  return (
    <main className="min-h-screen relative text-xl flex flex-col overflow-y-scroll items-center bg-primary-tree/25">
      <button
        className="absolute right-10 top-10 p-3 bg-primary-one z-50 rounded-xl text-primary-white press-md press-md-active"
        onClick={() => {
          signOut({ redirect: true, callbackUrl: "/sign/in" });
        }}
      >
        Sign Out
      </button>
      <img
        src="https://static.vecteezy.com/system/resources/previews/023/870/218/original/telephone-pole-on-dreamy-night-sky-lo-fi-chill-wallpaper-electrical-cables-on-evening-sky-2d-cartoon-landscape-illustration-vaporwave-background-80s-retro-album-art-synthwave-aesthetics-vector.jpg"
        className="bg-primary-one h-[24rem] w-full object-cover absolute left-0 right-0 z-10"
      ></img>
      <section className="grid grid-cols-3 justify-items-center gap-10 w-fit absolute top-48 z-20 pb-10">
        <CardAddproject />
        <Card path="/studio" title="Minato" platform="Youtube" />
        <Card path="/studio" title="Minato" platform="Youtube" />
        <Card path="/studio" title="Minato" platform="Youtube" />
        <Card path="/studio" title="Minato" platform="Youtube" />
        <Card path="/studio" title="Minato" platform="Youtube" />
      </section>
    </main>
  );
};

export default page;

// const page = () => {
//   const [ytId, setYtId] = useState("sldoGfcRSe4");
//   const [ytMessages, setYtMessages]: any[] = useState([
//     {
//       author: "Hi",
//       message: "",
//     },
//   ]);

//   const handlerInput = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     setState: React.Dispatch<React.SetStateAction<string>>
//   ) => {
//     setState(event.target.value);
//   };

//   const getMessageHandler = async () => {
//     setYtMessages(await ytGetLiveChat(ytId, 100));
//   };

//   return (
//     <main className="min-h-screen text-xl flex justify-center items-center gap-10">
//       {/* <iframe
//         src={`https://www.youtube.com/embed/${ytId}`}
//         frameBorder="0"
//       ></iframe> */}
//       <div className="flex flex-col justify-center items-center gap-5">
//         <p>Masukan ID Youtube</p>
//         <input
//           onChange={(event) => handlerInput(event, setYtId)}
//           value={ytId}
//           type="text"
//           className="border-2 border-slate-950"
//         />
//         <button
//           onClick={() => getMessageHandler()}
//           className="bg-sky-400 p-3 rounded-xl hover:bg-sky-500"
//         >
//           Start
//         </button>
//       </div>
//       <div className="h-96 overflow-y-scroll">
//         {ytMessages &&
//           ytMessages?.map((message: any, index: any) => (
//             <div
//               key={index}
//               className="flex cursor-pointer bg-slate-400 hover:bg-slate-300"
//               onClick={async () => {
//                 console.log(await generateAiAnswer(message));
//               }}
//             >
//               <p>{`Author: ${message.author}`}</p>
//               <p>{`Message: ${message.message}`}</p>
//             </div>
//           ))}
//       </div>
//     </main>
//   );
// };

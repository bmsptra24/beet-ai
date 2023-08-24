"use client";
import { ytGetLiveChat } from "@/sevices/ytGetLiveChat";
import axios from "axios";
import React, { useState } from "react";

// const getLiveChat = async (
//   liveChatId: string,
//   apiKey: string,
//   maxResult: number
// ) => {
//   return await fetch(
//     `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet&key=${apiKey}&maxResults=${maxResult}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const result = data.items.map((item: any) => {
//         const message = item.snippet.displayMessage;
//         const author = item.snippet.authorDisplayName;
//         const data = { author, message };
//         return data;
//       });
//       return result;
//     })
//     .catch((error) => console.error(error));
// };

// const getDataStream = async (apiKey: string, livestreamId: string) => {
//   const data = await fetch(
//     `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${livestreamId}&key=${apiKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const livestreamData = data.items[0].liveStreamingDetails;
//       return livestreamData;
//     })
//     .catch((error) => console.error(error));
//   return data;
// };

// const getRandomNumber = (min: number, max: number) => {
//   return Math.floor(Math.random() * (max - 1 - min + 1)) + min;
// };

// const getChatYT = async (
//   apiKey: string,
//   livestreamId: string,
//   maxResult: number
// ) => {
//   const detailStream = await getDataStream(apiKey, livestreamId); // get livestreamId
//   const chatStream = await getLiveChat(
//     detailStream.activeLiveChatId,
//     apiKey,
//     Number(maxResult)
//   );
//   if (chatStream.length > 0) {
//     console.log({ chatStream });

//     const getAnswer = async (prompt: any) => {
//       console.log("get data");

//       const formattedString = `[${prompt.author}: ${prompt.message}]`;
//       const input = [
//         {
//           role: "system",
//           content:
//             'jawab komentar ini dengan semangat dan pakai bahasa indonesia. respon berupa json, "answer": ""',
//         },
//         { role: "user", content: formattedString },
//       ];

//       const params = new URLSearchParams({
//         data: JSON.stringify(input),
//       }).toString();
//       const link = `${"https://mejabelajardigital-rest-api.vercel.app/gpt/get-answer"}?${params}`;
//       const data = await axios
//         .get(link)
//         .then((data) => data.data)
//         .catch((error) => error.response.data.body);
//       return data;
//     };
//     const text = await getAnswer(
//       // generate the answer
//       chatStream[getRandomNumber(0, chatStream.length)]
//       //   dummyData[getRandomNumber(0, dummyData.length)]
//     );
//     console.log({ text });
//     // await textToSpeech(text); // text to mp3
//     // await playAudio(); // play the mp3
//   }
// };

interface prompt {
  author: string;
  message: string;
}

const getAnswer = async (prompt: prompt) => {
  console.log("get data");

  const formattedString = `[${prompt.author}: ${prompt.message}]`;
  const input = [
    {
      role: "system",
      content:
        'jawab komentar ini dengan semangat dan pakai bahasa indonesia. respon berupa json, "answer": ""',
    },
    { role: "user", content: formattedString },
  ];

  const params = new URLSearchParams({
    data: JSON.stringify(input),
  }).toString();
  const link = `${"https://mejabelajardigital-rest-api.vercel.app/gpt/get-answer"}?${params}`;
  const data = await axios
    .get(link)
    .then((data) => data.data)
    .catch((error) => error.response.data.body);
  return data;
};

const page = () => {
  const [ytId, setYtId] = useState("sldoGfcRSe4");
  const [ytMessages, setYtMessages]: any[] = useState([
    {
      author: "Hi",
      message: "",
    },
  ]);

  const handlerInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  };

  const getMessageHandler = async () => {
    setYtMessages(await ytGetLiveChat(ytId, 100));
  };

  return (
    <main className="min-h-screen text-xl flex justify-center items-center gap-10">
      {/* <iframe
        src={`https://www.youtube.com/embed/${ytId}`}
        frameBorder="0"
      ></iframe> */}
      <div className="flex flex-col justify-center items-center gap-5">
        <p>Masukan ID Youtube</p>
        <input
          onChange={(event) => handlerInput(event, setYtId)}
          value={ytId}
          type="text"
          className="border-2 border-slate-950"
        />
        <button
          onClick={() => getMessageHandler()}
          className="bg-sky-400 p-3 rounded-xl hover:bg-sky-500"
        >
          Start
        </button>
      </div>
      <div className="h-96 overflow-y-scroll">
        {ytMessages &&
          ytMessages?.map((message: any, index: any) => (
            <div
              key={index}
              className="flex cursor-pointer bg-slate-400 hover:bg-slate-300"
              onClick={async () => {
                console.log(await getAnswer(message));
              }}
            >
              <p>{`Author: ${message.author}`}</p>
              <p>{`Message: ${message.message}`}</p>
            </div>
          ))}
      </div>
    </main>
  );
};

export default page;

import { Prompt } from "@/types/types";
import axios from "axios";

export const generateAiAnswer = async (prompt: Prompt) => {
  console.log("generate anwer");

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

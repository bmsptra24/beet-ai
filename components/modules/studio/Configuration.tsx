"use client";
import { Dropdown, Input, Textarea } from "@/components/elements/Input";
import { generateAiAnswer } from "@/utils/openai";
import { ytGetLiveChat } from "@/utils/services/ytGetLiveChat";
import React, { useState } from "react";

const Configuration = () => {
  const [livestreamId, setLivestreamId] = useState(
    "siapa itu naruto dan apakah filnmnya seru?"
  );
  const [avatarName, setAvatarName] = useState("Minato");
  const [aiRole, setAiRole] = useState(
    "Tugas utamaku adalah membantu menjawab pertanyaan kalian dengan cara yang menarik dan informatif."
  );
  const [livestreamTopic, setLivestreamTopic] = useState(
    "Membahas film naruto"
  );
  const [mood, setMood] = useState("happy");
  const [platform, setPlatform] = useState("youtube");
  const [language, setLanguage] = useState("indonesia");
  const [aiKnowlagge, setAiKnowlagge] = useState("Kamu dibuat pada 27-8-2023");

  const handlerGetChatLive = async (livestreamId: string) => {
    console.log(await ytGetLiveChat(livestreamId, 500));
  };

  const handlerGenerateAnswer = async () => {
    console.log(
      await generateAiAnswer(
        { author: "Bimbim", message: livestreamId },
        avatarName,
        aiRole,
        livestreamTopic,
        mood,
        language,
        aiKnowlagge
      )
    );
  };
  return (
    <>
      <div className="flex grow flex-col gap-5">
        <p className="text-4xl">Configuration</p>
        <div className="flex gap-5">
          <Input
            placeholder="your-livestream-id"
            setState={setLivestreamId}
            state={livestreamId}
            className="grow"
          />
          <button
            onClick={() => handlerGetChatLive(livestreamId)}
            className="flex px-3 bg-primary-white items-center justify-between press-shadow-sm press-sm"
          >
            <p className="grow">Connect</p>
          </button>
        </div>
        <Input
          placeholder="Your Cool Avatar Name"
          setState={setAvatarName}
          state={avatarName}
        />
        <Input placeholder="your-ai-role" setState={setAiRole} state={aiRole} />
        <Input
          placeholder="your-livestream-topic"
          setState={setLivestreamTopic}
          state={livestreamTopic}
        />

        <Dropdown setState={setMood} state={mood}>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
        </Dropdown>

        <Dropdown setState={setPlatform} state={platform}>
          <option value="youtube">Youtube</option>
          <option value="tiktok">Tiktok</option>
        </Dropdown>

        <Dropdown setState={setLanguage} state={language}>
          <option value="indonesia">Indonesia</option>
          <option value="english">English</option>
        </Dropdown>

        <Textarea
          placeholder="your-ai-knowlage"
          state={aiKnowlagge}
          setState={setAiKnowlagge}
        />
      </div>
      <div>
        <button
          onClick={() => handlerGenerateAnswer()}
          className="flex text-3xl bg-primary-white px-3 items-center justify-between press-shadow-sm press-sm"
        >
          <p className="grow">Start AI</p>
        </button>
      </div>
    </>
  );
};

export default Configuration;

"use client";
import { Dropdown, Input, Textarea } from "@/components/elements/Input";
import { TestSound } from "@/components/test/TestSound";
import { generateAiAnswer } from "@/utils/openai";
import { prismaFindUniqueProject, prismaUpdateProject } from "@/utils/prisma";
import { ytGetLiveChat } from "@/utils/services/ytGetLiveChat";
import React, { useEffect, useState } from "react";

const Configuration = () => {
  const dummyId = 1;

  const [livestreamId, setLivestreamId] = useState(" ");
  const [avatarName, setAvatarName] = useState(" ");
  const [aiRole, setAiRole] = useState(" ");
  const [livestreamTopic, setLivestreamTopic] = useState(" ");
  const [mood, setMood] = useState(" ");
  const [platform, setPlatform] = useState(" ");
  const [language, setLanguage] = useState(" ");
  const [aiKnowlagge, setAiKnowlagge] = useState(" ");

  useEffect(() => {
    const initState = async () => {
      const project = await prismaFindUniqueProject({ id: dummyId });

      setLivestreamId(project?.livestreamingId || "");
      setAvatarName(project?.avatarName || "");
      setAiRole(project?.aiRole || "");
      setLivestreamTopic(project?.livestreamTopic || "");
      setMood(project?.mood || "");
      setPlatform(project?.platform || "");
      setLanguage(project?.language || "");
      setAiKnowlagge(project?.aiKnowlagge || "");
    };
    initState();
  }, []);

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
      <TestSound />
      <div className="flex grow flex-col gap-5">
        <p className="text-4xl">Configuration</p>
        <div className="flex gap-5">
          <Input
            placeholder="your-livestream-id"
            setState={setLivestreamId}
            state={livestreamId}
            className="grow"
            callback={() =>
              prismaUpdateProject({
                where: { id: 1 },
                data: { livestreamingId: livestreamId },
              })
            }
          />
          <button
            onClick={() => handlerGetChatLive(livestreamId)}
            className="flex px-3 bg-primary-white items-center justify-between press-shadow-sm press-sm"
          >
            <p className="grow">Connect</p>
          </button>
          <button
            onClick={() => {
              const text = "Hai nama kamu siapa ya";

              const synth = window.speechSynthesis;

              const utterance = new SpeechSynthesisUtterance(text);

              synth.speak(utterance);
            }}
            className="flex px-3 bg-primary-white items-center justify-between press-shadow-sm press-sm"
          >
            <p className="grow">TEST</p>
          </button>
        </div>
        <Input
          placeholder="Your Cool Avatar Name"
          setState={setAvatarName}
          state={avatarName}
          callback={() =>
            prismaUpdateProject({
              where: { id: 1 },
              data: { avatarName: avatarName },
            })
          }
        />
        <Input
          placeholder="your-ai-role"
          setState={setAiRole}
          state={aiRole}
          callback={() =>
            prismaUpdateProject({
              where: { id: 1 },
              data: { aiRole: aiRole },
            })
          }
        />
        <Input
          placeholder="your-livestream-topic"
          setState={setLivestreamTopic}
          state={livestreamTopic}
          callback={() =>
            prismaUpdateProject({
              where: { id: 1 },
              data: { livestreamTopic: livestreamTopic },
            })
          }
        />

        <Dropdown
          setState={setMood}
          state={mood}
          callback={() =>
            prismaUpdateProject({
              where: { id: 1 },
              data: { mood: mood },
            })
          }
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
        </Dropdown>

        <Dropdown
          setState={setPlatform}
          state={platform}
          callback={() =>
            prismaUpdateProject({
              where: { id: 1 },
              data: { platform: platform },
            })
          }
        >
          <option value="youtube">Youtube</option>
          <option value="tiktok">Tiktok</option>
        </Dropdown>

        <Dropdown
          setState={setLanguage}
          state={language}
          callback={() =>
            prismaUpdateProject({
              where: { id: 1 },
              data: { language: language },
            })
          }
        >
          <option value="indonesia">Indonesia</option>
          <option value="english">English</option>
        </Dropdown>

        <Textarea
          placeholder="your-ai-knowlage"
          state={aiKnowlagge}
          setState={setAiKnowlagge}
          callback={() =>
            prismaUpdateProject({
              where: { id: 1 },
              data: { aiKnowlagge: aiKnowlagge },
            })
          }
        />
      </div>
      <div>
        <button
          disabled
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

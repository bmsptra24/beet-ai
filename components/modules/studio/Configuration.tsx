"use client";
import { Dropdown, Input, Textarea } from "@/components/elements/Input";
import { TestSound } from "@/components/test/TestSound";
import { currProjectAction } from "@/store/actions/currIdProject.slice";
import { RootState } from "@/store/store";
import { generateAiAnswer } from "@/utils/openai";
import { prismaUpdateProject } from "@/utils/prisma";
import { ytGetLiveChat } from "@/utils/services/ytGetLiveChat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Configuration = () => {
  const {
    aiKnowlagge,
    aiRole,
    avatarName,
    id,
    language,
    livestreamTopic,
    livestreamingId,
    mood,
    platform,
  } = useSelector((state: RootState) => state.currProject);
  const {
    setAiKnowlagge,
    setAiRole,
    setAvatarName,
    setLanguage,
    setLivestreamTopic,
    setLivestreamingId,
    setMood,
    setPlatform,
  } = currProjectAction;

  const handlerGetChatLive = async (livestreamId: string) => {
    console.log(await ytGetLiveChat(livestreamId, 500));
  };

  const handlerGenerateAnswer = async () => {
    console.log(
      await generateAiAnswer(
        { author: "Bimbim", message: livestreamingId },
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
            setState={setLivestreamingId}
            state={livestreamingId}
            className="grow"
            callback={() => {
              try {
                prismaUpdateProject({
                  where: { id: 0 },
                  data: { livestreamingId },
                }).catch((error) => {
                  if (error?.digest === "2750255691")
                    alert("Project not found!");
                });
              } catch (error) {
                throw error;
              }
            }}
          />
          <button
            onClick={() => handlerGetChatLive(livestreamingId)}
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
              where: { id },
              data: { avatarName },
            })
          }
        />
        <Input
          placeholder="your-ai-role"
          setState={setAiRole}
          state={aiRole}
          callback={() =>
            prismaUpdateProject({
              where: { id },
              data: { aiRole },
            })
          }
        />
        <Input
          placeholder="your-livestream-topic"
          setState={setLivestreamTopic}
          state={livestreamTopic}
          callback={() =>
            prismaUpdateProject({
              where: { id },
              data: { livestreamTopic },
            })
          }
        />

        <Dropdown
          setState={setMood}
          state={mood}
          callback={() =>
            prismaUpdateProject({
              where: { id },
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
              where: { id },
              data: { platform },
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
              where: { id },
              data: { language },
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
              where: { id },
              data: { aiKnowlagge },
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

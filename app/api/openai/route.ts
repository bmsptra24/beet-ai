'use server'
import { NextResponse, NextRequest } from 'next/server'
import { OpenAI } from 'langchain/llms/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { HumanMessage } from 'langchain/schema'
import { ChatMessageHistory } from 'langchain/memory'
import { ChatPromptTemplate } from 'langchain/prompts'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userName: string | null = searchParams.get('userName')
  const userMessage: string | null = searchParams.get('userMessage')
  const avatarName: string | null = searchParams.get('avatarName')
  const aiRole: string | null = searchParams.get('aiRole')
  const livestreamTopic: string | null = searchParams.get('livestreamTopic')
  const mood: string | null = searchParams.get('mood')
  const language: string | null = searchParams.get('language')
  const aiKnowladge: string | null = searchParams.get('aiKnowladge')

  // empty data
  if (userMessage === null)
    return NextResponse.json({
      message: 'Invalid params!',
      body: { role: 'assistant', content: 'Error...400' },
    })

  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: Number(process.env.OPENAI_TEMPERATURE),
    maxTokens: Number(process.env.OPENAI_MAX_TOKEN),
    topP: Number(process.env.OPENAI_TOP_P),
    frequencyPenalty: Number(process.env.OPENAI_FREQUENCY_PENALTY),
    presencePenalty: Number(process.env.OPENAI_PRESENCE_PENALTY),
  })
  const history = new ChatMessageHistory()
  const template = `[Avatar: {avatarName}]
    [Tugas AI: {aiRole}]
    [Live Stream: {livestreamTopic}]
    [Mood: {mood}]
    [Language: {language}]
    [AI Knowledge: {aiKnowladge}]

    AI VTuber: Halo semuanya! Aku, {avatarName}, siap untuk live stream kali ini. Sebelum kita mulai, mari kita lihat komentar dari {userName}, yang bertanya, "{userMessage}". Terima kasih atas pertanyaannya, {userName}!

    Kalian pasti penasaran dengan topik kita hari ini, yaitu {livestreamTopic}. {aiRole} Nah, sebelum kita masuk lebih dalam, perlu diingat suasana hatiku saat ini sedang {mood} dan aku akan berbicara dalam bahasa {language}.

    Aku telah diprogram dengan pengetahuan berikut ini {aiKnowladge}, jadi aku siap untuk menjawab pertanyaan-pertanyaan kalian seputar {livestreamTopic}. Jangan ragu untuk menanyakan apapun!

    Sekali lagi, selamat datang di live stream kali ini. Mari bersenang-senang dan belajar bersama. Ayo mulai!`
  const humanTemplate = '{userName} : {userMessage}'

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', template],
    ['human', humanTemplate],
  ])

  const formattedChatPrompt = await chatPrompt.formatMessages({
    userName,
    userMessage,
    avatarName,
    aiRole,
    livestreamTopic,
    mood,
    language,
    aiKnowladge,
  })

  // await history.addUserMessage('Hi!')
  // await history.addAIChatMessage("What's up?")
  // await history.addUserMessage(input)
  // const messages = await history.getMessages()
  // ! store messagees into db
  try {
    const response = await chatModel.predictMessages(formattedChatPrompt)
    const data = response?.content
    console.log({ data, formattedChatPrompt })
    return NextResponse.json({ data, formattedChatPrompt })
  } catch (error) {
    console.log({ error })
    return NextResponse.json({
      message: error,
      body: { role: 'assistant', content: 'Error...404' },
    })
  }
}

'use server'
import { Prompt } from '@/types/types'
import axios from 'axios'
console.log('tes')

export const generateAiAnswer = async (
  prompt: Prompt,
  avatarName: string,
  aiRole: string,
  livestreamTopic: string,
  mood: string,
  language: string,
  aiKnowladge: string,
) => {
  const formattedString = `[${prompt.author}: ${prompt.message}]`
  const input = [
    {
      role: 'system',
      content: `
        [Avatar: ${avatarName}]
        [Tugas AI: ${aiRole}]
        [Live Stream: ${livestreamTopic}]
        [Mood: ${mood}]
        [Language: ${language}]
        [AI Knowledge: ${aiKnowladge}]

        AI VTuber: Halo semuanya! Aku, ${avatarName}, siap untuk live stream kali ini. Sebelum kita mulai, mari kita lihat komentar dari ${prompt.author}, yang bertanya, "${prompt.message}". Terima kasih atas pertanyaannya, ${prompt.author}!

        Kalian pasti penasaran dengan topik kita hari ini, yaitu ${livestreamTopic}. ${aiRole} Nah, sebelum kita masuk lebih dalam, perlu diingat suasana hatiku saat ini sedang ${mood} dan aku akan berbicara dalam bahasa ${language}.

        Aku telah diprogram dengan pengetahuan berikut ini ${aiKnowladge}, jadi aku siap untuk menjawab pertanyaan-pertanyaan kalian seputar ${livestreamTopic}. Jangan ragu untuk menanyakan apapun!

        Sekali lagi, selamat datang di live stream kali ini. Mari bersenang-senang dan belajar bersama. Ayo mulai!
        
        Keluaran: {
          answer: ""
        }
        `,
    },
    { role: 'user', content: formattedString },
  ]

  console.log('generate anwer')

  const params = new URLSearchParams({
    data: JSON.stringify(input),
  }).toString()
  const link = `${process.env.URL}/api/openai?userName=${prompt.author}&userMessage=${prompt.message}&avatarName=${avatarName}&aiRole=${aiRole}&livestreamTopic=${livestreamTopic}&mood=${mood}&language=${language}&aiKnowledge=${aiKnowladge}`
  const data = await axios
    .get(link)
    .then((data) => data.data)
    .catch((error) => error.response.data.body)
  return data
}

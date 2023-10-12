'use client'
import { QueueProps } from '@/types/types'
import axios, { AxiosRequestConfig } from 'axios'
import { useState, useEffect } from 'react'

// export const textToSpeech = (text: string) => {
//   console.log("speech start", text);

//   const synth = window.speechSynthesis;

//   const utterance = new SpeechSynthesisUtterance(text);

//   return synth.speak(utterance);
// };

export const textToSpeech = async (inputText: string) => {
  // const API_KEY = '263b70c0b7933fe0cf2b3a201f26fb7e'
  // const VOICE_ID = 'TxGEqnHWrfWFTfGW9XjX'
  // const options = {
  //   method: 'POST',
  //   url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
  //   headers: {
  //     accept: 'audio/mpeg',
  //     'content-type': 'application/json',
  //     'xi-api-key': `${API_KEY}`,
  //   },
  //   data: {
  //     text: inputText,
  //     model: 'eleven_monolingual_v2',
  //   },
  //   responseType: 'arraybuffer',
  // }
  // const speechDetails = await axios.request(options as AxiosRequestConfig)
  // return speechDetails.data
}

export const AudioPlayer = ({
  queues,
  setQueue,
}: {
  queues: QueueProps
  setQueue: Function
}) => {
  const [audioURL, setAudioURL] = useState('')
  const [audioElement, setAudioElement] = useState(null)

  const handleAudioFetch = async () => {
    if (queues.length > 0) {
      console.log('get tts')

      const text = queues[0].message
      // const data = await textToSpeech(text)
      // const blob = new Blob([data], { type: 'audio/mpeg' })
      // const url = URL.createObjectURL(blob)
      const url: any = await axios.get(
        (process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://beet-ai.vercel.app') +
          '/api/edenai?inputText=' +
          text,
      )
      // console.log({ url })
      setAudioURL(url?.data as string)
    }
  }

  useEffect(() => {
    if (audioURL === '') handleAudioFetch()
  }, [queues, setQueue, audioElement, audioURL])

  // console.log({ audioURL })

  return (
    <div>
      {audioURL !== '' && (
        <audio
          onEnded={() => {
            setQueue((prevQueue: QueueProps) => prevQueue.slice(1))
            setAudioURL('')
          }}
          autoPlay
          controls
          className="w-full"
          id="audioPlayer"
        >
          <source src={audioURL} type="audio/mpeg" />
        </audio>
      )}
    </div>
  )
}

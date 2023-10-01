'use server'

import axios, { AxiosRequestConfig } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const inputText: string | null = searchParams.get('inputText')

  const API_KEY = '263b70c0b7933fe0cf2b3a201f26fb7e'
  const VOICE_ID = 'TxGEqnHWrfWFTfGW9XjX'

  const options = {
    method: 'POST',
    url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    headers: {
      accept: 'audio/mpeg',
      'content-type': 'application/json',
      'xi-api-key': `${API_KEY}`,
    },
    data: {
      text: inputText,
      model: 'eleven_monolingual_v2',
    },
    responseType: 'arraybuffer',
  }

  const speechDetails: any = await axios.request(options as AxiosRequestConfig)

  return new NextResponse(speechDetails)
}

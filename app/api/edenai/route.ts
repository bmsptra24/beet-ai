import { NextRequest, NextResponse } from 'next/server'
const axios = require('axios').default

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const inputText: string | null = searchParams.get('inputText')

  const options = {
    method: 'POST',
    url: 'https://api.edenai.run/v2/audio/text_to_speech',
    headers: {
      authorization: 'Bearer ' + process.env.EDENAI_API_KEY,
    },
    data: {
      show_original_response: false,
      fallback_providers: '',
      providers: 'google',
      language: 'id',
      text: inputText,
      option: 'MALE',
    },
  }

  console.log('log: get edenai')
  const response = await axios.request(options)
  const audioResourceUrl = response.data.google.audio_resource_url

  return NextResponse.json(audioResourceUrl)
}

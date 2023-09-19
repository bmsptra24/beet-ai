// 'use server'
// import { NextResponse, NextRequest } from 'next/server'

// import axios, { AxiosRequestConfig } from 'axios'

// export async function GET(req: NextRequest) {
//   // Set the API key for ElevenLabs API.
//   // Do not use directly. Use environment variables.
//   const API_KEY = process.env.ELEVENLABS_API_KEY
//   // Set the ID of the voice to be used.
//   const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'

//   // Get the inputText from the query parameters.
//   const { searchParams } = new URL(req.url)
//   const inputText: string | null = searchParams.get('inputText')

//   // Set options for the API request.
//   const options = {
//     method: 'POST',
//     url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
//     headers: {
//       accept: 'audio/mpeg', // Set the expected response type to audio/mpeg.
//       'content-type': 'application/json', // Set the content type to application/json.
//       'xi-api-key': `${API_KEY}`, // Set the API key in the headers.
//     },
//     data: {
//       text: inputText, // Pass in the inputText as the text to be converted to speech.
//     },
//     responseType: 'arraybuffer', // Set the responseType to arraybuffer to receive binary data as response.
//   }

//   try {
//     // Send the API request using Axios and wait for the response.
//     const speechDetails = await axios.request(options as AxiosRequestConfig)

//     // Return the binary audio data received from the API response.

//     const data = await speechDetails.data
//     const blob = new Blob([data], { type: 'audio/mpeg' })
//     const url = URL.createObjectURL(blob)
//     console.log(url)

//     NextResponse.json(url, { status: 200 })
//   } catch (error) {
//     console.error('Error:', error)
//     NextResponse.json('Internal Server Error', { status: 500 })
//   }
// }

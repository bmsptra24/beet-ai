"use client";
export const textToSpeech = (text: string) => {
  console.log("speech start", text);

  const synth = window.speechSynthesis;

  const utterance = new SpeechSynthesisUtterance(text);

  return synth.speak(utterance);
};
// import audioWorkletModuleUrl from "./audioWorkletProcessor"; // Replace with the correct path
// import { getSoundLevel } from "./sound"; // Import your function here

// const startAudioWorklet = async () => {
//   try {
//     const audioContext = new (window.AudioContext ||
//       window.webkitAudioContext)();
//     await audioContext.audioWorklet.addModule(audioWorkletModuleUrl);

//     const soundLevelNode = new AudioWorkletNode(
//       audioContext,
//       "sound-level-processor"
//     );
//     soundLevelNode.port.onmessage = (event) => {
//       const clampedLevel: number = event.data.level;
//       // Do something with the calculated sound level
//     };

//     soundLevelNode.connect(audioContext.destination);

//     // Call your getSoundLevel function
//     const soundLevel = await getSoundLevel(audioContext);
//     console.log("Sound level:", soundLevel);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// startAudioWorklet();

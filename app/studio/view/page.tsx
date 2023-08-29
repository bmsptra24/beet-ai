"use client";
// import { getSoundLevel } from "@/utils/sound";
import React, { useEffect, useState } from "react";

const page = () => {
  const [micLevel, setMicLevel] = useState(0);

  const getSoundLevell = () => {
    // Check for browser support
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Access the microphone
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(function (stream) {
          // Create an audio context
          const audioContext = new (window.AudioContext ||
            window.AudioContext)();

          // Create a microphone input node
          const mic = audioContext.createMediaStreamSource(stream);

          // Create a script processor node to analyze audio
          const scriptNode = audioContext.createScriptProcessor(4096, 1, 1);
          scriptNode.onaudioprocess = function (event) {
            const inputBuffer = event.inputBuffer.getChannelData(0);
            let sum = 0;

            // Calculate the average amplitude of audio samples
            for (let i = 0; i < inputBuffer.length; i++) {
              sum += inputBuffer[i] * inputBuffer[i];
            }
            const rms = Math.sqrt(sum / inputBuffer.length);

            // Adjust the normalization based on your microphone's characteristics
            const normalizedLevel = rms * (rms < 0.05 ? 0 : 5);
            // const normalizedLevel = rms * 10;

            // Clamp the value between 0 and 1
            const clampedLevel = Math.min(1, Math.max(0, normalizedLevel));

            setMicLevel(clampedLevel);

            // Log the normalized sound level to the console
            // console.log("Normalized Mic Sound Level:", clampedLevel.toFixed(4));
          };

          // Connect the microphone to the script processor
          mic.connect(scriptNode);
          scriptNode.connect(audioContext.destination);
        })
        .catch(function (error) {
          console.error("Error accessing microphone:", error);
        });
    } else {
      console.error("getUserMedia not supported in this browser");
    }
  };
  //   useEffect(() => {
  //     getSoundLevel()
  //       .then((level) => {
  //         console.log("Normalized Mic Sound Level:", level.toFixed(4));
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  // Style for the animation element
  //   const animationStyle = {
  //     width: `${micLevel * 100}%`, // Adjust the animation width based on micLevel
  //     height: "20px",
  //     backgroundColor: "blue",
  //     transition: "width 0.1s ease-in-out",
  //   };

  const mouthOpening = `${10 + micLevel * 30}%`;

  return (
    <div>
      <div className="mouth-container rotate-180">
        <div className="mouth" style={{ height: mouthOpening }}></div>
      </div>
      <p onClick={getSoundLevell}>Mic Sound Level: {micLevel.toFixed(4)}</p>
    </div>
  );
};

export default page;

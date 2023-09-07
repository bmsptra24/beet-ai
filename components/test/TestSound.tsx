import React, { useEffect } from "react";

export const TestSound = () => {
  const getLevelMic = () => {
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
            const normalizedLevel = rms * 10; // You can adjust this factor as needed

            // Clamp the value between 0 and 1
            const clampedLevel = Math.min(1, Math.max(0, normalizedLevel));

            // Log the normalized sound level to the console
            console.log("Normalized Mic Sound Level:", clampedLevel.toFixed(4));
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
  useEffect(() => {
    // getLevelMic()
  }, []);
  return (
    <div id="audioLevel" onClick={getLevelMic}>
      Get Level
    </div>
  );
};

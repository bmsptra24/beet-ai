// // audioWorkletProcessor.js
// class SoundLevelProcessor extends AudioWorkletProcessor {
//   process(inputs, outputs, parameters) {
//     const input = inputs[0];
//     let sum = 0;
//     for (let i = 0; i < input.length; i++) {
//       sum += input[i] ** 2;
//     }
//     const rms = Math.sqrt(sum / input.length);
//     const normalizedLevel = rms * (rms < 0.05 ? 0 : 5);
//     const clampedLevel = Math.min(1, Math.max(0, normalizedLevel));

//     // Send the calculated level to the main thread
//     this.port.postMessage({ level: clampedLevel });

//     return true;
//   }
// }

// registerProcessor("sound-level-processor", SoundLevelProcessor);

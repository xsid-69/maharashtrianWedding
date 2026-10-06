import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const sampleRate = 22_050;
const duration = 56;
const outputDir = resolve("public/music");

// Maharashtrian wedding melody: Auspicious Sanai/Shehnai reed scale (Raga Bhupali / Bilawal - Sa Re Ga Pa Dha Sa)
const tracks = [
  {
    file: "sanai-sohala.wav",
    root: 146.83, // D3
    // Bhupali / Kalyan auspicious wedding intervals: Sa, Re, Ga, Pa, Dha, Sa'
    notes: [1, 1.125, 1.25, 1.5, 1.6875, 1.5, 1.25, 1.125, 1, 1.25, 1.5, 2.0, 1.6875, 1.5, 1.25, 1],
    pace: 2.4,
    bellEvery: 7.2,
  },
  {
    file: "mangalashtak-ambient.wav",
    root: 130.81, // C3
    notes: [1, 1.125, 1.265, 1.333, 1.5, 1.6875, 1.875, 2.0, 1.875, 1.5, 1.333, 1.125],
    pace: 2.8,
    bellEvery: 8.4,
  },
];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const softClip = (value) => Math.tanh(value * 1.2) / Math.tanh(1.2);

function buildTrack(track) {
  const sampleCount = sampleRate * duration;
  const pcm = Buffer.alloc(sampleCount * 2);

  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate;
    const fade = Math.min(1, time / 3.5, (duration - time) / 4);

    // Deep rich Tanpura drone (Sa, Pa, higher Sa) with acoustic resonance
    const tanpura =
      0.16 * Math.sin(2 * Math.PI * track.root * 0.5 * time) +
      0.09 * Math.sin(2 * Math.PI * track.root * time + 0.15 * Math.sin(time * 0.3)) +
      0.06 * Math.sin(2 * Math.PI * track.root * 1.5 * time) +
      0.03 * Math.sin(2 * Math.PI * track.root * 2.0 * time);

    // Shehnai / Sanai reed melody: Rich harmonics (odd & even), nasal reed timbre & expressive meend/vibrato
    const notePosition = time / track.pace;
    const noteIndex = Math.floor(notePosition) % track.notes.length;
    const notePhase = notePosition - Math.floor(notePosition);
    const noteEnvelope = Math.pow(Math.sin(Math.PI * clamp(notePhase, 0, 1)), 0.65);
    const frequency = track.root * track.notes[noteIndex];
    // Gentle gamak / vibrato
    const vibrato = 1 + 0.0055 * Math.sin(2 * Math.PI * 5.4 * time);
    const shehnai = noteEnvelope * (
      0.22 * Math.sin(2 * Math.PI * frequency * vibrato * time) +
      0.09 * Math.sin(2 * Math.PI * frequency * 2 * vibrato * time) +
      0.05 * Math.sin(2 * Math.PI * frequency * 3 * vibrato * time) +
      0.03 * Math.sin(2 * Math.PI * frequency * 4 * vibrato * time) +
      0.015 * Math.sin(2 * Math.PI * frequency * 5 * vibrato * time)
    );

    // Auspicious Ghanta / Temple bell chiming
    const bellPosition = time % track.bellEvery;
    const bellEnvelope = bellPosition < 3.2 ? Math.exp(-bellPosition * 1.3) : 0;
    const bellFrequency = track.root * 4.5;
    const bell = bellEnvelope * (
      0.06 * Math.sin(2 * Math.PI * bellFrequency * time) +
      0.03 * Math.sin(2 * Math.PI * bellFrequency * 2.02 * time) +
      0.015 * Math.sin(2 * Math.PI * bellFrequency * 3.01 * time)
    );

    // Soft warm shimmer
    const ambientAir = 0.008 * Math.sin(2 * Math.PI * 0.1 * time) * Math.sin(2 * Math.PI * track.root * 0.25 * time);

    const sample = softClip((tanpura + shehnai + bell + ambientAir) * fade * 0.85);
    pcm.writeInt16LE(Math.round(clamp(sample, -1, 1) * 32_767), index * 2);
  }

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

mkdirSync(outputDir, { recursive: true });
for (const track of tracks) {
  const target = resolve(outputDir, track.file);
  writeFileSync(target, buildTrack(track));
  console.log(`Generated Maharashtrian cultural audio: ${target}`);
}

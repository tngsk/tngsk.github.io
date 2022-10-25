
// Tone.js

const ADSR = {
  envelope: {
    attack: 0.01,
    decay: 0.0,
    sustain: 1.0,
    release: 0.01,
  },
};

const synth = new Tone.Synth(ADSR);
synth.oscillator.type = "sine";

// Fader
const fader1 = new Tone.Volume(-12);

// chain
synth.chain(fader1, Tone.Destination);

// play funciton
const play_signal = (freq, dB) => {
  console.log(`play_signal: ${freq}, ${dB}`)
  fader1.volume.value = dB;
  synth.triggerAttackRelease(freq, 0.2);
};

// Calibration
const calibration_melody = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, "16n", time);
  },
  ["C#4", "D#4", "F#4", "G#4", "A#4", null]
); //.start();

const calibration_freq = new Tone.Sequence(
  (time, freq) => {
    synth.triggerAttackRelease(freq, 1000, time);
  },
  [500, null]
); //.start()

const audio_meter = new Tone.Meter({
  smoothing: 0.9,
});
const audio_mic = new Tone.UserMedia({
  volume: -12,
  mute: false,
}).connect(audio_meter);

// Tone.Transport.start();
// Tone.Transport.stop();

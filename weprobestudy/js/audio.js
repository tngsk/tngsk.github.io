// Tone.js

const ADSR = {
  envelope: {
    attack: 0.05,
    decay: 0.0,
    sustain: 1.0,
    release: 0.05,
  },
};

// ----------------------------------------------------------------------
// Instruments



// Synth
const synth = new Tone.Synth(ADSR);
synth.oscillator.type = "sine";
const fader1 = new Tone.Volume(-6);
synth.chain(fader1, Tone.Destination);

// Noise
const noise = new Tone.NoiseSynth(ADSR);
noise.noise.type = "white";

// Filter
const filter_options = {
  frequency: 440,
  type: "bandpass",
  Q: 440 / 90,
};
const BPF = new Tone.Filter(filter_options);
const fader2 = new Tone.Volume(-6);
// noise.chain(BPF, fader2, Tone.Destination);
noise.chain(fader2, Tone.Destination);

// LFO & AMP
const amp1 = new Tone.Volume();
const lfo1 = new Tone.LFO(30, -96, -6);
lfo1.type = "sine";
// lfo1.connect(noise.volume);
lfo1.start();

// ----------------------------------------------------------------------
// Playing

// let signal_level_dB = -6;
// let masker_level_dB = -6;

// signal
const play_signal = (freq, dB) => {
  fader1.volume.value = dB;
  synth.triggerAttackRelease(freq, 0.2);
};

// masker
const play_masker = (freq) => {
  // fader2.volume.value = masker_level_dB;
  // BPF.frequency = freq;
  // BPF.Q = freq / 90;
  noise.triggerAttackRelease(0.2);
};

// signal + masker
const play_signal_and_masker = (freq, signal_dB) => {
  fader1.volume.value = signal_dB;
  // fader2.volume.value = masker_level_dB;
  // BPF.frequency = freq;
  // BPF.Q = freq / 90;
  noise.triggerAttackRelease(0.2);
  synth.triggerAttackRelease(freq, 0.2);
};

// ----------------------------------------------------------------------
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
);

//
let stream;
let analyzer;

let timerID;
let mic_level = 0;

const usermedia_stream_start = async () => {
  const audioCtx = new AudioContext();
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const input = audioCtx.createMediaStreamSource(stream);
  analyzer = audioCtx.createAnalyser();
  input.connect(analyzer);
  const timeDomainArray = new Float32Array(analyzer.fftSize);
  let _rms = 0;
  timerID = setInterval(() => {
    // マイク入力をdBに変換する
    analyzer.getFloatTimeDomainData(timeDomainArray);
    const totalSquared = timeDomainArray.reduce(
      (total, current) => total + current * current,
      0
    );
    const rms = Math.sqrt(totalSquared / timeDomainArray.length);
    _rms = Math.max(rms, _rms * 0.2); // smoothing = 0.2
    mic_level = atodb(_rms);
    // レベルメーターに反映
    const levelmeter = document.getElementById("levelmeter");
    if (levelmeter) {
      levelmeter.setAttribute("value", mic_level);
    }
  }, 100);
};

const usermedia_stream_stop = () => {
  stream.getTracks().forEach((track) => track.stop());
  clearInterval(timerID);
};

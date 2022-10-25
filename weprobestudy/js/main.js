/* jsPsych */
const jsPsych = initJsPsych({
  // display_element: "experiment_container",
  show_progress_bar: false,
  auto_update_progress_bar: false,
  default_iti: 500,
  experiment_width: 500,
  on_finish: () => {
    jsPsych.data.addProperties({ expid: wp_expid });
    jsPsych.data.displayData();
    // TODO: ここでJSONをPOSTする
    // window.location = wp_next_url;
  },
  on_close: () => {},
});

const wp_expid = jsPsych.randomization.randomID(5);

/* create timeline */
let timeline = [];

// [BrowserCheck] - [Preload] -> [Welcome] -> [Instructions] -> [Fixation] -> [Stimulus]

// Browser Check
const browsercheck = {
  type: jsPsychBrowserCheck,
  data: {
    task: "browser-check",
  },
};
timeline.push(browsercheck);

/* preload assets */
const wp_image_path = "stimulus/";
const preload_images = [
  wp_image_path + "blue.png",
  wp_image_path + "orange.png",
];
const preload = {
  type: jsPsychPreload,
  images: preload_images,
  data: {
    task: "preload",
  },
};
timeline.push(preload);

/* define welcome message trial */
const welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "Welcome to the experiment. Press any key to begin.",
  choices: ["->"],
  data: {
    task: "welcome",
  },
};
timeline.push(welcome);

/* instructions */
let instructions_content = `
        <p>In this experiment, a circle will appear in the center
        of the screen.</p><p>If the circle is <strong>blue</strong>,
        press the letter F on the keyboard as fast as you can.</p>
        <p>If the circle is <strong>orange</strong>, press the letter J
        as fast as you can.</p>
        <div style='width: 700px;'>
        <div style='float: left;'><img src='${preload_images[0]}'></img>
        <p class='small'><strong>Press the F key</strong></p></div>
        <div style='float: right;'><img src='${preload_images[1]}'></img>
        <p class='small'><strong>Press the J key</strong></p></div>
        </div>
        <p>Press any key to begin.</p>
      `;

const instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: instructions_content,
  choices: ["->"],
  data: {
    task: "instructions",
  },
};
timeline.push(instructions);

// 音量のキャリブレーション

let stream;
let analyzer;

let timerID;
let mic_level = 0;

const audio_calibration_start = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "本実験は音が鳴ります。端末本体の音量ボリュームを小さめに設定して、[->] ボタンを押してください。",
  choices: ["->"],
  data: {
    task: "audio_calibration",
  },
  on_finish: async () => {
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
        (total, current) => total + current * current,0);
      const rms = Math.sqrt(totalSquared / timeDomainArray.length);
      _rms = Math.max(rms, _rms * 0.2); // smoothing = 0.2
      mic_level = atodb(_rms);
      // レベルメーターに反映
      const levelmeter = document.getElementById("levelmeter");
      if (levelmeter) {
        levelmeter.setAttribute("value", mic_level)
      }
    }, 100);
  },
};


const audio_calibration_mic = {
  type: jsPsychHtmlButtonResponse,
  data: {
    task: "audio_calibration",
  },
  stimulus: () => {
    synth.triggerAttack(500);
    return "端末本体の音量ボリュームを操作して、メーターが黄色になるように音量を調整してください。<br /><meter id='levelmeter' min='-96' low='-34' optium='-30' high='-28' max='0' value='-96'></meter><div id='console'></div>";
  },
  choices: ["->"],
  on_finish: (data) => {
    clearInterval(timerID);
    data.mic_level = mic_level;

    synth.triggerRelease();
    stream.getTracks().forEach((track) => track.stop());
  },
};

const audio_calibration_procedure = {
  timeline: [audio_calibration_start, audio_calibration_mic],
};

timeline.push(audio_calibration_procedure);

/* define fixation and test trials */
const fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {
    task: "fixation",
  },
};

// ----------------------------------------
/* define trial stimuli array for timeline variables */
const stimulus_list = [
  { stimulus: preload_images[0], correct_response: "f" },
  { stimulus: preload_images[1], correct_response: "j" },
];

const trial = {
  type: jsPsychImageButtonResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ["f", "j"],
  data: {
    task: "response",
    correct_response: jsPsych.timelineVariable("correct_response"),
  },
  on_finish: (data) => {
    data.response = ["f", "j"][data.response];
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
  },
};

/* define trial procedure */
const trial_procedure = {
  timeline: [fixation, trial],
  timeline_variables: stimulus_list,
  repetitions: 2,
  randomize_order: true,
};
timeline.push(trial_procedure);

/* debriefing */
const debriefing = {
  type: jsPsychHtmlButtonResponse,
  choices: ["->"],
  data: {
    task: "debriefing",
  },
  stimulus: function () {
    const trials = jsPsych.data.get().filter({ task: "response" });
    const correct_trials = trials.filter({ correct: true });
    const accuracy = Math.round(
      (correct_trials.count() / trials.count()) * 100
    );
    const rt = Math.round(correct_trials.select("rt").mean());

    return `<p>You responded correctly on ${accuracy}% of the trials.</p>
          <p>Your average response time was ${rt}ms.</p>
          <p>Press any key to complete the experiment. Thank you!</p>`;
  },
};
timeline.push(debriefing);

/* start the experiment */
jsPsych.run(timeline);

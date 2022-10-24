const WPArraySum = (data) => data.reduce((x, y) => x + y, 0);

/* jsPsych */
const jsPsych = initJsPsych({
  display_element: "experiment_container",
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

// Staircase Procedure

WPStaircase.init();
WPStaircase.setScale(-96, -12)



const a = [-27.70204803041736, -29.46915182468406, -32.88360244798875];
console.log(arrayMean(a))







/* create timeline */
// let timeline = [];

// [BrowserCheck] - [Preload] -> [Welcome] -> [Instructions] -> [Fixation] -> [Stimulus]

// Browser Check
const browsercheck = {
  type: jsPsychBrowserCheck,
  data: {
    task: "browser-check",
  },
};
// timeline.push(browsercheck);

/* preload assets */
const wp_image_path = "img/";
const preload_images = [wp_image_path + "1.png", wp_image_path + "2.png"];
const preload = {
  type: jsPsychPreload,
  images: preload_images,
  data: {
    task: "preload",
  },
};
// timeline.push(preload);

/* define welcome message trial */
const welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "Welcome to the experiment. Press any key to begin.",
  choices: ["->"],
  data: {
    task: "welcome",
  },
};
// timeline.push(welcome);

/* instructions */
let instructions_content = ``;

const instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: instructions_content,
  choices: ["->"],
  data: {
    task: "instructions",
  },
};
// timeline.push(instructions);

// 音量のキャリブレーション

/*
// TODO: プラグインを使う場合、音量レベルは独自で取得する方法に変更になる
const initMicrophone = {
  type: jsPsychInitializeMicrophone,
  device_select_message:
    "<p>Please select the microphone you would like to use.</p>",
  button_label: "Use this microphone.",
};
timeline.push(initMicrophone);
*/

const audio_calibration_start = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "本実験は音が鳴ります。端末本体の音量ボリュームを小さめに設定して、[->] ボタンを押してください。",
  choices: ["->"],
  data: {
    task: "audio_calibration",
  },
  on_finish: () => {
    Tone.start();
  },
};

const audio_calibration_volume = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    Tone.Transport.start();
    calibration_freq.start();
    return "端末本体の音量ボリュームを調整して、メロディが快適に聞こえる音量にしてください。終わったら[->] ボタンを押してください。";
  },
  choices: ["->"],
  data: {
    task: "audio_calibration",
  },
  on_finish: () => {
    calibration_freq.stop();
    Tone.Transport.stop();
  },
};

let timerID = 0;
const audio_calibration_mic = {
  type: jsPsychHtmlButtonResponse,
  data: {
    task: "audio_calibration",
  },
  on_start: (trial) => {},
  stimulus: (data) => {
    // Tone.Transport.start();
    // calibration_freq.start();
    synth.triggerAttack(500);

    audio_mic
      .open()
      .then(() => {
        timerID = setInterval(() => {
          let levelmeter = document.getElementById("levelmeter");
          if (levelmeter) {
            levelmeter.setAttribute("value", audio_meter.getValue());
          } else {
            // console.log(levelmeter);
          }
          document.getElementById("console").innerText = audio_meter.getValue();
        }, 100);
      })
      .catch((error) => {});

    return "端末本体の音量ボリュームを操作して、メーターが黄色になるように音量を調整してください。<meter id='levelmeter' min='-96' low='-34' optium='-30' high='-28' max='0' value='-96'></meter><div id='console'></div>";
  },
  choices: ["->"],

  on_finish: (data) => {
    data.calibration = audio_meter.getValue();
    // Tone.Transport.stop();
    // calibration_freq.stop();
    synth.triggerRelease();
    clearInterval(timerID);
    audio_mic.close();
  },
};

const audio_calibration_procedure = {
  timeline: [audio_calibration_start, audio_calibration_mic],
};

// timeline.push(audio_calibration_procedure);

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

//------------------------------------------------------------------
// 強制選択法による実験デザイン

// Stimulus
const stimuli = {
  500: [
    { stim: "first", freq: 500 },
    { stim: "second", freq: 500 },
  ],
  2000: [
    { stim: "first", freq: 2000 },
    { stim: "second", freq: 2000 },
  ],
  4000: [
    { stim: "first", freq: 4000 },
    { stim: "second", freq: 4000 },
  ],
};

const force_choice_first = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    const stim = jsPsych.timelineVariable("stim");
    const freq = jsPsych.timelineVariable("freq");
    if (stim == "first") {
      const dB = WPStaircase.get();
      play_signal(freq, dB);
    }
    return '<img src="img/1.png" />';
  },
  choices: "NO_KEYS",
  trial_duration: 500,
  post_trial_gap: 500,
  data: {
    task: "force_choice_first",
  },
};

const force_choice_second = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    const stim = jsPsych.timelineVariable("stim");
    const freq = jsPsych.timelineVariable("freq");
    if (stim == "second") {
      const dB = WPStaircase.get();
      play_signal(freq, dB);
    }
    return '<img src="img/2.png" />';
  },
  choices: "NO_KEYS",
  trial_duration: 500,
  post_trial_gap: 500,
  data: {
    task: "force_choice_second",
  },
};

const force_response = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    return "どちらに音がありましたか？";
  },
  choices: ["1", "2"],
  button_html: '<img src="img/%choice%.png" style="width:50%;"/>',
  post_trial_gap: 500,
  data: {
    task: "response",
    level: () => {
      return WPStaircase.level;
    },
    dB: () => {
      return WPStaircase.get()
    },
    condition: () => {
      return jsPsych.timelineVariable("freq");
    },
    correct_response: () => {
      return jsPsych.timelineVariable("stim");
    },
  },
  on_finish: (data) => {
    data.response = ["first", "second"][data.response];
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
    last_trial_freq = data.signal_freq;
    // staircase に反応を記録する
    WPStaircase.addResponse(data.correct);
  },
};

// ------------------------------------------------------------------
// ステップをリセットする

const staircase_reset = {
  type: jsPsychCallFunction,
  func: () => {
    WPStaircase.init();
    return "";
  },
  data: {
    task: "staircase_reset",
  },
};

// trial 1
const trial_block_500 = {
  timeline_variables: stimuli["500"],
  timeline: [fixation, force_choice_first, force_choice_second, force_response],
  sample: {
    type: "fixed-repetitions", // random order
    size: 1,
  },
};

const staircase_loop = {
  timeline: [trial_block_500],
  loop_function: (data) => {
    return WPStaircase.isLoop();
  },
};

// ------------------------------------------------------------------
// 信号レベル推定

const estimation_level = {
  type: jsPsychCallFunction,
  func: () => WPStaircase.responses,
  data: {
    task: "estimation",
    level: () => arrayMean(WPStaircase.responses)
  },
};

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
// timeline.push(debriefing);

/* start the experiment */

let timeline = [];

// timeline.push(browsercheck);
timeline.push(preload);
// timeline.push(welcome);
// timeline.push(instructions);
timeline.push(audio_calibration_procedure);
timeline.push(staircase_loop);
timeline.push(estimation_level);

timeline.push(debriefing);

jsPsych.run(timeline);

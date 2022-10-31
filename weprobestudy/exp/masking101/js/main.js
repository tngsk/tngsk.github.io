// ----------------------------------------------------------------------
// jsPsych
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

// ----------------------------------------------------------------------
// Build Timeline
let timeline = [];

const buildTimeline = () => {
  // timeline.push(browsercheck);

  timeline.push(preload);

  // timeline.push(welcome);
  // timeline.push(instructions);

  timeline.push(audio_calibration_procedure);

  // ---- block 1 -----
  // Staircaseのリセット
  timeline.push(staircase_init);
  // Staircase による試行
  timeline.push(staircase_loop_1);
  // レベルの推定
  timeline.push(estimation_level);

  // ---- block2  -----
  // Staircaseのリセット
  timeline.push(staircase_init);
  // Staircase による試行
  timeline.push(staircase_loop_2);
  // レベルの推定
  timeline.push(estimation_level);

  //
  timeline.push(debriefing);

  // Run
  jsPsych.run(timeline);
};

// ----------------------------------------------------------------------
// Trial Block

// [BrowserCheck] - [Preload] -> [Welcome] -> [Instructions] -> [Fixation] -> [Stimulus]

// ----------------------------------------------------------------------
// Browser Check
const browsercheck = {
  type: jsPsychBrowserCheck,
  data: {
    task: "browser-check",
  },
};

// ----------------------------------------------------------------------
// preload assets
const wp_image_path = "img/";
const preload_images = [wp_image_path + "1.png", wp_image_path + "2.png"];
const preload = {
  type: jsPsychPreload,
  images: preload_images,
  data: {
    task: "preload",
  },
};

// ----------------------------------------------------------------------
// welcome message
const welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<h4>雑音の中の音を聞き分ける実験</h4><p>本日は実験にご協力いただきありがとうございます！</p>
  <p>本実験は音が鳴ります。本体のボリュームを小さめに設定して、[Continue] ボタンを押してください。</p>`,
  choices: ["->"],
  data: {
    task: "welcome",
  },
};

// ----------------------------------------------------------------------
// instructions
let instructions_content = ``;

const instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: instructions_content,
  choices: ["->"],
  data: {
    task: "instructions",
  },
};

// ----------------------------------------------------------------------
// 音量のキャリブレーション
const audio_calibration_start = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "本実験は音が鳴ります。端末本体の音量ボリュームを小さめに設定して、[->] ボタンを押してください。",
  choices: ["->"],
  data: {
    task: "audio_calibration",
  },
  on_finish: () => {
    usermedia_stream_start();
  },
};

const audio_calibration_mic = {
  type: jsPsychHtmlButtonResponse,
  data: {
    task: "audio_calibration",
  },
  stimulus: () => {
    synth.triggerAttack(500);
    return `端末本体の音量ボリュームを操作して、メーターが黄色になるように音量を調整してください。
    <br />
    <meter id='levelmeter' min='-96' low='-34' optium='-30' high='-28' max='0' value='-96'></meter>
    <div id='console'></div>
    `;
  },
  choices: ["->"],
  on_finish: (data) => {
    clearInterval(timerID);
    data.mic_level = mic_level;
    synth.triggerRelease();
    usermedia_stream_stop();
    Tone.start();
  },
};

const audio_calibration_procedure = {
  timeline: [audio_calibration_start, audio_calibration_mic],
};

// ----------------------------------------------------------------------
// fixation
const fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {
    task: "fixation",
  },
};

// ----------------------------------------------------------------------
// 強制選択法 + 階段法による実験デザイン

// Staircase Procedure
WPStaircase.init();
WPStaircase.setScale(-96, -12);

// Stimulus
const stimuli = {
  signal125: [
    { section: "signal", position: "first", stimulus: 125 },
    { section: "signal", position: "second", stimulus: 125 },
  ],
  signal250: [
    { section: "signal", position: "first", stimulus: 250 },
    { section: "signal", position: "second", stimulus: 250 },
  ],
  signal4000: [
    { section: "signal", position: "first", stimulus: 4000 },
    { section: "signal", position: "second", stimulus: 4000 },
  ],
  masking125: [
    { section: "masking", position: "first", stimulus: 125 },
    { section: "masking", position: "second", stimulus: 125 },
  ],
  masking250: [
    { section: "masking", position: "first", stimulus: 250 },
    { section: "masking", position: "second", stimulus: 250 },
  ],
  masking4000: [
    { section: "masking", position: "first", stimulus: 4000 },
    { section: "masking", position: "second", stimulus: 4000 },
  ],
};

const force_choice_first = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    const section = jsPsych.timelineVariable("section");
    const position = jsPsych.timelineVariable("position");
    const freq = jsPsych.timelineVariable("stimulus");

    // シグナルセクションとマスキングセクションの切り替え
    switch (section) {
      case "signal":
        if (position == "first") {
          const dB = WPStaircase.get();
          play_signal(freq, dB);
        }
        break;

      case "masking":
        if (position == "first") {
          // Masker + Signal
          const dB = WPStaircase.get();
          play_signal_and_masker(freq, dB);
        } else {
          // Masker
          play_masker(freq);
        }

        break;

      default:
        break;
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
    const section = jsPsych.timelineVariable("section");
    const position = jsPsych.timelineVariable("position");
    const freq = jsPsych.timelineVariable("stimulus");

    // シグナルセクションとマスキングセクションの切り替え
    switch (section) {
      case "signal":
        if (position == "second") {
          const dB = WPStaircase.get();
          play_signal(freq, dB);
        }
        break;

      case "masking":
        if (position == "second") {
          // Masker + Signal
          const dB = WPStaircase.get();
          play_signal_and_masker(freq, dB);
        } else {
          // Masker
          play_masker(freq);
        }

        break;

      default:
        break;
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
    value: () => {
      return WPStaircase.get();
    },
    section: () => {
      return jsPsych.timelineVariable("section");
    },
    stimulus: () => {
      return jsPsych.timelineVariable("stimulus");
    },
    correct_response: () => {
      return jsPsych.timelineVariable("position");
    },
  },
  on_finish: (data) => {
    data.response = ["first", "second"][data.response];
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response
    );
    // staircase に反応を記録する
    WPStaircase.addResponse(data.correct, data.value);
    // どの刺激かタグ付け TODO: 毎回重複するのでちょっと無駄
    WPStaircase.setTag(`${data.section}:${data.stimulus}`);
  },
};

// ------------------------------------------------------------------
// trial blobk
const trial_block_1 = {
  timeline_variables: stimuli["signal250"],
  timeline: [fixation, force_choice_first, force_choice_second, force_response],
  sample: {
    type: "fixed-repetitions", // random order
    size: 1,
  },
};

const trial_block_2 = {
  timeline_variables: stimuli["masking250"],
  timeline: [fixation, force_choice_first, force_choice_second, force_response],
  sample: {
    type: "fixed-repetitions", // random order
    size: 1,
  },
};

const staircase_loop_1 = {
  timeline: [trial_block_1],
  loop_function: (data) => {
    return WPStaircase.isLoop();
  },
};

const staircase_loop_2 = {
  timeline: [trial_block_2],
  loop_function: (data) => {
    return WPStaircase.isLoop();
  },
};

// ------------------------------------------------------------------
// 信号レベル推定
// 反転したときの数値を平均したもの

const estimation_level = {
  type: jsPsychCallFunction,
  func: () => WPStaircase.responses,
  data: {
    task: "estimation",
    value: () => arrayMean(WPStaircase.responses),
    tag: () => WPStaircase.tag,
  },
};

// ----------------------------------------------------------------------
// ステップをリセットする
const staircase_init = {
  type: jsPsychCallFunction,
  func: () => {
    WPStaircase.init();
    WPStaircase.setScale(-96, 0);
    return "";
  },
  data: {
    task: "staircase_init",
  },
};

// ----------------------------------------------------------------------
// debriefing
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

// ----------------------------------------------------------------------
// Build Timeline

buildTimeline();

/* initialize jsPsych */
const jsPsych = initJsPsych({
  show_progress_bar: true,
  auto_update_progress_bar: true,
  default_iti: 500,
  on_finish: (data) => {
    jsPsych.data.addProperties({ exp_id: exp_id });
    // jsPsych.data.displayData();
    jsPsych.data
      .get()
      .localSave("json", "detection-threshold_" + exp_id + ".json");
  },
});

const exp_id = jsPsych.randomization.randomID(5);

let staircase_history = [];
const staircase_target_accuracy = 0.7;
const staircase_numberOfCycles = 1;
let difficulty = -18;

const difficultyStaircase = {
  max: -72,
  min: -6,
  get: () => {
    return difficulty;
  },
  set: (value) => {
    difficulty = value;
  },
};

// Tone
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
  fader1.volume.value = dB;
  synth.triggerAttackRelease(freq, 0.2);
};

// Stimulus
const ditection_threshold_stimuli = {
  500: [
    { stim: "orange", freq: 500, dB: difficulty },
    { stim: "blue", freq: 500, dB: difficulty },
  ],
  1000: [
    { stim: "orange", freq: 1000, dB: difficulty },
    { stim: "blue", freq: 1000, dB: difficulty },
  ],
  2000: [
    { stim: "orange", freq: 2000, dB: difficulty },
    { stim: "blue", freq: 2000, dB: difficulty },
  ],
};

const practice_stimuli = {
  500: [
    { stim: "orange", freq: 500, dB: -12 },
    { stim: "blue", freq: 500, dB: -12 },
  ],
  1000: [
    { stim: "orange", freq: 1000, dB: -12 },
    { stim: "blue", freq: 1000, dB: -12 },
  ],
  "1000low": [
    { stim: "orange", freq: 1000, dB: -48 },
    { stim: "blue", freq: 1000, dB: -48 },
  ],
};

/* create timeline */
let timeline = [];

// preload
const preload = {
  type: jsPsychPreload,
  images: ["img/blue.png", "img/orange.png"],
};
timeline.push(preload);

// Welcom
const welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<h4>小さな音を聴き分ける実験</h4><p>本日は実験にご協力いただきありがとうございます！</p>
  <p>本実験は音が鳴ります。本体のボリュームを小さめに設定して、[次へ] ボタンを押してください。</p>`,
  choices: ["次へ"],
  on_finish: () => {
    Tone.start();
  },
};
timeline.push(welcome);

// Volume Adjust
const volume_adjust_melody = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, "16n", time);
  },
  ["C#4", "D#4", "F#4", "G#4", "A#4", null]
).start();

const volume_adjust = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    Tone.Transport.start();
    return "<p>端末本体の音量ボリュームを調整して、<br />メロディが快適に聞こえる音量にしてください。</p><p>終わったら[次へ] ボタンを押してください。</p>";
  },
  choices: ["次へ"],
  data: {
    task: "volume_adjust",
  },
  on_finish: () => {
    Tone.Transport.stop();
  },
};
timeline.push(volume_adjust);

// ------------------------------------------------------------------
// fixation

const fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "+",
  choices: "NO_KEYS",
  css_classes: ["fixation"],
  trial_duration: 500,
  post_trial_gap: 500,
  data: {
    task: "fixation",
  },
};

// ------------------------------------------------------------------
// 強制選択法による実験デザイン
const force_stim_orange = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    const stim = jsPsych.timelineVariable("stim");
    const freq = jsPsych.timelineVariable("freq");
    if (stim == "orange") {
      const dB = difficultyStaircase.get();
      play_signal(freq, dB);
    }
    return '<img src="img/orange.png" />';
  },
  choices: "NO_KEYS",
  trial_duration: 500,
  post_trial_gap: 500,
  data: {
    task: "stim_orange",
  },
};

const force_stim_blue = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    const stim = jsPsych.timelineVariable("stim");
    const freq = jsPsych.timelineVariable("freq");
    if (stim == "blue") {
      const dB = difficultyStaircase.get();
      play_signal(freq, dB);
    }
    return '<img src="img/blue.png" />';
  },
  choices: "NO_KEYS",
  trial_duration: 500,
  post_trial_gap: 500,
  data: {
    task: "stim_blue",
  },
};

const force_response = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    return "どちらに音がありましたか？";
  },
  choices: ["orange", "blue"],
  button_html: '<img src="img/%choice%.png" style="width:50%;"/>',
  post_trial_gap: 500,
  data: {
    task: "response",
    signal_dB: () => {
      return difficultyStaircase.get();
    },
    signal_freq: () => {
      return jsPsych.timelineVariable("freq");
    },
    correct_response: () => {
      return jsPsych.timelineVariable("stim");
    },
  },
  on_finish: (data) => {
    data.data_label = "staircase";
    data.correct = jsPsych.pluginAPI.compareKeys(
      ["orange", "blue"][data.response],
      data.correct_response
    );
    last_trial_freq = data.signal_freq;
  },
};

// ------------------------------------------------------------------
// 信号レベル推定

const estimation_signal_level = {
  type: jsPsychCallFunction,
  func: () => {
    return "";
  },
  data: {
    task: "estimation",
    signal_freq: () => {
      return last_trial_freq;
    },
    signal_dB: () => {
      return difficultyStaircase.get();
    },
  },
};

// ------------------------------------------------------------------
// ステップをリセットする

const difficulty_reset = {
  type: jsPsychCallFunction,
  func: () => {
    difficulty = -12;
    difficultyStaircase.set(difficulty);
    return "";
  },
  data: {
    task: "difficulty_reset",
  },
};

// ------------------------------------------------------------------
// practice

// ------------------------------------------------------------------
// 強制選択法による実験デザイン
const practice_force_stim_orange = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    const stim = jsPsych.timelineVariable("stim");
    const freq = jsPsych.timelineVariable("freq");
    const dB = jsPsych.timelineVariable("dB");
    if (stim == "orange") {
      play_signal(freq, dB);
    }
    return '<img src="img/orange.png" />';
  },
  choices: "NO_KEYS",
  trial_duration: 500,
  post_trial_gap: 500,
  data: {
    task: "practice_stim_orange",
  },
};

const practice_force_stim_blue = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    const stim = jsPsych.timelineVariable("stim");
    const freq = jsPsych.timelineVariable("freq");
    const dB = jsPsych.timelineVariable("dB");
    if (stim == "blue") {
      play_signal(freq, dB);
    }
    return '<img src="img/blue.png" />';
  },
  choices: "NO_KEYS",
  trial_duration: 500,
  post_trial_gap: 500,
  data: {
    task: "practice_stim_blue",
  },
};

const practice_force_response = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    return "どちらに音がありましたか？";
  },
  choices: ["orange", "blue"],
  button_html: '<img src="img/%choice%.png" style="width:50%;"/>',
  post_trial_gap: 500,
  data: {
    task: "practice_response",
    correct_response: () => {
      return jsPsych.timelineVariable("stim");
    },
  },
  on_finish: (data) => {
    data.correct = jsPsych.pluginAPI.compareKeys(
      ["orange", "blue"][data.response],
      data.correct_response
    );
  },
};

const practice_feedback = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
    if (last_trial_correct) {
      return "<p>正解です</p>";
    } else {
      return "<p>不正解です</p>";
    }
  },
  trial_duration: 1000,
  post_trial_gap: 500,
};

const instruction1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <h4>実験の方法</h4>
  <p>+マークが表示された後、<br />すぐにオレンジとブルーの図形が続けて表示されます。</p>
  <p>そのときに、同時に音が鳴ります。</p><p>どちらの色のときに音が聴こえたか、図形をクリックして回答してください。</p>
  `,
  choices: ["練習する"],
};

const instruction2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>もう一度やってみます。今度は音の高さが変わります。</p>
  `,
  choices: ["練習する"],
};

const instruction3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>実験では音量が小さくなります。<br />よく聞こえなくても本体の音量は変えないでください。<br />聞こえなかった場合でも、どちらかの色を選んでください。</p>
  `,
  choices: ["練習する"],
};

// practice trial 1
const practice_cycle_1 = {
  timeline_variables: practice_stimuli["500"],
  timeline: [
    fixation,
    practice_force_stim_orange,
    practice_force_stim_blue,
    practice_force_response,
    practice_feedback,
  ],
  sample: {
    type: "fixed-repetitions", // random order
    size: 1,
  },
};

const practice_cycle_2 = {
  timeline_variables: practice_stimuli["1000"],
  timeline: [
    fixation,
    practice_force_stim_orange,
    practice_force_stim_blue,
    practice_force_response,
    practice_feedback,
  ],
  sample: {
    type: "fixed-repetitions", // random order
    size: 1,
  },
};

const practice_cycle_3 = {
  timeline_variables: practice_stimuli["1000low"],
  timeline: [
    fixation,
    practice_force_stim_orange,
    practice_force_stim_blue,
    practice_force_response,
    practice_feedback,
  ],
  sample: {
    type: "fixed-repetitions", // random order
    size: 1,
  },
};

timeline.push(instruction1);
timeline.push(practice_cycle_1);
timeline.push(instruction2);
timeline.push(practice_cycle_2);
timeline.push(instruction3);
timeline.push(practice_cycle_3);

const practice_break = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>練習は以上です。<br />なお、本番では正解／不正解のフィードバックはありません。</p>
  <p>問題は20問を3セット、合計で60問を判断していただきます。状況によっては、それよりも問題が少なくなる場合があります。</p>

  <p>それでは、準備が出来たら実験を始めてください。</p>`,
  choices: ["実験を開始する"],
};
timeline.push(practice_break);

// ------------------------------------------------------------------
// trial 1
const production_cycle_500 = {
  timeline_variables: ditection_threshold_stimuli["500"],
  timeline: [fixation, force_stim_orange, force_stim_blue, force_response],
  sample: {
    type: "fixed-repetitions", // random order
    size: 1,
  },
};

let staircase_timeline = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: staircase_target_accuracy,
  numberOfCycles: staircase_numberOfCycles,
  difficulty: difficultyStaircase,
  dataLabel: "staircase",
  cycle: production_cycle_500,
  postCycleCallback: (data) => {
    staircase_history.push({
      accuracy: data.cycleAccuracy,
      adjustedDifficulty: data.adjustedDifficulty,
      freq: last_trial_freq,
    });
  },
});

timeline.push(staircase_timeline);
timeline.push(estimation_signal_level);
timeline.push(difficulty_reset);

const next = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>次のブロックへ進みます。準備が良ければ始めるボタンを押してください</p>`,
  choices: ["始める"],
};
timeline.push(next);

// ------------------------------------------------------------------
// trial 2
const production_cycle_1000 = {
  timeline_variables: ditection_threshold_stimuli["1000"],
  timeline: [fixation, force_stim_orange, force_stim_blue, force_response],
  sample: {
    type: "fixed-repetitions", // random order
    size: 1,
  },
};

staircase_timeline = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: staircase_target_accuracy,
  numberOfCycles: staircase_numberOfCycles,
  difficulty: difficultyStaircase,
  dataLabel: "staircase",
  cycle: production_cycle_1000,
  postCycleCallback: (data) => {
    staircase_history.push({
      accuracy: data.cycleAccuracy,
      adjustedDifficulty: data.adjustedDifficulty,
      freq: last_trial_freq,
    });
  },
});

timeline.push(staircase_timeline);
timeline.push(estimation_signal_level);
timeline.push(difficulty_reset);

timeline.push(next);

// ------------------------------------------------------------------
// trial 3

const production_cycle_2000 = {
  timeline_variables: ditection_threshold_stimuli["2000"],
  timeline: [fixation, force_stim_orange, force_stim_blue, force_response],
  sample: {
    type: "fixed-repetitions", // random order
    size: 1,
  },
};

staircase_timeline = generateStaircaseTimeline({
  jsPsychInstance: jsPsych,
  targetAccuracy: staircase_target_accuracy,
  numberOfCycles: staircase_numberOfCycles,
  difficulty: difficultyStaircase,
  dataLabel: "staircase",
  cycle: production_cycle_2000,
  postCycleCallback: (data) => {
    staircase_history.push({
      accuracy: data.cycleAccuracy,
      adjustedDifficulty: data.adjustedDifficulty,
      freq: last_trial_freq,
    });
  },
});

timeline.push(staircase_timeline);
timeline.push(estimation_signal_level);
timeline.push(difficulty_reset);

// ------------------------------------------------------------------
// ステップ調整の履歴を保存する

const history = {
  type: jsPsychCallFunction,
  func: () => {
    return "";
  },
  data: {
    task: "staircase_history",
    history: staircase_history,
  },
};
timeline.push(history);

// ------------------------------------------------------------------
// Thanks
const thanks = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>実験はこれで終了です</p><p>次の画面で結果をみることができます</p>`,
  choices: ["結果画面へ"],
};
timeline.push(thanks);

const debriefing = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    var trials = jsPsych.data.get().filter({ task: "response" });
    var correct_trials = trials.filter({ correct: true });
    var accuracy = Math.round((correct_trials.count() / trials.count()) * 100);
    var rt = Math.round(correct_trials.select("rt").mean());

    return `<h4>あなたの記録です</h4><p>正解率 ${accuracy}% </p>
      <p>平均反応時間 ${rt} ms</p>
      <p>次の画面でデータの保存とアンケートのお願いがあります。ボタンを押して進んでください。</p>`;
  },
  choices: ["次へ"],
};
timeline.push(debriefing);

// -----

// survey
const survey_start = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h4>アンケートにご協力ください</h4><p>回答は任意です。ご協力いただける方は [回答する] ボタンを押してください。</p><p>ご回答いただいた内容は、個人が特定されないように処理をした上で、本実験の分析に使用します。それ以外の目的には使用しません。</p>",
  choices: ["回答する", "回答せず終了する"],
  on_finish: (data) => {
    const res = ["agree", "disagree"];
    data.response = res[data.response];
  },
};
timeline.push(survey_start);

const survey = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: "html",
        prompt: "以下のアンケートにお答えください",
      },
      {
        type: "text",
        prompt: "実験に参加した場所はどこですか？",
        name: "place",
        placeholder: "ご記入ください",
        required: true,
      },
      {
        type: "multi-choice",
        prompt: "今回の実験では、どの装置で音を聴きましたか?",
        name: "audio-equipment",
        options: [
          "PCのスピーカー",
          "スマートフォンのスピーカー",
          "ヘッドフォン／イヤフォン",
          "その他の装置",
        ],
        required: true,
      },
      {
        type: "text",
        prompt: "その他の装置を選んだ方は具体的にお答えください",
        name: "audio-equipment-other",
        placeholder: "ご記入ください",
        required: false,
      },
    ],
    [
      {
        type: "likert",
        prompt: "実験参加時の周りの様子についてお答えください",
        name: "audio-equipment",
        likert_scale_min_label: "とても静かだった",
        likert_scale_max_label: "とても騒がしかった",
        likert_scale_values: [
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 },
        ],
        required: true,
      },
      {
        type: "text",
        prompt:
          "実験の支障になるような出来事はありましたか? 特定の音や光、イベントなど気になったことがあればお答えください。なければ記入は不要です。",
        textbox_rows: 5,
        required: false,
      },
    ],
  ],
  button_label_next: "次へ",
  button_label_back: "前へ",
  button_label_finish: "回答を送信",
  required_error_text: "お答えください",
};

const survey_condition = {
  timeline: [survey],
  conditional_function: () => {
    var data = jsPsych.data.get().last(1).values()[0];
    if (jsPsych.pluginAPI.compareKeys(data.response, "agree")) {
      return true;
    } else {
      return false;
    }
  },
};
timeline.push(survey_condition);

const experiment_thanks = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `<h4>実験は以上で終了です</h4>
    <p>${exp_id}</p><p>上記のシリアルナンバーをコピー＆ペーストして、レポート内に記載してください</p>
    <p>ご参加ありがとうございました</p>`,
  choices: ["終了"],
};
timeline.push(experiment_thanks);

/* start the experiment */
jsPsych.run(timeline);

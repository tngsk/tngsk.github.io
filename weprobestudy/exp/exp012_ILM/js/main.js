// ----------------------------------------------------------------------
// jsPsych
const jsPsych = initJsPsych({
  display_element: "experiment_block",
  show_progress_bar: false,
  default_iti: 500,
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
  timeline.push(browsercheck);

  timeline.push(welcome);
  timeline.push(instructions);

  timeline.push(enter_fullscreen);
  // timeline.push(setup);
  timeline.push(start);
  timeline.push(trial_block);
  timeline.push(debriefing);
  timeline.push(exit_fullscreen);

  // Run
  jsPsych.run(timeline);
};

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

let welcome_content = `
<h3>Illusory Line Motionの実験</h3>
<p>本日は実験にご協力いただきありがとうございます！</p>
`;

const welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: welcome_content,
  choices: ["次へ"],
  data: {
    task: "welcome",
  },
};

// ----------------------------------------------------------------------
// instructions

const instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    return `
      <p>
      これから、図形を用いた心理学実験を行います。画面の中央（＋があるところ）に図形が表示されます。
      <br />画面下（ここ）に指示が表示されます。
      <br />＋マークが表示されているときは、注目するようにしてください</p>
    `;
  },
  choices: ["次へ"],
  data: {
    task: "instructions",
  },
  on_start: () => {
    document.getElementById("fixation").style.visibility = "visible";
  },
  on_finish: () => {
    document.getElementById("fixation").style.visibility = "hidden";
  },
};

const enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: `
  <article class="text-center">
  <p>実験はフルスクリーンで行います。<kbd class="kbd">ESC</kbd>キーを押すといつでもフルスクリーンを解除できます。</p>
  </article>
  `,
  button_label: "続ける",
  css_classes: ["text-center"],
};
const exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

// ----------------------------------------------------------------------

let SOA = 100;
let response_slider_value = 20;
let trial_loop_timerID = 0;
const interval_time = 10000;
const trial_gap = 500;

const setup = {
  type: jsPsychCallFunction,
  func: () => {
    return "";
  },
  post_trial_gap: 500,
};

const start = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h3>実験を始めます</h3><p>ラインが動いた方向をできるだけ速くボタンで回答してください。<br />動いていないと感じた時は、●の位置を回答してください。</p>",
  choices: ["スタート"],
};

const fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "",
  choices: "NO_KEYS",
  trial_duration: 500,
  post_trial_gap: 500,
  data: {
    task: "fixation",
  },
  on_start: () => {
    document.getElementById("fixation").style.visibility = "visible";
  },
  on_finish: () => {
    document.getElementById("fixation").style.visibility = "hidden";
  },
};

const cue = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "",
  choices: "NO_KEYS",
  trial_duration: function () {
    return jsPsych.timelineVariable("lead_time");
  },
  data: {
    task: "cue",
  },
  on_start: () => {
    document.getElementById("stimulus_block").style.visibility = "visible";
    document.getElementById("cue1").classList.add("blink");
  },
};

const target = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "",
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {
    task: "target",
  },
  on_start: () => {
    document.getElementById("target1").classList.add("blink");
  },
};

const reset = {
  type: jsPsychCallFunction,
  func: () => {
    document.getElementById("cue1").classList.remove("blink");
    document.getElementById("target1").classList.remove("blink");
    return "";
  },
  post_trial_gap: 500,
};

const direction = {
  type: jsPsychCallFunction,
  func: () => {
    const d = jsPsych.timelineVariable("cue_direction");
    const flip_target = document.getElementById("stimulus");
    flip_target.classList.remove("reverse");
    if (d == "right") {
      flip_target.classList.add("reverse");
    }
    return "";
  },
};

const response = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "",
  choices: [" ← ", " → "],
  data: {
    task: "response",
    cue_direction: () => jsPsych.timelineVariable("cue_direction"),
  },
  on_finish: (data) => {
    document.getElementById("stimulus_block").style.visibility = "hidden";
    data.response = ["left", "right"][data.response];
    if (jsPsych.pluginAPI.compareKeys(data.response, data.cue_direction)) {
      data.ILM = false;
    } else {
      data.ILM = true;
    }
  },
};

const factors = {
  lead_time: [0, 10, 25, 50, 100, 200, 400, 800, 1600, 3200],
  cue_direction: ["left", "right"],
};

const full_design = jsPsych.randomization.factorial(factors, 1);

const trial_block = {
  timeline: [direction, fixation, cue, target, response, reset],
  timeline_variables: full_design,
  sample: {
    type: "fixed-repetitions",
    size: 2,
  },
};

// ----------------------------------------------------------------------
// debriefing
const debriefing_layout = () => {
  document.getElementById("stimulus_block").remove();
  document.getElementById("header_block").remove();
  const weprobe_container = document.getElementById("weprobe-container");
  weprobe_container.classList.remove("justify-between");
  weprobe_container.classList.add("justify-center");
};
const debriefing = {
  type: jsPsychHtmlButtonResponse,
  choices: ["送信"],
  data: {
    task: "debriefing",
  },
  stimulus: () => {
    debriefing_layout();

    return `
        <div class="flex flex-col justify-center items-center px-8 py-16">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9.25 42.7q-1.6 0-2.775-1.175Q5.3 40.35 5.3 38.75V9.25q0-1.65 1.175-2.825Q7.65 5.25 9.25 5.25h29.5q1.65 0 2.825 1.175Q42.75 7.6 42.75 9.25v29.5q0 1.6-1.175 2.775Q40.4 42.7 38.75 42.7Zm0-3.95h29.5V9.25H9.25v29.5Zm6.6-4.6q.6 0 1.05-.425.45-.425.45-1.075V25.4q0-.65-.45-1.075-.45-.425-1.05-.425-.65 0-1.075.425-.425.425-.425 1.075v7.25q0 .65.425 1.075.425.425 1.075.425Zm16.35 0q.6 0 1.05-.425.45-.425.45-1.075v-18q0-.65-.45-1.075-.45-.425-1.05-.425-.65 0-1.075.425Q30.7 14 30.7 14.65v18q0 .65.425 1.075.425.425 1.075.425Zm-8.2 0q.65 0 1.075-.425.425-.425.425-1.075v-2.9q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075v2.9q0 .65.425 1.075.425.425 1.075.425Zm.05-10.25q.6 0 1.025-.425.425-.425.425-1.075v-.05q0-.65-.45-1.05T24 20.9q-.65 0-1.075.425-.425.425-.425 1.075v.05q0 .65.45 1.05t1.1.4ZM9.25 38.75V9.25v29.5Z"/></svg>
        <h3 class="mt-2">あなたの実験結果</h3>
        </div>
        <p class="text-center">これで実験は終了です。お疲れさまでした。ボタンを押して結果を送信してください。</p>`;
  },
};

// ----------------------------------------------------------------------
// Build Timeline

buildTimeline();

// ----------------------------------------------------------------------
// jsPsych
const jsPsych = initJsPsych({
  display_element: "experiment_container",
  show_progress_bar: false,
  auto_update_progress_bar: false,
  default_iti: 500,
  // experiment_width: 100,
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
  timeline.push(preload);

  timeline.push(welcome);
  timeline.push(instructions);

  timeline.push(enter_fullscreen);
  timeline.push(start);

  timeline.push(far_distance);
  timeline.push(near_distance);
  timeline.push(slow_timing);
  timeline.push(fast_timing);
  timeline.push(pause1);
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
let instructions_content = `
<p>
これから、図形を用いた心理学実験を行います。画面の中央（＋があるところ）に図形が表示されます。画面下（ここ）に指示が表示されます。
</p><p>＋マークが表示されているときは、注目するようにしてください</p>
`;

const instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    document.getElementById("fixation").style.visibility = "visible";
    return instructions_content;
  },
  choices: ["次へ"],
  data: {
    task: "instructions",
  },
  on_finish: () => {
    document.getElementById("fixation").style.visibility = "hidden";
  },
};

// ----------------------------------------------------------------------

let SOA = 100;
let response_slider_value = 0;
let trial_loop_interval = 0;
const interval_time = 5000;

const start_content = "それでは、準備ができたら実験を始めます。";
const start = {
  type: jsPsychHtmlButtonResponse,
  stimulus: start_content,
  choices: ["スタート"],
};

const fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    document.getElementById("fixation").style.visibility = "visible";
    return "";
  },
  choices: "NO_KEYS",
  trial_duration: 500,
  post_trial_gap: 500,
  data: {
    task: "fixation",
  },
  on_finish: () => {
    document.getElementById("fixation").style.visibility = "hidden";
    // バーの位置を初期に戻す
    document.getElementById("target1").style.left = `20px`;
  },
};

const cue = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    document.getElementById("stimulus_block").style.visibility = "visible";
    document.getElementById("cue1").classList.add("blink");
    return "";
  },
  choices: "NO_KEYS",
  trial_duration: function () {
    return jsPsych.timelineVariable("lead_time");
  },
  data: {
    task: "cue",
  },
  on_finish: (data) => {},
};

const target = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    document.getElementById("target1").classList.add("blink");
    return "";
  },
  choices: "NO_KEYS",
  trial_duration: 500,
  data: {
    task: "target",
  },
  on_finish: (data) => {},
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
    const flip_target = document.getElementById("flip_container");
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

const enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: "<p>ボタンを押すと画面がフルスクリーンモードになります</p>",
  button_label: "続ける",
};
const exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
};

const trial = () => {
  // Fixation ON
  document.getElementById("fixation").style.visibility = "visible";
  setTimeout(() => {
    // リードタイム後にターゲット刺激を表示
    setTimeout(() => {
      document.getElementById("target1").classList.add("blink");

      // 指定秒数後に刺激をリセットする
      setTimeout(() => {
        document.getElementById("cue1").classList.remove("blink");
        document.getElementById("target1").classList.remove("blink");
        // 試行ごとに方向を反転させる
        if (Math.random() >= 0.49) {
          document.getElementById("flip_container").classList.toggle("reverse");
        }
      }, interval_time / 2.0);
    }, SOA);

    // Fixation OFF
    document.getElementById("fixation").style.visibility = "hidden";
    // 刺激画面の表示
    document.getElementById("stimulus_block").style.visibility = "visible";
    // キュー刺激を表示
    document.getElementById("cue1").classList.add("blink");
  }, 500);
};

const sliderUpdate = (e) => {
  response_slider_value = e.value;
  switch (e.id) {
    case "slider1":
      document.getElementById("target1").style.left = `${e.value}px`;
      break;
    case "slider2":
      SOA = e.value;
      break;
    default:
      break;
  }
};

const far_distance_content = `
<h3><u>遠さ</u>の調整</h3>
<p>ラインが動いてみえる最も<u>遠い(離れた)</u>位置を探ってください。</p><p>位置が決まったらOKボタンを押してください。</p>
<input id="slider1" type="range" min="0" max="1000" value="10" oninput="sliderUpdate(this)" />
`;

const far_distance = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    // バーの位置を初期に戻す
    document.getElementById("target1").style.left = `20px`;
    trial_loop_interval = setInterval(() => {
      trial();
    }, interval_time);
    return far_distance_content;
  },
  choices: ["OK"],
  data: {
    task: "response-far-distance-px",
  },
  on_finish: (data) => {
    clearInterval(trial_loop_interval);
    document.getElementById("stimulus_block").style.visibility = "hidden";
    data.response = response_slider_value;
  },
};

const near_distance_content = `
<h3><u>近さ</u>位置の調整</h3>
<p>ラインが動いてみえるもっとも<u>近い</u>位置を探ってください。</p><p>位置が決まったらOKボタンを押してください。</p>
 <input id="slider1" type="range" min="0" max="1000" value="10" oninput="sliderUpdate(this)" />
`;
const near_distance = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    trial_loop_interval = setInterval(() => {
      trial();
    }, interval_time);
    return near_distance_content;
  },
  choices: ["OK"],
  data: {
    task: "response-near-distance-px",
  },
  on_finish: (data) => {
    clearInterval(trial_loop_interval);
    document.getElementById("stimulus_block").style.visibility = "hidden";
    data.response = response_slider_value;
  },
};

const slow_timing_content = `
<h3>もっとも<u>遅い</u>タイミングの調整</h3>
<p>ラインが動いて見えるもっとも<u>遅い</u>表示タイミングを探ってください。</p><p>タイミングが決まったらOKボタンを押してください。</p>
<input id="slider2" type="range" min="0" max="5000" value="${SOA}" oninput="sliderUpdate(this)" />
`;

const slow_timing = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    trial_loop_interval = setInterval(() => {
      trial();
    }, interval_time);
    return slow_timing_content;
  },
  choices: ["OK"],
  data: {
    task: "response-slow-timing-ms",
  },
  on_finish: (data) => {
    clearInterval(trial_loop_interval);
    document.getElementById("stimulus_block").style.visibility = "hidden";
    data.response = response_slider_value;
  },
};

const fast_timing_content = `
<h3>もっとも<u>速い</u>タイミングの調整</h3>
<p>ラインが動いて見えるもっとも<u>速い</u>表示タイミングを探ってください。</p><p>タイミングが決まったらOKボタンを押してください。</p>
<input id="slider2" type="range" min="0" max="5000" value="${SOA}" oninput="sliderUpdate(this)" />
`;

const fast_timing = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    trial_loop_interval = setInterval(() => {
      trial();
    }, interval_time);
    return fast_timing_content;
  },
  choices: ["OK"],
  data: {
    task: "response-fast-timing-ms",
  },
  on_finish: (data) => {
    clearInterval(trial_loop_interval);
    document.getElementById("stimulus_block").style.visibility = "hidden";
    data.response = response_slider_value;
  },
};

const pause1_content =
  "<p>次の実験に移ります。ラインが動いた方向をできるだけ速くボタンで回答してください。</p><p>動いていないと感じた時は、●の方向を回答してください。</p>";
const pause1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: pause1_content,
  choices: ["スタート"],
};

// ----------------------------------------------------------------------
// debriefing
const debriefing_content = "<p>これで実験は終了です。お疲れさまでした。ボタンを押して結果を送信してください。</p>"
const debriefing = {
  type: jsPsychHtmlButtonResponse,
  choices: ["送信"],
  data: {
    task: "debriefing",
  },
  stimulus:debriefing_content
};

// ----------------------------------------------------------------------
// Build Timeline

buildTimeline();

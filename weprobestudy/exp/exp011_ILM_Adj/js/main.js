// ----------------------------------------------------------------------
// jsPsych
const jsPsych = initJsPsych({
  display_element: "experiment_block",
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
  timeline.push(welcome);
  timeline.push(instructions);
  timeline.push(enter_fullscreen);
  timeline.push(start);

  timeline.push(far_distance);
  timeline.push(near_distance);
  timeline.push(slow_timing);
  timeline.push(fast_timing);
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
これから、図形を用いた心理学実験を行います。画面の中央（＋があるところ）に図形が表示されます。
<br />画面下（ここ）に指示が表示されます。
<br />＋マークが表示されているときは、注目するようにしてください</p>
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
// Trial

let SOA = 100;
let response_slider_value = 20;
const trial_gap = 500;

const trial = () => {
  setTimeout(() => {
    // 刺激画面の表示
    document.getElementById("stimulus_block").style.visibility = "visible";
    // キュー刺激を表示
    document.getElementById("cue1").classList.add("blink");

    // リードタイム後にターゲット刺激を表示
    setTimeout(() => {
      document.getElementById("target1").classList.add("blink");

      // 指定秒数後に刺激をリセットする
      setTimeout(() => {
        document.getElementById("cue1").classList.remove("blink");
        document.getElementById("target1").classList.remove("blink");
        // 試行ごとに方向を反転させる
        if (Math.random() >= 0.49) {
          document.getElementById("stimulus").classList.toggle("reverse");
        }
      }, trial_gap);
    }, SOA);
  }, trial_gap);// Fixation と Cue の GAP Time

};


const sliderUpdate = (e) => {
  response_slider_value = e.value;
  switch (e.id) {
    case "slider1":
      document.getElementById("spacer1").style.width = `${e.value}px`;
      break;
    case "slider2":
      SOA = e.value;
      break;
    default:
      break;
  }
};

const far_distance = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    return `
      <h3><u>遠さ</u>の調整</h3>
      ラインが動いて見える最も<u>遠い（離れた）</u>位置を探ってください。<br />位置が決まったらOKボタンを押してください。</p>
      <input id="slider1" type="range" class="range range-primary" min="0" max="1000" value="${response_slider_value}" oninput="sliderUpdate(this)" />`;
  },
  choices: ["OK"],
  data: {
    task: "response-far-distance-px",
  },
  on_start: (data) => {
    // バーの位置を初期に戻す
    document.getElementById(
      "spacer1"
    ).style.width = `${response_slider_value}px`;
    // step update
    document.getElementById("step1").classList.add("step-primary");
    // スライダー調整後に刺激を再生
    document.body.addEventListener('mouseup', trial);
  },
  on_finish: (data) => {
    document.getElementById("stimulus_block").style.visibility = "hidden";
    data.response = response_slider_value;
    // スライダー調整後に刺激を再生
    document.body.removeEventListener("mouseup", trial);
  },
};

const near_distance = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    return `
      <h3><u>近さ</u>の調整</h3>
      <p>ラインが動いて見えるもっとも<u>近い</u>位置を探ってください。<br />位置が決まったらOKボタンを押してください。</p>
      <input id="slider1" type="range" class="range range-primary" min="0" max="1000" value="${response_slider_value}" oninput="sliderUpdate(this)" />`;
  },
  choices: ["OK"],
  data: {
    task: "response-near-distance-px",
  },
  on_start: (data) => {
    // step update
    document.getElementById("step2").classList.add("step-primary");
    // スライダー調整後に刺激を再生
    document.body.addEventListener("mouseup", trial);
  },
  on_finish: (data) => {
    data.response = response_slider_value;
    document.getElementById("stimulus_block").style.visibility = "hidden";
    // スライダー調整後に刺激を再生
    document.body.removeEventListener("mouseup", trial);
  },
};

const slow_timing = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    return `
      <h3>もっとも<u>遅い</u>タイミングの調整</h3>
      <p>ラインが動いて見えるもっとも<u>遅い</u>表示タイミングを探ってください。<br />タイミングが決まったらOKボタンを押してください。</p>
      <input id="slider2" type="range" class="range range-secondary" min="0" max="5000" value="${SOA}" oninput="sliderUpdate(this)" />`;
  },
  choices: ["OK"],
  data: {
    task: "response-slow-timing-ms",
  },
  on_start: () => {
    // step update
    document.getElementById("step3").classList.add("step-primary");
    // スライダー調整後に刺激を再生
    document.body.addEventListener("mouseup", trial);
  },
  on_finish: (data) => {
    data.response = response_slider_value;
    document.getElementById("stimulus_block").style.visibility = "hidden";
    // スライダー調整後に刺激を再生
    document.body.removeEventListener("mouseup", trial);
  },
};

const fast_timing = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    return `
      <h3>もっとも<u>速い</u>タイミングの調整</h3>
      <p>ラインが動いて見えるもっとも<u>速い</u>表示タイミングを探ってください。<br />タイミングが決まったらOKボタンを押してください。</p>
      <input id="slider2" type="range" class="range range-secondary" min="0" max="${SOA}"" value="${SOA}" oninput="sliderUpdate(this)" />`;
  },
  choices: ["OK"],
  data: {
    task: "response-fast-timing-ms",
  },
  on_start: () => {
    // step update
    document.getElementById("step4").classList.add("step-primary");
    // スライダー調整後に刺激を再生
    document.body.addEventListener("mouseup", trial);
  },
  on_finish: (data) => {
    data.response = response_slider_value;
    document.getElementById("stimulus_block").style.visibility = "hidden";
    // スライダー調整後に刺激を再生
    document.body.removeEventListener("mouseup", trial);
  },
};

const pause1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<p>次の実験に移ります。ラインが動いた方向をできるだけ速くボタンで回答してください。</p><p>動いていないと感じた時は、●の位置を回答してください。</p>",
  choices: ["スタート"],
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

    const far_distance = jsPsych.data
      .get()
      .filter({ task: "response-far-distance-px" })
      .select("response")
      .mean();
    const near_distance = jsPsych.data
      .get()
      .filter({ task: "response-near-distance-px" })
      .select("response")
      .mean();
    const slow_timing = jsPsych.data
      .get()
      .filter({ task: "response-slow-timing-ms" })
      .select("response")
      .mean();
    const fast_timing = jsPsych.data
      .get()
      .filter({ task: "response-fast-timing-ms" })
      .select("response")
      .mean();

    return `
        <div class="flex flex-col justify-center items-center px-8 py-16">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9.25 42.7q-1.6 0-2.775-1.175Q5.3 40.35 5.3 38.75V9.25q0-1.65 1.175-2.825Q7.65 5.25 9.25 5.25h29.5q1.65 0 2.825 1.175Q42.75 7.6 42.75 9.25v29.5q0 1.6-1.175 2.775Q40.4 42.7 38.75 42.7Zm0-3.95h29.5V9.25H9.25v29.5Zm6.6-4.6q.6 0 1.05-.425.45-.425.45-1.075V25.4q0-.65-.45-1.075-.45-.425-1.05-.425-.65 0-1.075.425-.425.425-.425 1.075v7.25q0 .65.425 1.075.425.425 1.075.425Zm16.35 0q.6 0 1.05-.425.45-.425.45-1.075v-18q0-.65-.45-1.075-.45-.425-1.05-.425-.65 0-1.075.425Q30.7 14 30.7 14.65v18q0 .65.425 1.075.425.425 1.075.425Zm-8.2 0q.65 0 1.075-.425.425-.425.425-1.075v-2.9q0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075v2.9q0 .65.425 1.075.425.425 1.075.425Zm.05-10.25q.6 0 1.025-.425.425-.425.425-1.075v-.05q0-.65-.45-1.05T24 20.9q-.65 0-1.075.425-.425.425-.425 1.075v.05q0 .65.45 1.05t1.1.4ZM9.25 38.75V9.25v29.5Z"/></svg>
        <h3 class="mt-2">あなたの実験結果</h3>
        <div class="text-left">
        <div class="stats shadow">
        <div class="stat">
        <div class="stat-title">Distance</div>
        <div class="stat-value text-primary">${far_distance} px</div>
        <div class="stat-desc">もっとも離れたとき</div>
        </div>
        <div class="stat">
        <div class="stat-title">Distance</div>
        <div class="stat-value text-primary">${near_distance} px</div>
        <div class="stat-desc">もっとも近いとき</div>
        </div>

        <div class="stat">
        <div class="stat-title">Time</div>
        <div class="stat-value text-secondary">${slow_timing} ms</div>
        <div class="stat-desc">もっとも遅いタイミング</div>
        </div>
        <div class="stat">
        <div class="stat-title">Time</div>
        <div class="stat-value text-secondary">${fast_timing} ms</div>
        <div class="stat-desc">もっとも速いタイミング</div>
        </div>
        </div>
        </div>
        </div>
        <p class="text-center">これで実験は終了です。お疲れさまでした。ボタンを押して結果を送信してください。</p>`;
  },
};

// ----------------------------------------------------------------------
// Build Timeline

buildTimeline();


/* jsPsych */
const jsPsych = initJsPsych({
  show_progress_bar: false,
  auto_update_progress_bar: false,
  default_iti: 500,
  on_finish: function () {
    jsPsych.data.addProperties({ expid: wp_expid });
    jsPsych.data.displayData();
    // TODO: ここでJSONをPOSTする
    // window.location = wp_next_url;
  },
});

const wp_expid = jsPsych.randomization.randomID(5);

/* create timeline */
let timeline = [];

// [BrowserCheck] - [Preload] -> [Welcome] -> [Instructions] -> [Fixation] -> [Stimulus]


// Browser Check
const browsercheck = {
  type: jsPsychBrowserCheck,
  data: {
    task:"browser-check"
  }
};
timeline.push(browsercheck);

/* preload assets */
const wp_image_path = 'stimulus/'
const preload_images = [
  wp_image_path + "blue.png",
  wp_image_path + "orange.png"
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
  on_start: (trial) => {
    trial.data.timer = 0
    console.log(trial.data)
  },
  stimulus: (data) => {
    // Tone.Transport.start();
    // calibration_freq.start();
    synth.triggerAttack(500);

    audio_mic
      .open()
      .then(() => {
        data.timer = setInterval(() => {
          let levelmeter = document.getElementById("levelmeter");
          if (levelmeter) {
            levelmeter.setAttribute("value", audio_meter.getValue());
          } else {
            // console.log(levelmeter);
          }
          document.getElementById("console").innerText = audio_meter.getValue();

        }, 100);
        console.log(data.timer);
      })
      .catch((error) => {});

    return "端末本体の音量ボリュームを操作して、メーターが黄色になるように音量を調整してください。<meter id='levelmeter' min='-96' low='-34' optium='-30' high='-28' max='0' value='-96'></meter><div id='console'></div>";
  },
  choices: ["->"],

  on_finish: (data) => {
    data.calibration = audio_meter.getValue();
    console.log(data.timer)
    // Tone.Transport.stop();
    // calibration_freq.stop();
    synth.triggerRelease();
    clearInterval(data.timer);
    audio_mic.close();
  },
};

const audio_calibration_procedure = {
  timeline: [audio_calibration_start, audio_calibration_mic]
}

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
  choices:["->"],
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
const startWeProbe = () => jsPsych.run(timeline);

// AudioTrigger.js

// WebAudio
let WAContext = window.AudioContext || window.webkitAudioContext;
let context;
let device;
let stream;
let init_flag = false;
let param_input_level;
let param_trigger_count;
let param_elapsed_time;

const trigger_start = async () => {
	if (init_flag) {
		return;
	}

	init_flag = true;

	context = new WAContext();
	let rawPatcher = await fetch("src/audiotrigger.json");
	let patcher = await rawPatcher.json();
	device = await RNBO.createDevice({ context, patcher });
	navigator.mediaDevices
		.getUserMedia({ audio: true, video: false })
		.then((_stream) => {
			stream = _stream;
			const UserMediaSource = context.createMediaStreamSource(stream);
			UserMediaSource.connect(device.node);
		});
	device.parametersById.get("threshold_dB").value = -18;
	device.parametersById.get("report_interval").value = 100;
	device.messageEvent.subscribe((ev) => {
		switch (ev.tag) {
			case "out2":
				// trigger
				bang();
				break;
			case "out3":
				// input level
				param_input_level = ev.payload;
				input_level(param_input_level);
				break;
			case "out4":
				// trigger count
				param_trigger_count = ev.payload;
				break;
			case "out5":
				// elapsed time
				param_elapsed_time = ev.payload;
				break;
			default:
				break;
		}
	});

	// Start
	device.parametersById.get("report").value = 1;
};

const input_level = (value) => {
	document.getElementById("meter1").value = value;
};

const bang = () => {
	const event = new CustomEvent("audioIn", {
		detail: {
			input_level: param_input_level,
			trigger_count: param_trigger_count,
			elapsed_time: param_elapsed_time,
		},
	});
	document.dispatchEvent(event);
};

const setTriggerLevel = (value) => {
	device.parametersById.get("threshold_dB").value = value;
	document.getElementById('label1').innerText = value;
};

window.addEventListener("load", () => {
	document.addEventListener(
		"click",
		() => {
			trigger_start();
		},
		{ once: true }
	);
	// Debug Interface
	const d = `
		<div id="audiotrigger_debug_window" class="">
        	<meter id="meter1" min="-90" max="6" value="-90"></meter>
        	<input id="slider1" type="range" min="-90" max="6" value="-36" onchange="setTriggerLevel(this.value)">
			<p id="label1">---<p>
		</div>
		<style>

			#audiotrigger_debug_window {
				position:absolute;
				top:50%;
				letf:50%;
				width: 50%;
				height: 50%;
				background-color: black;
				color:white;
				border-radius:10px;
				transform: translateY(-50%) translateX(50%);
				z-index: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 50px;
			}

			#meter1 {
				width:100%;
				height:50px;
			}

			#slider1 {
				width:100%;
				height:50px;
			}

			#label1 {
				margin-bottom:16px;
			}

			.invisible {
				visibility: hidden;
			}

		</style>
        `;
	document.body.insertAdjacentHTML("afterbegin", d);
	//
	document.addEventListener("click", () => {
		document
			.getElementById("audiotrigger_debug_window")
			.classList.toggle("invisible");
	});
});

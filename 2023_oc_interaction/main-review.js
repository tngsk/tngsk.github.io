let rawJson;
let contentList;
let loop_movie;
let reaction_movie;
let loop_count;
let playList;
let info;

let count = 0;
const max_repeat = 2;
let currentIndex = 0;

const fileDir = "./files/";

//

const sample = {
	C4: "sound/Clap-Aspen.mp3",
};

const samplr = new Tone.Sampler(sample).toDestination();

const getRandomValueFromArray = (array) => {
	let length = array.length;
	let randomIndex = Math.floor(Math.random() * length);
	let randomValue = array.splice(randomIndex, 1)[0];
	return randomValue;
};

const getCurrentValueFromArray = () => {
	let ret = null;
	if (currentIndex <= playList.length) {
		ret = playList[currentIndex];
	}
	return ret;
};

const reloadMovie = () => {
	if (playList.length <= 0) {
		// playList = [...jsonData];
		return;
	}

	loop_movie.pause();
	reaction_movie.pause();

	// const content = getRandomValueFromArray(playList);
	const content = getCurrentValueFromArray();
	info.innerText = content.id + " " + content.name;

	loop_movie.src = fileDir + content.loop_movie;
	reaction_movie.src = fileDir + content.reaction_movie;

	loop_movie.load();
	reaction_movie.load();

	currentIndex++;
};

window.addEventListener("load", () => {
	playList = [...jsonData];

	// 映像準備
	loop_movie = document.getElementById("loop_movie");
	reaction_movie = document.getElementById("reaction_movie");
	// ループ映像のカウント
	loop_count = 0;

	//
	info = document.getElementById("info");

	// ループ設定
	loop_movie.addEventListener("ended", () => {
		loop_movie.currentTime = 0;
		loop_movie.play();
		loop_count++;
		console.log(loop_count);

		if (loop_count > max_repeat) {
			// loop_count = 0;

			samplr.triggerAttackRelease("C4", "1n");
			const event = new CustomEvent("audioIn", {});
			setTimeout(() => {
				document.dispatchEvent(event);
			}, 200);
		}
	});

	// リアクション映像が最後まで再生されたときの処理
	reaction_movie.addEventListener("ended", () => {
		setTimeout(() => {
			// リアクション映像を隠す
			reaction_movie.classList.add("hide");
			// リアクション映像の再生位置を0にする
			reaction_movie.currentTime = 0;
			// 次の映像へ
			reloadMovie();

			// ループ映像を表示する
			loop_movie.classList.remove("hide");
			// ループ映像を再生する
			loop_movie.currentTime = 0;
			loop_movie.play();
		}, 3000);
	});

	// 音がした！イベントに反応する処理
	document.addEventListener("audioIn", () => {
		// 1. ループ回数以下だったら反応しない
		if (loop_count < 3) {
			return;
		}

		// 2. ループ映像を隠す
		loop_movie.classList.add("hide");
		loop_movie.pause();
		loop_count = 0;

		// 3. リアクション映像を表示する
		reaction_movie.classList.remove("hide");

		// 4. リアクション映像を再生する
		reaction_movie.play();
	});
});

document.addEventListener(
	"click",
	async () => {
		await Tone.start();
		console.log("Tone.js ready.");
		// 再生開始
		reloadMovie();
		loop_movie.play();
	},
	{ once: true }
);

document.addEventListener("keydown", (e) => {
	switch (e.code) {
		case "Space":
			loop_movie.play();
			break;
		case "ArrowLeft":
			currentIndex--;
			if (currentIndex < 0) {
				currentIndex = 0;
			}
			const d1 = getCurrentValueFromArray();
			info.innerText = d1.id + " " + d1.name;
			break;
		case "ArrowRight":
			currentIndex++;
			if (currentIndex > playList.length - 1) {
				currentIndex = playList.length - 1;
			}
			const d2 = getCurrentValueFromArray();
			info.innerText = d2.id + " " + d2.name;
			break;
		case "Enter":
			reloadMovie();
			break;
		default:
			break;
	}
});

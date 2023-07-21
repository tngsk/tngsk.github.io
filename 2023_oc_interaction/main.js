let rawJson;
let contentList;
let loop_movie;
let reaction_movie;
let loop_count;
let playList;
let info;

let count = 0;
const max_repeat = 0;

const fileDir = "./files/";

const getRandomValueFromArray = (array) => {
	let length = array.length;
	let randomIndex = Math.floor(Math.random() * length);
	let randomValue = array.splice(randomIndex, 1)[0];
	return randomValue;
};

const reloadMovie = () => {

    if (playList.length <= 0) {
        playList = [...jsonData];
    }

	const content = getRandomValueFromArray(playList);

	info.innerText = content.id + " " + content.name;

	loop_movie.src = fileDir + content.loop_movie;
	reaction_movie.src = fileDir + content.reaction_movie;

	loop_movie.load();
	reaction_movie.load();
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

		if (loop_count > max_repeat) {
			const event = new CustomEvent("audioIn", {});
			document.dispatchEvent(event);
		}
	});

	// リアクション映像が最後まで再生されたときの処理
	reaction_movie.addEventListener("ended", () => {
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
	});

	// 音がした！イベントに反応する処理
	document.addEventListener("audioIn", () => {
		// 1. ループ回数以下だったら反応しない
		if (loop_count < 2) {
			return;
        }

		// 2. ループ映像を隠す
		loop_movie.classList.add("hide");
		// loop_movie.pause();
		loop_count = 0;

		// 3. リアクション映像を表示する
		reaction_movie.classList.remove("hide");

		// 4. リアクション映像を再生する
		reaction_movie.play();
	});


});

document.addEventListener(
	"click",
	() => {
		// 再生開始
		reloadMovie();
		loop_movie.play();
	},
	{ once: true }
);

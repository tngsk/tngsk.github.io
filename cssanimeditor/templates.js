// 初期コードテンプレート
var initialTemplates = {
  html: `<div class="container">
    <p>図形をタップしてアニメーションを確認しよう</p>

    <div class="animation-area">
        <div class="square" id="animatedSquare"></div>
    </div>

    <div class="instructions">
        <h2>やってみよう</h2>
        <ol>
            <li>アニメーションの速度を変更してみよう（1s -> 0.5s）</li>
            <li>アニメーションの種類を変更してみよう（ease-out -> ease-in-out）</li>
            <li>色を変化させるアニメーションを追加してみよう</li>
            <li>回転のアニメーションを追加してみよう</li>
            <li>複数のアニメーションを組み合わせてみよう</li>
        </ol>
    </div>
</div>

<style>
/* 基本スタイル */
body {
    font-family: "Arial", sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    margin: 0;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

h1 {
    color: white;
    margin-bottom: 10px;
    font-size: 2.5rem;
}

p {
    color: white;
    margin-bottom: 30px;
    font-size: 1.1rem;
}

.animation-area {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    margin-bottom: 30px;
}

.square {
    width: 80px;
    height: 80px;
    background-color: #ff6b6b;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.1s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.square:hover {
    transform: scale(1.05);
}

/* 指示書のスタイル */
.instructions {
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 15px;
    text-align: left;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.instructions h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 1.8rem;
}

.instructions ol {
    padding-left: 20px;
}

.instructions li {
    margin-bottom: 10px;
    font-size: 1.1rem;
    line-height: 1.5;
}
</style>`,

  css: `/* アニメーション実行時のクラス */
.square.animate {
    animation: scaleUp 1s ease-out;
}

/* 基本のキーフレームアニメーション */
@keyframes scaleUp {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.8);
    }
    100% {
        transform: scale(1);
    }
}

/* 色変化アニメーション */
@keyframes colorChange {
    0% {
        background-color: #ff6b6b;
    }
    50% {
        background-color: #4ecdc4;
    }
    100% {
        background-color: #ff6b6b;
    }
}

/* 回転アニメーション */
@keyframes rotate {
    0% {
        transform: rotate(0deg) scale(1);
    }
    50% {
        transform: rotate(180deg) scale(1.8);
    }
    100% {
        transform: rotate(360deg) scale(1);
    }
}

/* 複合アニメーション */
@keyframes complexAnimation {
    0% {
        transform: rotate(0deg) scale(1);
        background-color: #ff6b6b;
        border-radius: 10px;
    }
    25% {
        transform: rotate(90deg) scale(1.5);
        background-color: #4ecdc4;
        border-radius: 50%;
    }
    75% {
        transform: rotate(270deg) scale(1.8);
        background-color: #45b7d1;
        border-radius: 20px;
    }
    100% {
        transform: rotate(360deg) scale(1);
        background-color: #ff6b6b;
        border-radius: 10px;
    }
}

/*
=====================================
📝 やってみよう（演習課題）
=====================================

課題1: アニメーション速度の変更
.square.animate {
    animation: scaleUp 0.5s ease-out;
}

課題2: アニメーション種類の変更
.square.animate {
    animation: scaleUp 1s ease-in-out;
}

課題3: 色変化アニメーションを追加
.square.animate {
    animation:
        scaleUp 1s ease-out,
        colorChange 1s ease-out;
}

課題4: 回転アニメーションを試す
.square.animate {
    animation: rotate 1s ease-out;
}

課題5: 複数アニメーションの組み合わせ
.square.animate {
    animation: complexAnimation 2s ease-in-out;
}

=====================================
💡 ヒント：
- duration: 秒数（例：0.5s, 2s）
- timing-function: ease, ease-in, ease-out, ease-in-out, linear
- 複数指定はカンマで区切る
=====================================
*/`,

  js: `document.addEventListener("DOMContentLoaded", function () {
    var square = document.getElementById("animatedSquare");

    if (square) {
        square.addEventListener("click", function () {
            square.classList.remove("animate");
            square.offsetHeight;
            square.classList.add("animate");
        });

        square.addEventListener("animationend", function () {
            square.classList.remove("animate");
        });
    }
});`,
};

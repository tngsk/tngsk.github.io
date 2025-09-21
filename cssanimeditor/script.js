// CSS Animation Editor JavaScript

// 現在のアクティブなタブ
var currentTab = "css";

// エディタ要素の参照
var editors = {
  html: document.getElementById("htmlEditor"),
  css: document.getElementById("cssEditor"),
  js: document.getElementById("jsEditor"),
};

// タブ切り替え機能
function switchTab(tab) {
  document.querySelectorAll(".tab").forEach(function (t) {
    t.classList.remove("active");
  });
  event.target.classList.add("active");

  Object.keys(editors).forEach(function (key) {
    if (key === tab) {
      editors[key].classList.remove("hidden");
    } else {
      editors[key].classList.add("hidden");
    }
  });

  currentTab = tab;
}

// コード実行機能
function runCode() {
  var preview = document.getElementById("preview");
  var htmlCode = editors.html.value;
  var cssCode = editors.css.value;
  var jsCode = editors.js.value;

  var fullHTML =
    '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>' +
    cssCode +
    "</style></head><body>" +
    htmlCode +
    "<script>" +
    jsCode +
    "<\/script></body></html>";

  preview.srcdoc = fullHTML;
}

// コードリセット機能
function resetCode() {
  if (confirm("コードを初期状態にリセットしますか？")) {
    location.reload();
  }
}

// 初期化処理
function initializeEditor() {
  // エディタ要素の参照を再取得（DOMロード後）
  editors = {
    html: document.getElementById("htmlEditor"),
    css: document.getElementById("cssEditor"),
    js: document.getElementById("jsEditor"),
  };

  // 初期コードを設定
  if (typeof initialTemplates !== "undefined") {
    Object.keys(initialTemplates).forEach(function (key) {
      if (editors[key]) {
        editors[key].value = initialTemplates[key];
      }
    });
  }

  // 初回実行
  runCode();

  // イベントリスナー設定
  setupEventListeners();
}

// イベントリスナーの設定
function setupEventListeners() {
  Object.keys(editors).forEach(function (tab) {
    var editor = editors[tab];

    if (editor) {
      // 入力イベント - リアルタイム更新
      editor.addEventListener("input", function () {
        clearTimeout(window.updateTimeout);
        window.updateTimeout = setTimeout(runCode, 1000);
      });

      // Tab キーでインデント機能
      editor.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
          e.preventDefault();
          var start = this.selectionStart;
          var end = this.selectionEnd;
          this.value =
            this.value.substring(0, start) + "  " + this.value.substring(end);
          this.selectionStart = this.selectionEnd = start + 2;
        }
      });
    }
  });
}

// DOMContentLoaded イベントで初期化
document.addEventListener("DOMContentLoaded", initializeEditor);

// load イベントでも初期化（フォールバック）
window.addEventListener("load", function () {
  if (
    Object.values(editors).some(function (editor) {
      return !editor;
    })
  ) {
    initializeEditor();
  }
});

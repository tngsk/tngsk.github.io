// Define study
const study = lab.util.fromObject({
  "title": "root",
  "type": "lab.flow.Sequence",
  "parameters": {},
  "plugins": [
    {
      "type": "lab.plugins.Metadata",
      "path": undefined
    },
    {
      "type": "lab.plugins.Download",
      "filePrefix": "study",
      "path": undefined
    }
  ],
  "metadata": {
    "title": "",
    "description": "",
    "repository": "",
    "contributors": ""
  },
  "messageHandlers": {},
  "files": {},
  "responses": {},
  "content": [
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "もっとも大きなデータ要素を探す実験",
          "content": "本日は実験にご協力いただきありがとうございます！\n\n\u003Cbr\u003E\u003Cbr\u003E実験では、画面中央に横に並んだ「5つの数字」か「5本の棒グラフ」が表示されます。\nその中でもっとも大きいデータ要素（最も値の大きな数値か棒）をクリックしてください。\n\u003Cbr\u003E（タッチパネル液晶をお使いの場合は指タップでも実験可能ですが、画面の小さいスマホは使わないでください）\n\n\u003Cbr\u003E\u003Cbr\u003E選択はなるべく速く、そしてなるべく正確に行ってください。\n\n\u003Cbr\u003E\u003Cbr\u003E毎回、判断していただく画面に先立ち、画面の中央に「＋」、\n下の方に「クリックしてスタート」という文字がある画面が提示されます。\n\n\u003Cbr\u003E\u003Cbr\u003E毎回必ず「＋」に視線を置いた上、「クリックしてスタート」を\n押して実験を始めてください。指タップでももちろん可能です。\n\u003Cbr\u003E（マウスボタン（指）の押し下げではなく、離したとき（mouse-up）に実験が始まります。\nですので、マウスを押し下げた上で「＋」に視線を合わせてからマウスボタンを\n離して実験を始めるとスムーズです）\n\n\u003Cbr\u003E\u003Cbr\u003E判断いただく数字やグラフは全部で20組となります。すぐ終わると思います。\n\n\u003Cbr\u003E\u003Cbr\u003Eそれでは準備ができたら右下の「実験始める→」をクリックして実験を始めてください。\n\u003Cbr\u003Eよろしくお願いします！"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "実験を始める →",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "教示"
    },
    {
      "type": "lab.flow.Loop",
      "templateParameters": [
        {
          "num1": "27",
          "num2": "41",
          "num3": "22",
          "num4": "38",
          "num5": "34",
          "max": "41",
          "mean": "32.4",
          "std": "7.002856560004639",
          "img": "none.png",
          "correct": "2"
        },
        {
          "num1": "95",
          "num2": "84",
          "num3": "104",
          "num4": "82",
          "num5": "96",
          "max": "104",
          "mean": "92.2",
          "std": "8.158431221748456",
          "img": "none.png",
          "correct": "3"
        },
        {
          "num1": "93",
          "num2": "90",
          "num3": "79",
          "num4": "92",
          "num5": "76",
          "max": "93",
          "mean": "86.0",
          "std": "7.0710678118654755",
          "img": "none.png",
          "correct": "1"
        },
        {
          "num1": "56",
          "num2": "28",
          "num3": "27",
          "num4": "75",
          "num5": "42",
          "max": "75",
          "mean": "45.6",
          "std": "18.11739495622922",
          "img": "none.png",
          "correct": "4"
        },
        {
          "num1": "24",
          "num2": "58",
          "num3": "51",
          "num4": "32",
          "num5": "46",
          "max": "58",
          "mean": "42.2",
          "std": "12.464349160706305",
          "img": "none.png",
          "correct": "2"
        },
        {
          "num1": "17",
          "num2": "19",
          "num3": "27",
          "num4": "0",
          "num5": "35",
          "max": "35",
          "mean": "19.6",
          "std": "11.689311356961968",
          "img": "none.png",
          "correct": "5"
        },
        {
          "num1": "72",
          "num2": "76",
          "num3": "65",
          "num4": "46",
          "num5": "59",
          "max": "76",
          "mean": "63.6",
          "std": "10.556514576317317",
          "img": "none.png",
          "correct": "2"
        },
        {
          "num1": "79",
          "num2": "73",
          "num3": "85",
          "num4": "77",
          "num5": "74",
          "max": "85",
          "mean": "77.6",
          "std": "4.2708313008125245",
          "img": "none.png",
          "correct": "3"
        },
        {
          "num1": "13",
          "num2": "6",
          "num3": "25",
          "num4": "4",
          "num5": "2",
          "max": "25",
          "mean": "10.0",
          "std": "8.366600265340756",
          "img": "none.png",
          "correct": "3"
        },
        {
          "num1": "71",
          "num2": "69",
          "num3": "73",
          "num4": "55",
          "num5": "53",
          "max": "73",
          "mean": "64.2",
          "std": "8.44748483277715",
          "img": "none.png",
          "correct": "3"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "41",
          "mean": "32.4",
          "std": "7.002856560004639",
          "img": "0.png",
          "correct": "2"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "104",
          "mean": "92.2",
          "std": "8.158431221748456",
          "img": "1.png",
          "correct": "3"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "93",
          "mean": "86.0",
          "std": "7.0710678118654755",
          "img": "2.png",
          "correct": "1"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "75",
          "mean": "45.6",
          "std": "18.11739495622922",
          "img": "3.png",
          "correct": "4"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "58",
          "mean": "42.2",
          "std": "12.464349160706305",
          "img": "4.png",
          "correct": "2"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "35",
          "mean": "19.6",
          "std": "11.689311356961968",
          "img": "5.png",
          "correct": "5"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "76",
          "mean": "63.6",
          "std": "10.556514576317317",
          "img": "6.png",
          "correct": "2"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "85",
          "mean": "77.6",
          "std": "4.2708313008125245",
          "img": "7.png",
          "correct": "3"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "25",
          "mean": "10.0",
          "std": "8.366600265340756",
          "img": "8.png",
          "correct": "3"
        },
        {
          "num1": "",
          "num2": "",
          "num3": "",
          "num4": "",
          "num5": "",
          "max": "73",
          "mean": "64.2",
          "std": "8.44748483277715",
          "img": "9.png",
          "correct": "3"
        }
      ],
      "sample": {
        "mode": "draw-shuffle"
      },
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "繰り返し（実験パラメータ）",
      "shuffleGroups": [],
      "template": {
        "type": "lab.flow.Sequence",
        "files": {},
        "responses": {
          "": ""
        },
        "parameters": {},
        "messageHandlers": {},
        "title": "試行",
        "content": [
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "i-text",
                "left": 0,
                "top": 0,
                "angle": 0,
                "width": 18.69,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "+",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 0,
                "top": 250,
                "angle": 0,
                "width": 108,
                "height": 43.93,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "クリックして\nスタート",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": "18",
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "aoi",
                "left": 1.09,
                "top": 247.35,
                "angle": 0,
                "width": 123.04,
                "height": 66.34,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "rgba(0, 0, 0, 0.2)",
                "label": "btn_start"
              }
            ],
            "viewport": [
              800,
              600
            ],
            "files": {},
            "responses": {
              "mouseup @btn_start": "start"
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Fixation Cross"
          },
          {
            "type": "lab.canvas.Screen",
            "content": [
              {
                "type": "image",
                "left": 0,
                "top": -120,
                "angle": 0,
                "width": 540,
                "height": 331.2,
                "stroke": null,
                "strokeWidth": 0,
                "fill": "black",
                "src": "${ this.files[parameters.img] }"
              },
              {
                "type": "i-text",
                "left": -200,
                "top": 0,
                "angle": 0,
                "width": 344.54,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "${ parameters.num1 }",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "aoi",
                "left": -200,
                "top": -107.9,
                "angle": 0,
                "width": 100,
                "height": 314.8,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "rgba(0, 0, 0, 0.2)",
                "label": "btnA"
              },
              {
                "type": "aoi",
                "left": -100,
                "top": -108.4,
                "angle": 0,
                "width": 100,
                "height": 313.8,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "rgba(0, 0, 0, 0.2)",
                "label": "btnB"
              },
              {
                "type": "aoi",
                "left": 0,
                "top": -108.06,
                "angle": 0,
                "width": 100,
                "height": 314.48,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "rgba(0, 0, 0, 0.2)",
                "label": "btnC"
              },
              {
                "type": "aoi",
                "left": 100,
                "top": -107.56,
                "angle": 0,
                "width": 100,
                "height": 313.48,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "rgba(0, 0, 0, 0.2)",
                "label": "btnD"
              },
              {
                "type": "aoi",
                "left": 200,
                "top": -107.56,
                "angle": 0,
                "width": 100,
                "height": 313.48,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "rgba(0, 0, 0, 0.2)",
                "label": "btnE"
              },
              {
                "type": "i-text",
                "left": -100,
                "top": 0,
                "angle": 0,
                "width": 344.54,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "${ parameters.num2 }",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 0,
                "top": 0,
                "angle": 0,
                "width": 344.54,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "${ parameters.num3 }",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 100,
                "top": 0,
                "angle": 0,
                "width": 344.67,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "${ parameters.num4 }",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": 32,
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              },
              {
                "type": "i-text",
                "left": 200,
                "top": 0,
                "angle": 0,
                "width": 344.54,
                "height": 36.16,
                "stroke": null,
                "strokeWidth": 1,
                "fill": "black",
                "text": "${ parameters.num5 }",
                "fontStyle": "normal",
                "fontWeight": "normal",
                "fontSize": "32",
                "fontFamily": "sans-serif",
                "lineHeight": 1.16,
                "textAlign": "center"
              }
            ],
            "viewport": [
              800,
              600
            ],
            "files": {
              "0.png": "embedded\u002F6da0583364246594469171002a9aeabc7b485aad9212282e07b2b4a518b48909.png",
              "1.png": "embedded\u002F56441d1c2f0f5c1a3a54349180b2afec39ba22c5e838c44cc6690c46237125d8.png",
              "2.png": "embedded\u002Fe2b3550beed1245bf91b16317e28110e87fc07256ce9b04bfd3eb67e8391eb22.png",
              "3.png": "embedded\u002F6d6e061c1dea9a3af0a86ac7c64990c2ba7bd2f928673943a044e1d58ac444d5.png",
              "4.png": "embedded\u002Ff86b93ea4b871cb71b7b40d28a35b32abc100aa4176f4481ecd6458e4d88c970.png",
              "5.png": "embedded\u002F4b4fc07b2badd7cbba95e6c9c691dc26c9195f5ef8504c23f4d27ad27d481a49.png",
              "6.png": "embedded\u002F23538fe585e0b909158be5cd31c7b362c3422561f2ea008062ce9bdfb442d11c.png",
              "7.png": "embedded\u002F664e7e6383ec1e8397858a12fb85dc3ff94dc96e1059ef7b2af7ead0b2c52b1d.png",
              "8.png": "embedded\u002Fe88c97a271f5efff4bff5765ab70d5bc1fd9f489630e3bddf45237cad0f9cf5f.png",
              "9.png": "embedded\u002F067eb9c9bb2e4824bb027b0c529909fed5a80ceaa1b2805ee14b757367158ab4.png",
              "none.png": "embedded\u002Ff6671819c0bf52f2845ecd5607840cb1d44907826282fdbf3fa15cb036429088.png"
            },
            "responses": {
              "click @btnA": "1",
              "click @btnB": "2",
              "click @btnC": "3",
              "click @btnD": "4",
              "click @btnE": "5"
            },
            "parameters": {},
            "messageHandlers": {},
            "title": "Stimulus + responce",
            "correctResponse": "${ parameters.correct }"
          }
        ]
      }
    },
    {
      "type": "lab.html.Page",
      "items": [
        {
          "type": "text",
          "title": "お疲れ様でした！",
          "content": "右下の「データダウンロードを始める」を押して、この画面の上部にあらわれる灰色の「Download data」ボタンを押してCSVファイルを保存してください。\n\n\u003Cbr\u003E\u003Cbr\u003Eデータは研究以外の目的には使用しません。またこのCSVファイルには個人が特定できるデータは含まれていません。実験にご協力いただきありがとうございました！"
        }
      ],
      "scrollTop": true,
      "submitButtonText": "データダウンロードを始める→",
      "submitButtonPosition": "right",
      "files": {},
      "responses": {
        "": ""
      },
      "parameters": {},
      "messageHandlers": {},
      "title": "データDL指示・御礼"
    }
  ]
})

// Let's go!
study.run()
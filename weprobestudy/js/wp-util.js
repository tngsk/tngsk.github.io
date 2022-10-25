

// Audio: Amplitube to Decibell
const atodb = (gain) => {
  return 20 * (Math.log(gain) / Math.LN10);
};

// Sum
const arraySum = (data) => {
  return data.reduce((x, y) => x + y, 0);
};

// Mean
const arrayMean = (data) => {
    return arraySum(data) / data.length
}

// Limitter
const limiter = (n, low, high) => {
  return Math.max(Math.min(n, high), low);
};

// Map (Scale)
const map = (n, start1, stop1, start2, stop2) => {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

  if (start2 < stop2) {
    return limiter(newval, start2, stop2);
  } else {
    return limiter(newval, stop2, start2);
  }
};


// Staircase Method
const WPStaircase = {
  level: 1.0,
  min: 0.1,
  max: 1.0,
  mappedLevel: 0,
  mappedMin: 0,
  mappedMax: 1,
  responses: [],
  positiveCount: 0,
  negativeCount: 0,
  stepSize: 0.01,
  flipCount: 0,
  repeatCount: 0,
  direction: "Down",
  lastDirection: "Down",
  trialCount: 0,
  tag: "",
  init: () => {
    WPStaircase.level = 1.0;
    WPStaircase.mappedLevel = 0;
    WPStaircase.mappedMin = 0;
    WPStaircase.mappedMax = 0;
    WPStaircase.responses = [];
    WPStaircase.positiveCount = 0;
    WPStaircase.negativeCount = 0;
    WPStaircase.flipCount = 0;
    WPStaircase.direction = "Down";
    WPStaircase.lastDirection = "Down";
    WPStaircase.trialCount = 0;
  },
  setScale: (min, max) => {
    WPStaircase.mappedMin = min;
    WPStaircase.mappedMax = max;
  },
  setTag: (tag) => {
    WPStaircase.tag = tag;
  },
  reset: () => {
    WPStaircase.positiveCount = 0;
    WPStaircase.negativeCount = 0;
  },
  get: () => {
    WPStaircase.mappedLevel = map(
      WPStaircase.level,
      WPStaircase.min,
      WPStaircase.max,
      WPStaircase.mappedMin,
      WPStaircase.mappedMax
    );
    return WPStaircase.mappedLevel;
  },
  addResponse: (response) => {
    // 試行回数をカウント
    WPStaircase.trialCount += 1;

    // 反応を記録 : true(1) or false(0)
    if (response) {
      WPStaircase.positiveCount++;
    } else {
      WPStaircase.negativeCount++;
    }

    // 反転
    if (WPStaircase.direction != WPStaircase.lastDirection) {
      WPStaircase.lastDirection = WPStaircase.direction;
        WPStaircase.flipCount++;
        console.log("flip:" + WPStaircase.flipCount);
      // 反転したときの数値を記録
      // WPStaircase.responses[WPStaircase.flipCount - 1] = WPStaircase.level;
      WPStaircase.responses[WPStaircase.flipCount - 1] = WPStaircase.get();
    }

    // 誤反応
    if (WPStaircase.negativeCount >= 1) {
      WPStaircase.reset();
      WPStaircase.level = WPStaircase.level * 10.0 ** WPStaircase.stepSize;
      if (WPStaircase.level >= WPStaircase.max) {
        WPStaircase.level = WPStaircase.max;
      }
      WPStaircase.direction = "Up";
    }

    // 正反応
    const condi = () => {
      let result = WPStaircase.flipCount ? 3 : 1;
      if (WPStaircase.direction == "Down") {
        result = 1;
      }
      return result;
    };
    if (WPStaircase.positiveCount >= condi()) {
      WPStaircase.reset();
      WPStaircase.level = WPStaircase.level / 10.0 ** WPStaircase.stepSize;
      if (WPStaircase.level <= WPStaircase.min) {
        WPStaircase.level = WPStaircase.min;
      }
      WPStaircase.direction = "Down";
    }
  },
  isLoop: () => {
    // 終了条件：3回反転かつ指定回数繰り返し
    if (
      WPStaircase.flipCount >= 3 &&
      WPStaircase.trialCount >= WPStaircase.repeatCount
    ) {
      // done
      return false;
    } else {
      // loop
      return true;
    }
  },
};

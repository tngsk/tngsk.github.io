// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Real time Object Detection using YOLO and p5.js
=== */

let video;
let yolo;
let status;
let objects = [];

let hito = 0


function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);

  // Create a YOLO method
  yolo = ml5.YOLO(video, startDetecting);

  // Hide the original video
  video.hide();

}

function draw() {
  image(video, 0, 0, width, height);

  hito = 0

  for (let i = 0; i < objects.length; i++) {
    // noStroke();
    // fill(0, 255, 0);
    // text(objects[i].className, objects[i].x * width, objects[i].y * height - 5);
    // noFill();
    // strokeWeight(4);
    // stroke(0, 255, 0);
    // rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);

    if (objects[i].className == "person"){
      hito = 1
    }
  }
}

function startDetecting() {

  detect();
}

function detect() {
  yolo.detect(function(err, results) {
    objects = results;
    detect();
  });
}
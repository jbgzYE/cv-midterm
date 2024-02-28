// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Object Detection using COCOSSD
This example uses a callback pattern to create the classifier
=== */

let video;
let detector;
let detections = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  // video.hide();
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function draw() {
  // clear();
    if(detections.length > 0) {
      drawDetections();
    }
}

function drawDetections() {
  // push();
  // translate(width, 0);
  // scale(-1, 1);
  // image(video, 0, 0);
  // pop();

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    stroke(0, 255, 0);
    strokeWeight(0.1);
    noFill();
    rect(width-object.width-object.x, object.y, object.width, object.height);
    noStroke();
    fill(255,255,255,125);
    textSize(10);
    text(object.label, width-object.width-object.x + 10, object.y + 24);

    xpos = random(0,width);
    ypos = random(0,height);
    
    stroke(255,25,25);
    strokeWeight(0.4);
    // line(object.x + object.width /2 , object.y + object.height /2  , xpos, ypos);
    line(object.x, object.y, xpos,ypos);
    textSize(10);
    // textAlign(CENTER);
    fill(255, 255, 255, 125)
    noStroke();
    text('0',width-object.x, height-object.y);
    text('1',width-object.x + object.width /2, height-object.y + object.height /2);
    text('2',object.x + object.width /2, height-object.y);
    text('3',width-object.x + object.width /2, height-object.y);
    text('4',object.x + object.width /2, height-object.y + object.height /2);
    text('5', height-object.y,width-object.x);
    text('6', height-object.y + object.height /2,width-object.x + object.width /2, );
    text('7', height-object.y,object.x + object.width /2);
    text('8', height-object.y,width-object.x + object.width /2);
    text('9', height-object.y + object.height /2,object.x + object.width /2);
  }
}

class Particle {

  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.vx = random(-1, 1);
    this.vy = random(-5, -1);
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  show() {
    noStroke();
    //stroke(255);
    fill(255, this.alpha);
    ellipse(this.x, this.y, 16);
  }
}
  
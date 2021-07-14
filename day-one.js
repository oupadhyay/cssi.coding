/**
 * File: /Users/ojaswupadhyay/Dropbox (GaTech)/coding/cssi.coding/day-one.js
 * Project: /day-one.js
 * Created Date: Tuesday, July 13th 2021, 3:00:04 pm
 * Author: Ojasw Upadhyay
 * ----------------------------------------------------
 * Last Modified: Tue Jul 13 2021
 * Modified By: Ojasw Upadhyay
 * ----------------------------------------------------
 * Copyright (c) 2021 Ojasw Upadhyay
 */

let helvetica_neue;
function preload() {
    helvetica_neue = loadFont("HelveticaNeue-Regular.otf");
}
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    textFont(helvetica_neue);
    textAlign(CENTER, CENTER);
}
function draw() {
    background(255);
    fill(0);
    noStroke();
    textSize(Math.min(windowHeight / 40, windowWidth / 40));
    text("X= " + mouseX + " Y= " + mouseY, - windowWidth / 2.5, - windowHeight / 2.5);
    let time = millis();
    rotateX(time / 1000);
    rotateZ(time / 1000);
    textSize(width / 4);
    noFill(); //remove the fill
    strokeWeight(Math.min(windowWidth / 50, windowHeight / 50)); // increase stroke weight
    let scale = Math.min(windowHeight / 20, windowWidth / 20);

    // Ring 1: Blue
    stroke(10, 134, 205);
    ellipse(-5 * scale, -1 * scale, 5 * scale, 5 * scale, 50);

    // Ring 2: Yellow
    stroke(255, 214, 0);
    ellipse(-2 * scale, 2 * scale, 5 * scale, 5 * scale, 50);

    // Ring 3: Black
    stroke(0, 0, 0);
    ellipse(1 * scale, -1 * scale, 5 * scale, 5 * scale, 50);

    // Ring 4: Green
    stroke(33, 176, 76);
    ellipse(4 * scale, 2 * scale, 5 * scale, 5 * scale, 50);

    // Ring 5:
    stroke(234, 30, 35);
    ellipse(7 * scale, -1 * scale, 5 * scale, 5 * scale, 50);
}

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

// let trebuchet;
function preload() {
    // trebuchet = loadFont('Trebuchet MS');
}
function setup() {
    createCanvas(200, 200, WEBGL);
    // textFont(trebuchet);
    textAlign(CENTER, CENTER);
}
function draw() {
    background(255);
    fill(0);
    noStroke();
    textSize(10);
    text("X= " + mouseX + " Y= " + mouseY, -65, -85);
    let time = millis();
    rotateX(time / 1000);
    rotateZ(time / 1000);
    textSize(width / 4);
    // text('p5.js', 0, 0);
    noFill(); //remove the fill
    strokeWeight(5); // increase stroke weight

    // Ring 1: Blue
    stroke(10, 134, 205);
    ellipse(-50, -10, 50, 50, 50);

    // Ring 2: Yellow
    stroke(255, 214, 0);
    ellipse(-20, 20, 50, 50, 50);

    // Ring 3: Black
    stroke(0, 0, 0);
    ellipse(10, -10, 50, 50, 50);

    // Ring 4: Green
    stroke(33, 176, 76);
    ellipse(40, 20, 50, 50, 50);

    // Ring 5:
    stroke(234, 30, 35);
    ellipse(70, -10, 50, 50, 50);
}

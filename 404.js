/**
 * File: /Users/ojaswupadhyay/Dropbox (GaTech)/coding/cssi.coding/day-two.js
 * Project: /day-two.js
 * Created Date: Tuesday, July 13th 2021, 2:56:23 pm
 * Author: Ojasw Upadhyay
 * ----------------------------------------------------
 * Last Modified: Tue Jul 13 2021
 * Modified By: Ojasw Upadhyay
 * ------------------------------------
 * Copyright (c) 2021 Ojasw Upadhyay
 */

// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    background, createCanvas, height, image, loadImage, width
 */

let img, imgW, imgH;

function preload() {
    img = loadImage("404.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(165, 169, 196);
    var scale = 0.5;
    imageMode(CENTER);
    image(img, 0.5 * width, 0.5 * height, scale * width, scale * img.height * width / img.width);
}

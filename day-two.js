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

let dvdImage, logoWidth, logoHeight;
let x, y, xVel, yVel;

function preload() {
    dvdImage = loadImage("dvd.png");
}

function setup() {
    createCanvas(400, 400);
    logoWidth = 80;
    logoHeight = 60;
    x = 0;
    y = 0;
    xVel = 1;
    yVel = 1;
}

function draw() {
    background(20);

    if (x > width - logoWidth || x < 0) {
        xVel = -1 * xVel;
        tint(random(100, 256), random(100, 256), random(100, 256));
    }

    if (y > height - logoHeight || y < 0) {
        yVel = -1 * yVel;
        tint(random(100, 256), random(100, 256), random(100, 256));
    }

    x += xVel;
    y += yVel;

    image(dvdImage, x, y, logoWidth, logoHeight);
}

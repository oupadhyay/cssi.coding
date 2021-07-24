// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseIsPressed, CENTER, BASELINE, textAlign
 *    mouseX, mouseY, rect, stroke, strokeWeight, width, text, textFont, loadFont, loadSound, textSize, noLoop, loop, keyCode, clear, ellipse
 *    noStroke, windowWidth, windowHeight, center, createInput, createButton, createElement, soundFormats, backdrop, key, Paddle, Ball, keyIsDown,
 *    UP_ARROW, DOWN_ARROW
 */

let ball, p1, p2, retroFont, paddle, wall, score;
let go = false;
let emojiPlay = [];
let speedX
let speedY
let XPos
let playing
let YPos
let textOffsetY = 10;
let result
let sticker
let counter
let red = 0
let green = 255
let blue = 0
let color = 0
let diameter = 20
let barWidth = 200
let buttonW = 70
let buttonH = 30
let buttonColor = 0
let backgroundColor = 0
let startW = 260
let startH = 70;
let startA = 0;
let value = 0;

function preload() {
    soundFormats('m4a');
    paddle = loadSound('/cssi.coding/assets/paddle.m4a');
    wall = loadSound('/cssi.coding/assets/wall.m4a');
    score = loadSound('/cssi.coding/assets/score.m4a');
    score.setVolume(0.5);
    paddle.setVolume(0.8);
    retroFont = loadFont('/cssi.coding/assets/ARCADECLASSIC.TTF');
}

function setup() {
    // alert('-> A,Z for Player 1 and K,M  for Player 2\n' + '-> Spacebar to start and R to reset\n' + 'Good Luck!');

    colorMode(HSB, 360, 100, 100, 255);
    createCanvas(windowWidth, windowHeight)
    ball = new Ball(width / 2, height / 2, 10, 10);
    p1 = new Paddle(20, height / 2 - 50, 10, 150, 30);
    p2 = new Paddle(width - 30, height / 2 - 50, 10, 150, 50);
}


function draw() {
    background(0, 0, 25);
    backdrop();
    movePaddles();
    p1.show();
    p2.show();

    let oob = ball.outOfBounds();
    if (oob) {
        score.play();
        // the ball stays at spawn till go = true
        go = false;
        if (oob == 'right') {
            p1.score++;
        } else {
            p2.score++
        }
    }

    if (go) ball.update();
    ball.hit(p1, p2);
    ball.show()
    if (!playing) {
        fill(25);
        rect(0, 0, windowWidth, windowHeight);
        noStroke();
        fill(0, 0, 80, 175);
        textSize(48);
        text("Press  space  to  start", windowWidth / 2, textOffsetY);
        text("Control  with  AZ  and  KM", windowWidth / 2, textOffsetY + 60);
        text("R   to   restart", windowWidth / 2, textOffsetY + 120);
    }
}

function movePaddles() {
    // 65 = 'a'
    if (keyIsDown(65)) {
        p1.move(-7000 / height);
    }

    // 90 = 'z'
    if (keyIsDown(90)) {
        p1.move(7000 / height);
    }

    // 75 = 'k'
    if (keyIsDown(75)) {
        p2.move(-7000 / height);
    }

    // 77 = 'm'
    if (keyIsDown(77)) {
        p2.move(7000 / height);
    }
}

async function keyTyped() {
    if (key == ' ') {
        playing = true;
        await sleep(1000);
        go = true;
    }

    if (key == 'r') {
        p1.score = 0;
        p2.score = 0;
        ball.resetball();
        go = false;
        p1.h = 100;
        p2.h = 100;
    }

    // for safety
    return false;
}

function sleep(millis) {
    return new Promise((resolve) => {
        setTimeout(resolve, millis);
    })
}

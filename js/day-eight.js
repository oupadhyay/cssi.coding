// var globalS = 50;
// var globalB = 55;
var firacode, color;
var drops = [];
var gravity = 0.2;
var growth;
var num = 50;
var trails = -10;

function preload() {
    firacode = loadFont("/cssi.coding/assets/Fira-Code.ttf");
}

async function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(firacode, 24);
    colorMode(HSB, 360, 100, 100);
    growth = Math.max(windowWidth / 200, windowHeight / 200);
    color = false;

    background(25);
    for (var i = 0; i < num; i++) {
        await sleep(400)
        drops.push(new Drop());
    }
}

class Drop {
    constructor () {
        this.hue = random(0, 360);
        this.x = random(width);
        this.y = -10;
        this.w = 20;
        this.h = 10;
        this.length = 10;
        this.speed = random(0, 3);
        this.endY = random(height / 2, height);
        this.falling = true;
    }

    show = function () {
        if (this.falling) {
            let st = Math.max(25, 230 - (this.h / (600 / (Math.max(width / 2, height / 2)))))
            if (color) {
                stroke(this.hue, st, 25 + st);
            } else {
                stroke(st);
            }
            strokeWeight(1.5);
            line(this.x, this.y, this.x, this.y + this.length);
        }
    };

    fall = function () {
        this.y = this.y + this.speed;
        this.speed = this.speed + gravity;
    };

    puddle = function () {
        if (this.y > this.endY) {
            this.speed = 0;
            this.length = 0;
            noFill();
            let st = Math.max(25, 230 - (this.h / (600 / (Math.max(width / 2, height / 2)))));
            if (color) {
                stroke(this.hue, st - 25, st);
            } else {
                stroke(st);
            }
            ellipse(this.x, this.y, this.w, this.h);
            this.w = this.w + growth;
            this.h = this.h + growth / 2;
            this.falling = false;
        }
    };

    reset = function () {
        if (this.h > height) {
            this.x = random(width);
            this.y = -10;
            this.length = 10;
            this.speed = 0;
            this.w = 30;
            this.h = 15;
            this.falling = true;
        }
    };
}


function draw() {
    background(25);

    for (var drop of drops) {
        drop.show();
        drop.fall();
        drop.puddle();
        drop.reset();
    }
}

function sleep(millisecondsDuration) {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondsDuration);
    })
}

function mousePressed() {
    color = !color;
    redraw();
}

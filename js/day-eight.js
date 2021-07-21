var color;
var drops = [];
var gravity = 0.2;
var growth;
var num = 50;
var trails = -10;
let arr;
let qNum = [0, 1, 2, 3, 4];

const rgbToHsl = (rgb) => {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    r = h;
    g = s;
    b = l;
    return [r, g, b];
}

const hexToRgb = hex =>
    hex.replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`,
    )
        .substring(1)
        .match(/.{2}/g)
        .map(x => parseInt(x, 16));

async function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);
    growth = Math.max(windowWidth / 200, windowHeight / 200);
    color = false;
    arr = ["#f1c6ca", "#f1ddc6", "#f1f1c6", "#c6f1cf", "#c6ddf1"].map(hex => rgbToHsl(hexToRgb(hex)));
    print(arr);

    background(25);
    for (var i = 0; i < num; i++) {
        await sleep(400)
        drops.push(new Drop());
    }
}

class Drop {
    constructor () {
        qNum = shuffle(qNum);
        this.hue = arr[qNum[0]];
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
                stroke(this.hue, 100 - (this.h / 5), 25 + (86 - (this.h / 7)));
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


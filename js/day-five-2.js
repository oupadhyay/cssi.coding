let counter = 0;
let MAX_HEIGHT = window.innerHeight;
let MAX_WIDTH = window.innerWidth;
const DENSITY = 16;
const GAP = MAX_HEIGHT / DENSITY;
const RELOAD_TIMEOUT = 3000;
const STROKE_COLOR = "#4b698a";
const TONES_1 = [[143, 188, 187], [136, 192, 208], [129, 161, 193], [94, 129, 172]];
const MONOCHROME = new Array(10).fill(0).map((_, i) => [i * 24, i * 25, i * 26]);

function setup() {
    createCanvas(windowWidth, windowHeight);
    MAX_WIDTH = windowWidth;
    MAX_HEIGHT = windowHeight;
    background(color(129, 161, 193));
    stroke(STROKE_COLOR);
    noLoop();
}

function draw() {
    background(color(129, 161, 193));
    const lines = [];
    let odd = false;
    for (let y = GAP / 2; y <= MAX_HEIGHT; y += GAP) {
        const trait = [];
        const oddFactor = !odd ? GAP / 2 : 0;
        for (let x = GAP / 4; x <= MAX_WIDTH - GAP; x += GAP) {
            trait.push({
                x: x + (Math.random() * .8 - 0.4) * GAP + oddFactor,
                y: y + (Math.random() * .8 - 0.4) * GAP
            });
        }
        lines.push(trait);
    }
    odd = true;
    for (let y = 0; y < lines.length - 1; y++) {
        const dotLine = [];
        for (let i = 0; i < lines[y].length; i++) {
            dotLine.push(!odd ? lines[y][i] : lines[y + 1][i]);
            dotLine.push(!odd ? lines[y + 1][i] : lines[y][i]);
        }
        for (let i = 0; i < dotLine.length - 2; i++) {
            drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
        }
    }
}

const drawTriangle = (pointA, pointB, pointC) => {
    let random_index = Math.floor(Math.random() * TONES_1.length);
    const [r, g, b] = TONES_1[random_index];
    fill(r, g, b);

    triangle(Math.min(pointA.x, width), Math.min(pointA.y, height), Math.min(pointB.x, width), Math.min(pointB.y, height), Math.min(pointC.x, width), Math.min(pointC.y, height));
}

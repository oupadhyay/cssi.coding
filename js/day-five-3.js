let canvasW, canvasH, textColor, firacode;

// Set colour palettes
let colPals = [
    ["#152A3B", "#0D809C", "#F5C03E", "#D63826", "#EBEBD6"],
    ["#0F4155", "#5399A1", "#8CA96B", "#CB5548", "#E7E6F5"],
    ["#E8614F", "#F3F2DB", "#79C3A7", "#668065", "#4B3331"],
    ["#DBE5EC", "#336B87", "#2A3132", "#E94D35", "#EFAC55"]
];

// Declare current palette variable
let currPal;

// Set array and index variables to switch between colour palettes
let qNum = [0, 1, 2, 3, 4];
let palIndex = 2;

// Set initial number of grids and declare grid size
let gridsNumber = 20;
let gridS;

// make sure that the font loaded before we run
function preload() {
    firacode = loadFont(
        "https://cdn.glitch.com/5d698cb7-a468-444f-86cc-99fabd48e344%2FFira-Code.ttf?v=1626475445919"
    );
}

// setup function
function setup() {
    createCanvas(windowWidth, windowHeight);
    canvasW = width;
    // create space for bottom text
    canvasH = height - 100;
    background(15);
    angleMode(DEGREES);
    noStroke();
    // prevent continuous generation
    noLoop();
}

function draw() {
    gridS = canvasW / gridsNumber;
    currPal = colPals[palIndex];
    for (let x = 0; x < canvasW; x += gridS) {
        // row
        for (let y = 0; y < canvasH; y += gridS) {
            // col
            qNum = shuffle(qNum);
            fill(currPal[qNum[0]]);
            rect(x, y, gridS, gridS);
            fill(currPal[qNum[1]]);

            // what design for each box
            switch (round(random(0.51, 9.49))) {
                case 1:
                    triangle(x, y, x + gridS, y, x, y + gridS);
                    break;
                case 2:
                    triangle(x, y, x + gridS, y, x + gridS, y + gridS);
                    break;
                case 3:
                    triangle(
                        x + gridS,
                        y + gridS,
                        x + gridS,
                        y,
                        x,
                        y + gridS
                    );
                    break;
                case 4:
                    triangle(x, y, x, y + gridS, x + gridS, y + gridS);
                    break;
                case 5:
                    arc(x + gridS / 2, y + gridS / 2, gridS, gridS, 0, 180);
                    break;
                case 6:
                    arc(x + gridS / 2, y + gridS / 2, gridS, gridS, 90, 270);
                    break;
                case 7:
                    arc(x + gridS / 2, y + gridS / 2, gridS, gridS, 180, 0);
                    break;
                case 8:
                    arc(x + gridS / 2, y + gridS / 2, gridS, gridS, 270, 90);
                    break;
                case 9:
                    ellipse(x + gridS / 2, y + gridS / 2, gridS, gridS);
                    break;
            }
        }
    }
    paper();

    // adds the text at the bottom 
    fill(color(15));
    rect(0, height - 100, width, height);
    textSize(Math.min(canvasW, canvasH));
    textColor = color(95);
    fill(textColor);
    noStroke();
    textFont(firacode, 24);
    translate(30, height - 40);
    text("COLORS: " + colPals[palIndex], 0, 0);
}

// Function that simulates paper texture
function paper() {
    for (let i = 0; i < canvasW; i += 2) {
        for (let j = 0; j < canvasW; j += 2) {
            fill(random(175, 225), 25);
            rect(i, j, 2, 2);
        }
    }
}

// Mouse click generates new patchwork with different color palette
function mouseClicked() {
    palIndex = (palIndex + 1) % 4;
    redraw();
}

// changes the number of columns based on number click
function keyPressed() {
    let keyAscii = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    let pressed = 0;
    for (let i = 0; i < keyAscii.length; i++) {
        if (keyCode == keyAscii[i]) {
            pressed = i;
        }
    }
    pressed *= 10;

    if (pressed == 0) {
        pressed += 1;
    }
    gridsNumber = pressed;
    redraw();
}

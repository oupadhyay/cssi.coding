let backCol, color1, color2, textColor, globalS, globalB;

function setup() {
    globalS = 80;
    globalB = 60;

    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);
    noStroke();

    // 0 is black and 100 is white.
    backCol = color(90);
    textColor = color(15);

    // HUE --------> 0 is red, 120 is green and 240 is blue.
    // SATURATION -> 0 is no color (grayscale), and 100 is bold.
    // BRIGHTNESS -> 0 is no light (black), and 100 is bright.
    color1 = color(0, globalS, globalB);
    color2 = color(200, globalS, globalB);
}

function draw() {
    background(backCol);
    drawCenterLine();
    if (mouseX >= width / 2) {
        darkMode();
    } else {
        lightMode();
    }


    // The red and blue circles:
    fill(color1);
    ellipse(width * 1 / 4, height / 2, 50);
    fill(color2);
    ellipse(width * 3 / 4, height / 2, 50);

    // The grey circle and the text:
    fill(textColor);
    ellipse(mouseX, mouseY, 50);
    text("Flip the switch (" + mouseX + ", " + mouseY + ")", 20, 20);
}

function drawCenterLine() {
    // This function will turn stroke on, draw the line, and then turn stroke
    // back off.
    // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
    stroke(textColor);
    line(width / 2, 0, width / 2, height);
    noStroke();
}

function darkMode() {
    backCol = color(20);
    color1 = color(200, globalS, globalB);
    color2 = color(0, globalS, globalB);
    textColor = color(95);
}

function lightMode() {
    backCol = color(95);
    color1 = color(0, globalS, globalB);
    color2 = color(200, globalS, globalB);
    textColor = color(20);
}

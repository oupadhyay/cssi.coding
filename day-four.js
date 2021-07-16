let brushHue, textColor, globalS, globalB, firacode, prevMouseX, prevMouseY, pPrevMouseY, pPrevMouseX;

function preload() {
    firacode = loadFont("Fira-Code.ttf");
}

function setup() {
    globalS = 50;
    globalB = 80;
    brushHue = 0;
    textColor = color(95);

    textFont(firacode, 24);
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);
    strokeWeight(6);
    console.log("width: " + width + " height: " + height);
    noStroke();
    background(15);
}

function draw() {
    fill(color(15));
    rect(0, 0, width, height * 0.075);
    rect(0, 0, width * 0.05, height);
    chooseColors();

    if (mouseIsPressed) {


        if (prevMouseX === undefined || prevMouseY === undefined) {
            pPrevMouseX = pmouseX;
            pPrevMouseY = pmouseY;
            prevMouseX = mouseX;
            prevMouseY = mouseY;
        } else {
            pPrevMouseX = pmouseX;
            pPrevMouseY = pmouseY;
            prevMouseX = mouseX;
            prevMouseY = mouseY;
            strokeWeight(4 / (1 + Math.pow(Math.E, -(abs(pmouseX - mouseX) + abs(pmouseY - mouseY)))));
            curve(pPrevMouseX, pPrevMouseY, prevMouseX, prevMouseY, pmouseX, pmouseY, mouseX, mouseY,);
            // line(pmouseX, pmouseY, mouseX, mouseY);
            // ellipse(mouseX, mouseY, abs(pmouseX - mouseX), abs(pmouseY - mouseY));
        }
    }

    fill(textColor);
    noStroke();
    textSize(Math.min(0.1 / 3 * width, 0.1 / 3 * height));
    translate(width * 0.015, height * 0.05);
    text("H: " + pad(brushHue, 3) + ", S: " + pad(globalS, 3) + ", B: " + pad(globalB, 3), 0, 0);
    translate(0, height * 0.6);
    rotate(PI / 2.0);
    text("X: " + pad(mouseX, 4) + "  Y: " + pad(mouseY, 4), 0, 0);
}

function chooseColors() {
    brushHue += 1;
    if (brushHue >= 360) {
        brushHue = 0;
    }
    stroke(brushHue, globalS, globalB);
    fill(brushHue, globalS, globalB);
}

function keyPressed() {
    if (keyCode === ESCAPE) {
        background(15);
    } else if (keyCode === UP_ARROW) {
        globalS += 5;
        if (globalS > 100) {
            globalS = 100;
        }
    } else if (keyCode === DOWN_ARROW) {
        globalS -= 5;
        if (globalS < 0) {
            globalS = 0;
        }
    } else if (keyCode === LEFT_ARROW) {
        globalB -= 5;
        if (globalB < 0) {
            globalB = 0;
        }
    } else if (keyCode === RIGHT_ARROW) {
        globalB += 5;
        if (globalB > 100) {
            globalB = 100;
        }
    }
    return false;
}

// function mousePressed() {
//   ellipse(random(width), random(height), 30, 30)
// }

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

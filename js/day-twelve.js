// var blocksX = 160;
// var blocksY = 80;
var blocksX = 40;
// var blocksX = 16;
var blocksY = 20;

let maxBlocks = 1000;
// var blocksY = 8;
let blockSize;
let xOffset = 0;
let yOffset = 0;

let s;
let noDieMode = true;
let pause = false;

let speedMultiplier = 1;
let hc;
let outlineLength = 3;
let previousHeadPositions = [];

function preload() {
    firacode = loadFont("/cssi.coding/assets/Fira-Code.ttf");
}

function setup() {
    window.canvas = createCanvas(windowWidth - 18, windowHeight);
    canvas.position(0, 0);
    window.canvas.style('z-index', 1);
    setBlocks();
    blockSize = min(width / blocksX, height / blocksY);
    outlineLength = blockSize / 15;
    xOffset = (width - blockSize * blocksX) / 2.0;
    yOffset = (height - blockSize * blocksY) / 2.0;

    s = new Snake();

    hc = new HamiltonianCycle(blocksX, blocksY);
    s.resetOnHamiltonian(hc.cycle);
    frameRate(30);


    // .touchStarted(onclick);


}

function setBlocks() {

    let testBlockSize = 1;
    while (true) {
        if (floor(canvas.width / testBlockSize) * floor(canvas.height / testBlockSize) < maxBlocks) {


            blockSize = testBlockSize;
            blocksX = floor(canvas.width / blockSize) - floor(canvas.width / blockSize) % 2;
            blocksY = floor(canvas.height / blockSize) - floor(canvas.height / blockSize) % 2;
            return;
        } else {
            testBlockSize++;
        }
    }


}

function windowResized() {
    resizeCanvas(windowWidth - 18, windowHeight);
    blockSize = min(width / blocksX, height / blocksY);
    outlineLength = blockSize / 15;
    xOffset = (width - blockSize * blocksX) / 2.0;
    yOffset = (height - blockSize * blocksY) / 2.0;
    onResize();
}


function draw() {
    if (!pause) {
        background(20);

        textAlign(CENTER, CENTER);
        fill(255);
        noStroke();
        textSize(100);

        fill(15);
        rect(0, 0, width, yOffset);
        rect(0, 0, xOffset, height);
        rect(width, height, -width, -yOffset);
        rect(width, height, -xOffset, -height);
        if (canvas.width > 700) {
            push();
            fill(255, 90);
            stroke(255, 80);
            noStroke();
            textSize(blockSize * 0.4);
            textAlign(LEFT, CENTER);
            textFont(firacode, 18);
            text("A PRETTY GOOD SNAKE AI", 30, canvas.height - 30);
            pop();
        }
        push();
        translate(xOffset, yOffset);

        // for(let pos of previousHeadPositions){
        //     fill(20,240);
        //     stroke(20,60);
        //     strokeWeight(1);
        //     rect(pos.x*blockSize,pos.y*blockSize,blockSize,blockSize);
        // }

        fill(0);
        s.show();
        // hc.show();
        for (let i = 0; i < speedMultiplier; i++) {
            s.update();
            // let headPos = {x:s.x,y:s.y};
            // let unique = true;
            // for(let pos of previousHeadPositions){
            //     if(pos.x ==headPos.x && pos.y ==headPos.y){
            //         unique=false;
            //         break;
            //     }
            // }
            // if(unique){
            //     previousHeadPositions.push(headPos);
            // }
        }
        pop();


    }
}


function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            pause = false;
            frameRate(30);
            break;
        case DOWN_ARROW:
            pause = false;
            frameRate(10);
            break;
        case LEFT_ARROW:
            pause = false;
            speedMultiplier /= 1.2;
            break;
        case RIGHT_ARROW:
            pause = false;
            speedMultiplier *= 1.2;
            break;
    }
    switch (key) {
        case ' ':
            speedMultiplier = 1;
            break;
        case 'p':
            pause = !pause;
            break;
        default:
            break;
    }
}

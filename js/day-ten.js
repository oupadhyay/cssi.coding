let ball, p1, p2, retroFont, paddle, wall, score;
let go = false;

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
    alert('-> A,Z for Player 1 and K,M  for Player 2\n' + '-> Spacebar to start and R to reset\n' + 'Good Luck!');

    colorMode(HSB, 360, 100, 100, 255);
    createCanvas(windowWidth, windowHeight)
    ball = new Ball(width / 2, height / 2, 10, 10);
    p1 = new Paddle(20, height / 2 - 50, 10, 100, 30);
    p2 = new Paddle(width - 30, height / 2 - 50, 10, 100, 50);
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

function keyTyped() {
    if (key == ' ') {
        go = true;
    }

    if (key == 'r') {
        p1.score = 0;
        p2.score = 0;
        ball.resetball();
        go = false;
    }

    // for safety
    return false;
}

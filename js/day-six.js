let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit, resetButton, coinValue;

function setup() {
    // Canvas & color settings
    createCanvas(400, 400);
    colorMode(HSB, 360, 100, 100);
    brushHue = 0;
    backgroundColor = 95;

    // Initialize game.
    resetGame();

    resetButton = createButton('RESET GAME');
    //resetButton.position(50, 120);
    resetButton.mousePressed(resetGame);
}


function draw() {
    background(backgroundColor);

    handleTime();
    if (!gameIsOver) {
        // ! <- negation (aka NOT) false -> true, true -> false
        handleCollision();
    }

    // Draw the coin
    ellipse(coinX, coinY, 20);

    // Draw the cursor at the mouse position
    ellipse(mouseX, mouseY, 20);

    // Add text with the time remaining: 
    text(`Your score is: ${score}`, 20, 20);
    text(`Time remaining: ${time}`, 20, 40);
    if (gameIsOver) {
        text('Game Over', 20, 60);
    }
    text(`Colliding: ${hit}`, 20, 80);
}

function handleCollision() {
    // We'll write code for what happens if your character hits a coin.
    hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
    if (hit) {
        score += coinValue;
        moveCoin();
    }
}

function handleTime() {
    // We'll write code to handle the time.
    if (time > 0) {
        time -= 1;
    } else {
        gameIsOver = true;
    }
}

function moveCoin() {
    coinX = random(width);
    coinY = random(height);
    coinValue = floor(random(5)) + 1; // 0 ~ 4.999999

}

function resetGame() {
    // Get random coordinates for the starting position of the coin (coinX, coinY)
    moveCoin();

    time = 1000;
    gameIsOver = false;
    hit = false;
    score = 0;
    coinValue = 1;
}

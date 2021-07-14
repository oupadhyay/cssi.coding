let x, y, xVel, yVel;
let dvdImage, logoWidth, logoHeight;
function preload() {
    dvdImage = loadImage("dvd.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    logoWidth = 160;
    logoHeight = 120;
    x = 0;
    y = 0;
    xVel = 5;
    yVel = 5;
}

function draw() {
    background(100);

    if (x > width - logoWidth || x < 0) {
        xVel = -1 * xVel;
        tint(random(100, 256), random(100, 256), random(100, 256));
    }

    if (y > height - logoHeight || y < 0) {
        yVel = -1 * yVel;
        tint(random(100, 256), random(100, 256), random(100, 256));
    }

    x += xVel;
    y += yVel;

    image(dvdImage, x, y, logoWidth, logoHeight);
}

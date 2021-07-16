let img, imgW, imgH;

function preload() {
    img = loadImage("/assets/404.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(165, 169, 196);
    var scale = 0.5;
    imageMode(CENTER);
    image(img, 0.5 * width, 0.5 * height, scale * width, scale * img.height * width / img.width);
}

var playing = false; // Y
var dynamic = true; // C
var showTips = false; // U

var tipsalpha = 0; // U
var rectalpha = 0; // Y
var trianglealpha = 255; // Y
var particlealpha = 100; // U

var colorR; // U
var colorB; // U
var colorG; // U

var songnumber = 0; // Y
var playlist = [ // Y
    'Song About You',
    'ive been waiting',
    'Venom',
    'Moonlight',
    'SICKO MODE'
];

var volhistory = []; // U
var particles = []; // U
var bigparticles = []; // Y

class particle { // C did entire class
    constructor() {
        this.x = random(width);
        this.y = random(height / 6, height);
        this.diameter = random(10, 30);
    }
    display() {
        ellipse(this.x, this.y, this.diameter);
    }
}

class bigparticle { // Y did entire class
    constructor() {
        this.x = random(width);
        this.y = random(height / 6, height);
        this.diameter = random(500, 2000);
    }
    display() {
        ellipse(this.x, this.y, this.diameter);
    }
}

function changeColor() { // U did entire function
    setInterval(1000);
    colorR = random(color / 2 - 200);
    colorB = random(color / 2 - 200);
    colorG = random(color / 2 - 200);
}

function preload() { // U did entire function
    font = loadFont('/cssi.coding/assets/HelveticaNeue-Regular.otf');
    song = loadSound('/cssi.coding/assets/' + playlist[songnumber] + '.mp3');
    var volume = 0.008;
    song.setVolume(volume);
}

function setup() { // U did entire function
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    frameRate(30);
    amp = new p5.Amplitude();
    for (let g = 0; g < 30; g++) {
        particles.push(new particle());
    }
    for (let g = 0; g < 5; g++) { // Y did this loop
        bigparticles.push(new bigparticle());
    }
}

function draw() { // beginning of draw()

    background(colorR, colorG, colorB); // U
    textFont(font); // U

    var trianglevalue = 255; // U
    var rectvalue = 255; // U

    if (dynamic === true && playing) { // U did entire if statement

        fill(random(50), random(50), random(50), particlealpha);
        noStroke();

        for (let h = 0; h < bigparticles.length; h++) {
            bigparticles[h].x += random(2);
            bigparticles[h].y += random(2);
            bigparticles[h].display();
            if (bigparticles[h].x >= 1.5 * width) {
                bigparticles.splice(0, 1)
                bigparticles.push(new bigparticle())
            }
        }
    }

    fill(255); // U
    noStroke(); // U
    textAlign(RIGHT); // U
    text('NOW PLAYING', 950, 50); // U
    text(playlist[songnumber], 950, 70); // U

    textAlign(CENTER) // U
    if (!playing) { // U
        text('CLICK PLAY OR SKIP', 500, 100)
    }

    noFill(); // U
    stroke(255); // U
    strokeWeight(tipsalpha); // U
    text('( SPACE )', 50, 100); // U
    text('( RIGHT )', 110, 100); // U
    text('( S TO SWITCH )', 500, 80); // U
    textAlign(RIGHT); // U
    text('NEON visualizer', 950, 980); // U
    textAlign(CENTER); // U

    noStroke(); // Y
    fill(255); // Y
    ellipse(50, 50, 50, 0); // Y
    ellipse(100, 50, 50, 0); // Y

    fill(255); // Y
    stroke(255); // Y
    strokeWeight(3); // Y
    strokeJoin(ROUND); // Y
    triangle(91, 35, 91, 65, 110, 50); // Y
    triangle(108, 35, 108, 65, 126, 50); // Y

    stroke(rectvalue, rectalpha); // Y
    fill(rectvalue, rectalpha); // Y
    rect(30, 25, 15, 50, 3); // Y
    rect(55, 25, 15, 50, 3); // Y

    stroke(trianglevalue, trianglealpha); // Y
    fill(trianglevalue, trianglealpha); // Y
    strokeJoin(ROUND); // Y
    triangle(33, 25, 33, 75, 75, 50) // Y

    stroke(100); // Y
    fill(100); // Y
    ellipse(150, 50, 20); // Y
    strokeWeight(1); // Y
    fill(255); // Y
    text('?', 150, 55); // Y

    var vol = amp.getLevel(); // C
    volhistory.push(vol * -100); // C
    color = vol * 100000; // C

    fill(255); // C
    text('DYNAMIC', 450, 50); // C
    text('BASIC', 550, 50); // C



    if (dynamic === true) { // C did entire if statement
        fill(255);
        stroke(255);
        rect(420, 35, 60, 20, 5);
        fill(0);
        strokeWeight(1);
        text('DYNAMIC', 450, 50);
    } else if (dynamic === false) { // C did entire else if statement
        fill(255);
        stroke(255);
        rect(520, 35, 60, 20, 5);
        fill(0);
        strokeWeight(1);
        text('BASIC', 550, 50);
    }

    if (dynamic === true && playing) { // C did entire if statement
        noFill();
        strokeWeight(3);
        stroke(random(color), random(color), random(color))
        translate(width / 2, height / 2);
        ellipse(0, 0, 100 + color, 100 + color)
        ellipse(0, 0, 550 + color, 550 + color)
        beginShape();
        for (var i = 0; i < 361; i++) {
            var a = map(volhistory[i], 0, 1, 100 + color, 300 + color);
            var x1 = a * cos(i);
            var y1 = a * sin(i);
            vertex(x1, y1);
        }
        endShape();

        if (volhistory.length > 362) {
            volhistory.splice(0, 1);
        }

        beginShape();
        for (var j = 362; j > 0; j = j - 1) {
            var b = -map(volhistory[j] * 1.5, 0, 1,
                350 + color * 0.75, 550 + color * 0.75);
            var x2 = b * cos(j);
            var y2 = b * sin(j);
            vertex(x2, y2);
        }
        endShape();

        if (volhistory.length < 1) {
            volhistory.splice(0, 362);
        }

        translate(-width / 2, -height / 2);
        fill(random(color), random(color), random(color), particlealpha);
        noStroke();
        for (let h = 0; h < particles.length; h++) {
            particles[h].x += random(-color / 100, color / 50);
            particles[h].y += random(-color / 100, color / 50);
            particles[h].display();
            if (particles[h].x >= width) {
                particles.splice(0, 1)
                particles.push(new particle())
            }
        }

        changeColor();
    }

    if (dynamic === false && playing) { // C did entire if statement
        ColorR = 0;
        ColorB = 0;
        ColorG = 0;

        noFill();
        strokeWeight(3);
        stroke(255);
        translate(width / 2, height / 2);
        beginShape();
        for (var I = 0; I < 361; I++) {
            var A = map(volhistory[I], 0, 1, 100 + color / 4, 300 + color / 4);
            var X1 = A * cos(I);
            var Y1 = A * sin(I);
            vertex(X1, Y1);
        }
        endShape();
        if (volhistory.length > 362) {
            volhistory.splice(0, 1);
        }
        beginShape();
        for (var J = 362; J > 0; J = J - 1) {
            var B = -map(volhistory[J] * 1.5, 0, 1, 350 + color / 4, 550 + color / 4);
            var X2 = B * cos(J);
            var Y2 = B * sin(J);
            vertex(X2, Y2);
        }
        endShape();
        if (volhistory.length < 1) {
            volhistory.splice(0, 362);
        }
    }

} // end of draw()

function mousePressed() { // Y did entire function
    let dplaybutton = dist(mouseX, mouseY, 50, 50);

    if (!playing && dplaybutton < 25) {
        trianglealpha = 0;
        rectalpha = 255;
        song.play();
        amp = new p5.Amplitude();
        playing = true;
    } else if (playing && dplaybutton < 25) {
        trianglealpha = 255;
        rectalpha = 0;
        song.pause();
        playing = false;
    }

    if (mouseX >= 420 && mouseX <= 480 && mouseY >= 35 && mouseY <= 55) {
        dynamic = true;
    } else if (mouseX >= 520 && mouseX <= 580 && mouseY >= 35 && mouseY <= 55) {
        dynamic = false;
    }

    let dskipbutton = dist(mouseX, mouseY, 108, 50);
    if (dskipbutton < 20) {
        songnumber = songnumber + 1;
        if (songnumber >= playlist.length) {
            songnumber = 0;
        }
        preload();
    }

    let dtipsbutton = dist(mouseX, mouseY, 150, 50);
    if (!showTips && dtipsbutton < 10) {
        tipsalpha = 0.5;
        showTips = true;
    } else if (showTips && dtipsbutton < 10) {
        tipsalpha = 0;
        showTips = false;
    }
}

function keyPressed() { // Y did entire function
    if (!playing && key === ' ') {
        trianglealpha = 0;
        rectalpha = 255;
        song.play();
        amp = new p5.Amplitude();
        playing = true;
    } else if (playing && key === ' ') {
        trianglealpha = 255;
        rectalpha = 0;
        song.pause();
        playing = false;
    }
    if (keyCode === RIGHT_ARROW) {
        songnumber = songnumber + 1;
        if (songnumber >= playlist.length) {
            songnumber = 0;
        }
        preload();
    }
    if (key === 's') {
        dynamic = !dynamic;
    }
}

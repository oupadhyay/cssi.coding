let paths = [];
let painting = false;
let next = 0;
let current, previous;
let firacode, textColor;
let hue = 0;
let globalS = 50;
let globalB = 80;
function preload() {
    firacode = loadFont("Fira-Code.ttf");
}

function setup() {
    textColor = color(95);
    textFont(firacode, 24);
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);
    current = createVector(0, 0);
    previous = createVector(0, 0);
    strokeWeight(6);
    noStroke();
    background(15);
}

function draw() {
    background(15);
    if (millis() > next && painting) {
        current.x = mouseX;
        current.y = mouseY;

        let force = p5.Vector.sub(current, previous);
        force.mult(0.05);
        paths[paths.length - 1].add(current, force);
        next = millis() + random(100);

        previous.x = current.x;
        previous.y = current.y;
    }

    for (let p of paths) {
        p.update();
        p.display();
    }

    fill(textColor);
    noStroke();
    textSize(Math.min(0.1 / 3 * width, 0.1 / 3 * height));
    if (paths.length > 0) {
        translate(width * 0.015, height * 0.05);
        console.log(paths[paths.length - 1].hue);
        text("H: " + pad(paths[paths.length - 1].hue, 3) + ", S: " + pad(globalS, 3) + ", B: " + pad(globalB, 3), 0, 0);
        translate(0, height * 0.6);
        rotate(PI / 2.0);
        text("X: " + pad(mouseX, 4) + "  Y: " + pad(mouseY, 4), 0, 0);
    }
}

function mousePressed() {
    next = 0;
    painting = true;
    previous.x = mouseX;
    previous.y = mouseY;
    hue += millis() / 100;
    if (hue >= 360) {
        hue = 0;
    }
    paths.push(new Path(hue));
}
function mouseReleased() {
    painting = false;
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

class Path {
    constructor (hue) {
        this.particles = [];
        this.hue = hue;
    }

    add(position, force) {
        this.particles.push(new Particle(position, force, this.hue));
    }

    update() {
        for (let p of this.particles) {
            p.update();
        }
    }

    getHue() {
        let h = 0;
        for (let p of this.particles) {
            h = p.hue;
        }
        return h;
    }

    display() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].lifespan <= 0) {
                this.particles.splice(i, 1);
            } else {
                this.particles[i].display(this.particles[i + 1]);
            }
        }

    }
}

class Particle {
    constructor (position, force, hue) {
        this.position = createVector(position.x, position.y);
        this.velocity = createVector(force.x, force.y);
        this.drag = 0.9;
        this.lifespan = 255 * 1.5;
        this.hue = hue;
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.mult(this.drag);
        this.lifespan -= 2.5;
        this.hue--;
    }

    hue() {
        return this.hue;
    }

    display(other) {
        stroke(this.hue, this.lifespan, 15 + this.lifespan);
        fill(this.hue, this.lifespan / 2, 15 + this.lifespan / 2);
        ellipse(this.position.x, this.position.y, 3, 3)

        if (other) {
            line(this.position.x, this.position.y, other.position.x, other.position.y);
        }
    }
}

function pad(num, size) {
    if (num) {
        num = num.toString();
        num = parseInt(num).toString();
        while (num.length < size) num = "0" + num;
        while (num.length > size) num = num.slice(0, 3);
    }
    return num;
}

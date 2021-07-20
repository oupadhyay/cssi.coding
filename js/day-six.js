var blob;

var blobs = [];
var zoom = 1;

function setup() {
    createCanvas(600, 600);
    blob = new Blob(0, 0, 64);
    for (var i = 0; i < 2000; i++) {
        var x = random(-3 * width, 3 * width);
        var y = random(-3 * height, 3 * height);
        blobs[i] = new smallBlob(x, y, 16);
    }
}

function draw() {
    background(0);

    translate(width / 2, height / 2);
    var newzoom = 64 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    for (var i = blobs.length - 1; i >= 0; i--) {
        blobs[i].show();
        if (blob.eats(blobs[i])) {
            blobs.splice(i, 1);
        }
    }

    blob.show();
    blob.update();

}

function Blob(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);

    this.update = function () {
        var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
        newvel.setMag(3);
        this.vel.lerp(newvel, 0.2);
        this.pos.add(this.vel);
    }

    this.eats = function (other) {
        var d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r) {
            var sum = PI * this.r * this.r + PI * other.r * other.r;
            this.r = sqrt(sum / PI);
            //this.r += other.r;
            return true;
        } else {
            return false;
        }
    }

    this.show = function () {
        fill(56, 34, 200);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}

function smallBlob(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);

    this.update = function () {
        var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
        newvel.setMag(3);
        this.vel.lerp(newvel, 0.2);
        this.pos.add(this.vel);
    }

    this.eats = function (other) {
        var d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r) {
            var sum = PI * this.r * this.r + PI * other.r * other.r;
            this.r = sqrt(sum / PI);
            //this.r += other.r;
            return true;
        } else {
            return false;
        }
    }
    var color1 = random(0, 255);
    var color2 = random(0, 255);
    var color3 = random(0, 255);
    this.show = function () {
        fill(color1, color2, color3);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }
}

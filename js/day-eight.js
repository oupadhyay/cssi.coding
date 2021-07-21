var drops = [];
var gravity = 0.2;
var growth;
var num = 20;
var trails = -10;

async function setup() {
    createCanvas(windowWidth - 1, windowHeight - 1);
    growth = Math.max(windowWidth / 200, windowHeight / 200);
    background(25);
    for (var i = 0; i < num; i++) {
        await sleep(400)
        drops.push(new Drop());
    }
}

function Drop() {
    this.x = random(width);
    this.y = -10;
    this.w = 20;
    this.h = 10;
    this.length = 10;
    this.speed = random(0, 2);
    this.endY = random(200, 400);
    this.falling = true;

    this.show = function () {
        if (this.falling) {
            stroke(230);
            line(this.x, this.y, this.x, this.y + this.length);
        }
    };

    this.fall = function () {
        this.y = this.y + this.speed;
        this.speed = this.speed + gravity;
    };

    this.puddle = function () {
        if (this.y > this.endY) {
            this.speed = 0;
            this.length = 0;
            noFill();
            let st = Math.max(25, 230 - (this.h / (600 / (Math.max(width, height)))));
            stroke(st);
            ellipse(this.x, this.y, this.w, this.h);
            this.w = this.w + growth;
            this.h = this.h + growth / 2;
            this.falling = false;
        }
    };

    this.reset = function () {
        if (this.h > height) {
            this.x = random(width);
            this.y = -10;
            this.length = 10;
            this.speed = 0;
            this.w = 30;
            this.h = 15;
            this.falling = true;
        }
    };
}


function draw() {
    background(25);

    for (var drop in drops) {
        drop.show();
        drop.fall();
        drop.puddle();
        drop.reset();
    }

    // for (var i = 0; i < drops.length; i = i + 1) {
    //     drops[i].show();
    //     drops[i].fall();
    //     drops[i].puddle();
    //     drops[i].reset();
    // }
}

function sleep(millisecondsDuration) {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondsDuration);
    })
}

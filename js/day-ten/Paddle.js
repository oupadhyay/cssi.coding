class Paddle {

    constructor (x, y, w, h, c) {
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.score = 0;
        this.color = c;
    }

    move(amt) {
        this.pos.y += amt;
        this.pos.y = constrain(this.pos.y, 10, height - 10 - this.h);
    }

    show() {
        noStroke();
        fill(this.color, 50, 100);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }


}

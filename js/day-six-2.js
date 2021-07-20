// The sprite is the character that I can move around
var sprite = {
    x: 0,
    y: 0,
    c: 'black',
    img: "Denny.png",
    diameter: 10,
    draw_sprite: function () {
        imageMode(CENTER)
        image(this.img, this.x, this.y, this.diameter * 2, this.diameter * 2);
    }
}

function preload() {
    sprite.img = loadImage("/cssi.coding/assets/Denny.png");
}

// I'm ready to create many target dots for the character to eat!
var targets = [];

// Constructor function ("cookie cutter") for target dots
function Target(x, y, c, d) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.diameter = d;
    this.teleport = function (x, y) { // they have a special ability
        this.x = x;
        this.y = y;
    }
}

// Regular setup stuff..
function setup() {
    createCanvas(400, 400);
    sprite.x = random(width);
    sprite.y = random(height);

    // Using a for loop to generate a whole array full of targets.
    for (var i = 0; i < 20; i++) {
        var randomColor = color(random(255), random(255), random(255));

        // Calling the constructor function.
        var target = new Target(random(width), random(height), randomColor, 10);
        targets.push(target);
    }
}

// This works for both sprite and targets, because they all have "c", "x", "y", and "diameter" properties.
function draw_character(name) {
    fill(name.c);
    ellipse(name.x, name.y, name.diameter, name.diameter);
}

// Using the distance function (y = square root of x squared + y squared) from math class,
// and returning true/false.
function checkCollision(target, i) {
    if (dist(target.x, target.y, sprite.x, sprite.y) < ((target.diameter / 2) + (sprite.diameter))) {
        return true;
    }
    return false; // The function only gets to this line if it didn't already return true
}

function draw() {
    background(220);

    // draw_character is used for both sprite and targets.
    sprite.draw_sprite();
    for (var i = 0; i < targets.length; i++) {
        draw_character(targets[i]);
    }

    if (keyIsDown(LEFT_ARROW)) {
        sprite.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        sprite.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
        sprite.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        sprite.y += 5;
    }

    // loop over array of target dots to check each one
    for (i = 0; i < targets.length; i++) {
        // Call the checkCollision function, which returns true or false
        if (checkCollision(targets[i], i)) {
            // Protagonist grows from eating
            sprite.diameter += 2;
            // Move the target to a new location.
            targets[i].teleport(random(width), random(height));
        }
    }

}

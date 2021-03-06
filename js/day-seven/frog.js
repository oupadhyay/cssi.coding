function Frog(x, y, size) {
  Rectangle.call(this, x, y, size, size);
  this.sprite = spritesEngine.getImage('FROG');
  this.sitting_on = null;
}

// Extend Rectangle.
Frog.prototype = Object.create(Rectangle.prototype);

// Attach this frog to the other object, taking its speed.
Frog.prototype.attach = function(other) {
  this.sitting_on = other;
}

// Update the frog. If it is attached to an object, it will move with it.
Frog.prototype.update = function() {
  if(this.sitting_on !== null) {
    this.x += this.sitting_on.speed;
  }
  this.x = constrain(this.x, 0, width - this.w);
  this.y = constrain(this.y, 0, height - this.h);
}

// Show the frog in the game window.
Frog.prototype.show = function() {
  // fill(0, 255, 0, 200);
  // rect(this.x, this.y, this.w, this.h);
  image(this.sprite, this.x, this.y, this.w, this.h)
}
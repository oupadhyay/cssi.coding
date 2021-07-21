function Obstacle(x, y, w, h, s, i) {
  Rectangle.call(this, x, y, w, h);
  this.speed = s;
  this.inverted = i;
  
  this.type = (this.inverted && this.w  === width) ? 
   'SAFE_ZONE' : (this.inverted) ?
   'LOG' : (this.w === 2 * grid_size) ?
   'TRUCK' : 'CAR';
  var left = this.speed < 0;
  var existsLeftSprite = ['TRUCK', 'CAR'];
  if (left && existsLeftSprite.includes(this.type)) {
    this.type+="L";
  }
  this.sprite = spritesEngine.getImage(this.type);
}

Obstacle.prototype = Object.create(Rectangle.prototype);

// Move this obstacle by its speed, and wrap it if off the screen.
Obstacle.prototype.update = function() {
  this.move(this.speed, 0);
  if(this.x > width + grid_size) {
    this.x = - this.w - grid_size;
  }
  if(this.x < - this.w - grid_size) {
    this.x = width + grid_size;
  }
}

// Display this obstacle.
Obstacle.prototype.show = function() {
  image(this.sprite, this.x, this.y, this.w, this.h);
}

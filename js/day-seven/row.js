function Row(y, count, speed, obs_width, spacing, offset, inverted) {
  Rectangle.call(this, 0, y, width, grid_size);
  this.obstacles = [];
  this.inverted = inverted;
  for(var i = 0; i < count; i++) {
    var x = i * spacing + offset;
    this.obstacles.push(new Obstacle(x, y, obs_width, grid_size, speed, inverted));
  }
}

// Extend Rectangle.
Row.prototype = Object.create(Rectangle.prototype);

// Shows this Row, showing all obstacles on it.
Row.prototype.show = function() {
  for(var i = 0; i < this.obstacles.length; i++) {
    this.obstacles[i].show();
  }
}

// Update all obstacles on this row.
Row.prototype.update = function() {
  for(var i = 0; i < this.obstacles.length; i++) {
    this.obstacles[i].update();
  }
}

// Handle a collision with another Rectangle, collider.
// Calculates which obstacle, if any, the collider has intersected.
Row.prototype.hits = function(collider) {
  var obstacle = null;
  for(var i = 0; i < this.obstacles.length; i++) {
    if(collider.intersects(this.obstacles[i])) {
      obstacle = this.obstacles[i];
    }
  }
  return obstacle;
}
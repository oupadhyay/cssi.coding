var frog;
var level;
var spritesEngine;

var grid_size = 50;
var nbRows = 12;

function resetGame() {
  frog = new Frog(width / 2, height - grid_size, grid_size);
}

function resetLevel() {
  resetGame();
  level = new Level(grid_size, width, nbRows);
}

function setup() {
  spritesEngine = new spritesEngine();
  width = 500;
  level = new Level(grid_size, width, nbRows);
  var canvas = createCanvas(width, level.rows.length * grid_size);
  canvas.parent('#canvas');
  resetGame();
}

function draw() {
  background(0);
  for(var i=0; i<level.backgroundRectangles.length; i++) {
    var bg = level.backgroundRectangles[i];
    fill(bg.color.r, bg.color.g, bg.color.b);
    rect(bg.x0, bg.y0, bg.x1, bg.y1);
  }

  var intersects = null;

  for(var i = 0; i < level.rows.length; i++) {
    level.rows[i].show();
    level.rows[i].update();
    if(frog.intersects(level.rows[i])) {
      intersects = level.rows[i].hits(frog);
      if((intersects !== null) ^ level.rows[i].inverted) {
        resetGame();
      }
    }
  }

  frog.attach(intersects);
  frog.update();
  frog.show();
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    frog.move(0, -grid_size);
  } else if(keyCode === DOWN_ARROW) {
    frog.move(0, grid_size);
  } else if(keyCode === LEFT_ARROW) {
    frog.move(-grid_size, 0);
  } else if(keyCode === RIGHT_ARROW) {
    frog.move(grid_size, 0);
  }
}
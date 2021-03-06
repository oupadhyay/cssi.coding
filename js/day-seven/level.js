function Level(grid_size, width, nbRows) {
  this.rows = [];
  this.nbRows = nbRows;
  this.grid_size = grid_size;
  this.width = width;
  this.backgroundRectangles = [];
  this.height = this.nbRows * grid_size;

  var roadColor = { r: 60, g: 60, b: 60 };
  var waterColor = { r: 50, g: 50, b: 220 };

  this.generateLevel = function () {
    console.log(this.nbRows)
    this.backgroundRectangles = [];
    this.rows = [];
    this.rows.push(new Row(0, 1, 0, this.width, 0, 0, true));
    var z1 = floor(random(2)) == 0 ? 'CARS' : 'LOGS';
    var z1Size = floor(random(9));
    if (z1Size == this.nbRows - 2) {
      z1Size = this.nbRows - 1;
    }
    console.log(z1 + ' : ' + z1Size);
    this.backgroundRectangles.push({ x0: 0, y0: 0, x1: width, y1: this.grid_size * z1Size, color: z1 === 'CARS' ? roadColor : waterColor });
    this.backgroundRectangles.push({ x0: 0, y0: this.grid_size * z1Size, x1: width, y1: this.height, color: z1 === 'CARS' ? waterColor : roadColor });


    for (var i = 1; i < this.nbRows - 1; i++) {
      if (i < z1Size) {
        var nbElements = 2;
        var speed = (1 + random(4)) * (random(1) > 0.5 ? -1 : 1);
        var obstacleWidth = floor(random(1, z1 === 'CARS' ? 3 : 5));
        var spacing = this.grid_size * 5;
        var offset = (floor(random(6)) + 1) * this.grid_size;

        this.rows.push(new Row(i * this.grid_size, nbElements, speed, obstacleWidth * this.grid_size, spacing, offset, z1 === 'LOGS'));
      } else if (i === z1Size && z1Size != 0 && z1Size != 1) {
        //Safe zone
        this.rows.push(new Row(i * this.grid_size, 1, 0, this.width, 0, 0, true));
      } else {
        var nbElements = 2;
        var speed = (1 + random(4)) * (random(1) > 0.5 ? -1 : 1);
        var obstacleWidth = floor(random(1, z1 === 'LOGS' ? 3 : 5));
        var spacing = this.grid_size * 5;
        var offset = (floor(random(6)) + 1) * this.grid_size;
        this.rows.push(new Row(i * this.grid_size, nbElements, speed, obstacleWidth * this.grid_size, spacing, offset, z1 === 'CARS'));
      }
    }

    this.rows.push(new Row((this.nbRows - 1) * this.grid_size, 1, 0, this.width, 0, 0, true));
    for (var i = 0; i < this.rows.length; i++) {
      console.log(i + ' :' + this.rows[i].obstacles[0].type);
    }
    console.log(this.backgroundRectangles);
  }

  this.generateLevel();
}

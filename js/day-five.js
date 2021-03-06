let counter = 0;

const hexToRgb = hex =>
    hex.replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`,
    )
        .substring(1)
        .match(/.{2}/g)
        .map(x => parseInt(x, 16));

const colors = `#708FA3
#486F88
#29526D
#123852
#032236
#FFC0AA
#D4856A
#AA5639
#803015
#551600
#FFE9AA
#D4B96A
#AA8C39
#806415
#553F00`
    .split('\n')
    .map(hex => hexToRgb(hex));

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    rectMode(CENTER);

    rotate(45);
    generate(0, 0);
    paper();
}

function draw() {
    paper();
}

// Function that simulates paper texture
function paper() {
    if (counter < 2) {
        for (let i = 0; i < width; i += 2) {
            for (let j = 0; j < width; j += 2) {
                fill(random(175, 225), 25);
                rect(i, j, 2, 2);
            }
        }
        counter += 1;
    }
}

const keyPressed = () => {
    if (keyCode === 'g') generate();
}

const generate = (x, y) => {
    translate(x, y);
    const borderColors = _.sampleSize(colors, 2);
    const cellCount = 8;
    const cellSide = 560;
    const startPoint = -(cellSide * (cellCount - 1)) / 2;
    for (let rowIndex = 0; rowIndex < cellCount; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
            x = startPoint + colIndex * cellSide;
            y = startPoint + rowIndex * cellSide;

            element(x, y, borderColors);
        }
    }
}

const element = (x, y, borderColors) => {
    const ctx = drawingContext;
    const squareSideDotsCount = 40;
    noStroke();

    const squareVertices = [];
    let startAngle = 45;
    for (let i = 0; i < 4; i += 1) {
        squareVertices.push({
            x: 400 * cos(startAngle),
            y: 400 * sin(startAngle),
        });
        startAngle += 90;
    }

    const square = [];
    for (let i = 0; i < 4; i += 1) {
        for (let j = 0; j < squareSideDotsCount; j += 1) {
            const x = lerp(
                squareVertices[i].x,
                squareVertices[(i + 1) % squareVertices.length].x,
                j / squareSideDotsCount,
            );
            const y = lerp(
                squareVertices[i].y,
                squareVertices[(i + 1) % squareVertices.length].y,
                j / squareSideDotsCount,
            );
            square.push({ x, y });
        }
    }

    push();
    translate(x, y);
    for (let i = 0; i < square.length; i += 1) {
        push();
        noStroke();
        if (i % 2 === 0) {
            fill(borderColors[0]);
        } else {
            fill(borderColors[1]);
        }
        beginShape();
        vertex(square[i].x, square[i].y);
        vertex(0, 0);
        vertex(
            square[(i + 1) % square.length].x,
            square[(i + 1) % square.length].y,
        );
        endShape(CLOSE);
        pop();
    }

    const innerRectSide = 520;
    const cellCount = 7;
    const grid = [];
    const cellSide = innerRectSide / cellCount;
    const startPoint = -(cellSide * (cellCount - 1)) / 2;
    for (let rowIndex = 0; rowIndex < cellCount; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
            grid.push({
                x: startPoint + colIndex * cellSide,
                y: startPoint + rowIndex * cellSide,
            });
        }
    }

    for (let rowIndex = 0; rowIndex < cellCount; rowIndex += 1) {
        for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
            const x = grid[rowIndex * cellCount + colIndex].x;
            const y = grid[rowIndex * cellCount + colIndex].y;
            const halfWidth = cellSide / 2;

            push();
            fill(255);
            rect(x, y, cellSide, cellSide)
            pop();

            if (rowIndex % 2 === 1 && colIndex % 2 === 1) {
                const r = random(10);

                push();
                fill(_.sample(colors));
                rect(x, y, cellSide, cellSide)
                pop();

                if (random(1) > 0.5) {
                    push();
                    fill(_.sample(colors.map(c => `rgba(${c}, 0.4)`)));
                    rect(x + r, y + r, 25, 25);
                    pop();
                }

                push();
                fill(_.sample(colors));
                rect(x, y, 25, 25);
                pop();

                push();
                fill(_.sample(colors));
                rect(x, y, 2, 2);
                pop();
            } else {
                const r = random(7);
                noStroke();
                push();
                const gradientColors = _.sampleSize(colors.map(c => `rgba(${c}, 0.2)`), 2);
                makeLinearGradient(
                    ctx,
                    x - halfWidth,
                    y - halfWidth,
                    x + halfWidth,
                    y - halfWidth,
                    [0, 1],
                    gradientColors,
                )
                triangle(
                    x - halfWidth,
                    y - halfWidth,
                    x + halfWidth,
                    y - halfWidth,
                    x + halfWidth,
                    y + halfWidth,
                );
                pop();

                push();
                fill(_.sample(colors.map(c => `rgba(${c}, 0.1)`)));
                triangle(
                    x - halfWidth,
                    y - halfWidth,
                    x - halfWidth,
                    y + halfWidth,
                    x + halfWidth,
                    y + halfWidth,
                );
                pop();


                if (random(1) > 0.6) {
                    push();
                    strokeWeight(2);
                    stroke(_.sample(colors));
                    line(x - halfWidth, y, x + halfWidth, y);
                    pop();
                }

                if (random(1) > 0.7) {
                    push();
                    strokeWeight(2);
                    stroke(_.sample(colors));
                    line(x, y - halfWidth, x, y + halfWidth);
                    pop();
                }

                if (random(1) > 0.8) {
                    push();
                    fill(_.sample(colors));
                    circle(x, y, 30);
                    pop();
                }

                if (random(1) > 0.4) {
                    push();
                    fill(_.sample(colors));
                    circle(x, y, 3);
                    pop();

                    if (random(1) > 0.3) {
                        push();
                        fill(_.sample(colors.map(c => `rgba(${c}, 0.3)`)));
                        circle(x + r, y + r, 5);
                        pop();
                    }
                }

            }
        }
    }

    pop();
}

const makeLinearGradient = (
    ctx,
    x1,
    y1,
    x2,
    y2,
    colorStops,
    gradColors,
) => {
    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    colorStops.forEach((stop, i) => gradient.addColorStop(stop, gradColors[i]));
    ctx.fillStyle = gradient;
    return gradient;
};



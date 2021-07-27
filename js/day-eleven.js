const SPACING = 50;
const MAX_JUMPS = 5;
let movementChoices;
let tripsP;
let visitedP;
let speedSlider;
let firacode;

function preload() {
    firacode = loadFont("/cssi.coding/assets/Fira-Code.ttf");
}


class VisitsTracker {
    constructor (maxJumps) {
        this.maxJumps = maxJumps;
        this.visitsArray = [];
    }

    visit(x, y) {
        const i = this.getIndex(x, y);
        let prevVisits = this.visitsArray[i];
        return this.visitsArray[i] = (prevVisits || 0) + 1;
    }

    getIndex(x, y) {
        const len = this.maxJumps * 2 + 1;
        const x2 = x + this.maxJumps;
        const y2 = y + this.maxJumps;
        return y2 * len + x2;
    }

    visits() {
        const v = [];
        for (let x = -MAX_JUMPS; x <= MAX_JUMPS; x++) {
            for (let y = -MAX_JUMPS; y <= MAX_JUMPS; y++) {
                let numVisits = this.visitsArray[this.getIndex(x, y)];
                if (numVisits) v.push([x, y, numVisits]);
            }
        }
        return v;
    }
}

const vt = new VisitsTracker(MAX_JUMPS);

function setup() {
    const SPACING = Math.min(40000 / windowWidth, 40000 / windowHeight);
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    background('lightgray');
    textFont(firacode, 14);
    const cv = createVector;
    movementChoices =
        [cv(1, 0), cv(0, 1), cv(-1, 0), cv(0, -1)];
    tripsP = createP();
    visitedP = createP();
    const startingSpeed = 1;
    speedSlider =
        createSlider(0, 30, startingSpeed).changed(() =>
            frameRate(speedSlider.value()));
    speedSlider.position(width - 0.75 * (SPACING * 0.7) - 200, height - 50);
    speedSlider.style('width', '200px');
    frameRate(startingSpeed);
}

function draw() {
    translate(width / 2, height / 2);
    background('lightgray');
    noStroke();
    fill(25);

    text(`TRIPS: ${frameCount.toLocaleString()}`, -width / 2 + SPACING * 0.7, height / 2 - 50);

    function drawNode(x, y, visitsCount, highlight) {
        let width = SPACING * 0.7;
        const visitsHueLimit = 100;
        const hue = map(min(visitsHueLimit, visitsCount),
            0, visitsHueLimit, 360 / 6, 0);
        fill(hue, highlight ? 0 : 100, 100);
        strokeWeight(3);
        ellipse(x * SPACING, y * SPACING, width, width);
    }

    function drawEdges(lp) {
        stroke('gray');
        strokeWeight(6);

        for (let i = 0; i < lp.length - 1; i++) {
            const x1 = lp[i][0] * SPACING;
            const y1 = lp[i][1] * SPACING;
            const x2 = lp[i + 1][0] * SPACING;
            const y2 = lp[i + 1][1] * SPACING;
            line(x1, y1, x2, y2)
        }
    }

    vt.visits().forEach(([x, y, visits]) =>
        drawNode(x, y, visits, false));

    const pos = createVector();
    vt.visit(pos.x, pos.y);
    const linePoints = [[pos.x, pos.y]];

    drawNode(0, 0, 0, true);
    for (let i = 0; i < MAX_JUMPS; i++) {
        pos.add(random(movementChoices));
        linePoints.push([pos.x, pos.y]);
        const visits = vt.visit(pos.x, pos.y);
        drawNode(pos.x, pos.y, visits, true);
    }

    drawEdges(linePoints);
}

var disableScroll = true;
var scrollPos = 0;
function stopScroll() {
    disableScroll = true;
    scrollPos = $(window).scrollTop();
}
function enableScroll() {
    disableScroll = false;
}
$(function () {
    $(window).bind('scroll', function () {
        if (disableScroll) $(window).scrollTop(scrollPos);
    });
    $(window).bind('touchmove', function () {
        $(window).trigger('scroll');
    });
});

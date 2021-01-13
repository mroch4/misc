var can = document.getElementById('game');
var ctx = can.getContext('2d');

// PLATFORMS

var platformImage = new Image();
platformImage.src = './assets/platform.png';

var platforms = [];
platforms[0] = new Platforma(0, 600, 100, 25);
platforms[1] = new Platforma(100, 600, 100, 25);
platforms[2] = new Platforma(200, 600, 100, 25);
platforms[3] = new Platforma(300, 600, 100, 25);
platforms[4] = new Platforma(400, 600, 100, 25);
platforms[5] = new Platforma(500, 600, 100, 25);
platforms[6] = new Platforma(600, 600, 100, 25);
platforms[7] = new Platforma(700, 600, 100, 25);
platforms[8] = new Platforma(800, 600, 100, 25);
platforms[9] = new Platforma(900, 600, 100, 25);
platforms[10] = new Platforma(1000, 600, 100, 25);

platforms[11] = new Platforma(730, 500, 100, 25);
platforms[12] = new Platforma(100, 250, 100, 25);
platforms[13] = new Platforma(240, 360, 100, 25);
platforms[14] = new Platforma(500, 430, 100, 25);
platforms[15] = new Platforma(380, 180, 100, 25);
platforms[16] = new Platforma(650, 300, 100, 25);
platforms[17] = new Platforma(670, 100, 100, 25);
platforms[18] = new Platforma(900, 390, 100, 25);
platforms[19] = new Platforma(200, 70, 100, 25);
platforms[20] = new Platforma(950, 160, 100, 25);

function Platforma(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function drawPlatforms() {
    for (var i = 0; i < platforms.length; i++) {
        ctx.drawImage(platformImage, platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}

// DOUGHNUTS

var doughnutImage = new Image();
doughnutImage.src = './assets/doughnut.png';

var doughnuts = [];
doughnuts[0] = new Doughnut(755, 450, 50, 50);
doughnuts[1] = new Doughnut(125, 200, 50, 50);
doughnuts[2] = new Doughnut(265, 310, 50, 50);
doughnuts[3] = new Doughnut(525, 380, 50, 50);
doughnuts[4] = new Doughnut(405, 130, 50, 50);
doughnuts[5] = new Doughnut(675, 250, 50, 50);
doughnuts[6] = new Doughnut(695, 50, 50, 50);
doughnuts[7] = new Doughnut(925, 340, 50, 50);
doughnuts[8] = new Doughnut(225, 20, 50, 50);
doughnuts[9] = new Doughnut(975, 110, 50, 50);

function Doughnut(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = true;
}

function drawDoughnuts() {
    for (var i = 0; i < doughnuts.length; i++) {
        if (doughnuts[i].visible == true) {
            ctx.drawImage(doughnutImage, doughnuts[i].x, doughnuts[i].y, doughnuts[i].width, doughnuts[i].height);
        }
    }
}

// OBSTACLES

var obstacles = [];
obstacles[0] = new Obstacle(775, 325, 75, 75, 5, './assets/cone.png');
obstacles[1] = new Obstacle(312.5, 525, 75, 75, 10, './assets/skull.png');

function Obstacle(x, y, width, height, points, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = true;
    this.points = points;
    this.obstacleImage = new Image();
    this.obstacleImage.src = type;
}

function drawObstacles() {
    for (var i = 0; i < obstacles.length; i++) {
        if (obstacles[i].visible == true) {
            ctx.drawImage(obstacles[i].obstacleImage, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
        }
    }
}

// CHARACTER

var charImage = new Image();
charImage.src = './assets/char.png';
var xPosition = 20;
var yPosition = 20;
var charWidth = 50;
var charHeight = 50;
var healthPoints = 15;
var jumpHeight = 200;
var counter = 0;

// GRAVITY 

var dy = 0;
function gravity() {
    if (dy >= 0) {
        dy = 3;
        for (var i = 0; i < platforms.length; i++) {
            if (
                yPosition + charHeight > platforms[i].y &&
                yPosition + 0.2 * charHeight < platforms[i].y &&
                xPosition + charWidth / 2 > platforms[i].x &&
                xPosition + charWidth / 2 < platforms[i].x + platforms[i].width) {
                dy = 0;
            }
        }
    }
    else {
        counter = counter + 3;
        if (counter >= jumpHeight) {
            dy = 0;
            counter = 0;
        }
    }
    yPosition = yPosition + dy;
}

// CHARACTER MOVES

document.addEventListener('keydown', charMove, false);

var dx = 0;
function charMove(e) {
    if (e.keyCode == 37) {
        dx = -2;
    } else if (e.keyCode == 39) {
        dx = 2;
    } else if (e.keyCode == 38 && dy == 0) {
        dy = -3;
    }
}

document.addEventListener('keyup', stop, false);

function stop(e) {
    if (e.keyCode == 37) {
        dx = 0;
    } else if (e.keyCode == 39) {
        dx = 0;
    }
}

// DOUGHNUTS COLLECTION 

function collectDoughnuts() {
    for (var i = 0; i < doughnuts.length; i++) {
        if (yPosition < doughnuts[i].y + doughnuts[i].height / 2 &&
            yPosition + charHeight > doughnuts[i].y + doughnuts[i].height / 2 &&
            xPosition < doughnuts[i].x + doughnuts[i].width / 2 &&
            xPosition + charWidth > doughnuts[i].x + doughnuts[i].width / 2) {
            doughnuts[i].visible = false;
        }
    }
}

// OBSTACLES COLLECTION 

function collectObstacles() {
    for (var i = 0; i < obstacles.length; i++) {
        if (yPosition < obstacles[i].y + obstacles[i].height / 2 &&
            yPosition + charHeight > obstacles[i].y + obstacles[i].height / 2 &&
            xPosition < obstacles[i].x + obstacles[i].width / 2 &&
            xPosition + charWidth > obstacles[i].x + obstacles[i].width / 2 &&
            obstacles[i].visible == true) {
            obstacles[i].visible = false;
            healthPoints = healthPoints - obstacles[i].points;
            if (healthPoints <= 0) {
                location.reload();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, can.width, can.height);
    drawPlatforms();
    drawDoughnuts();
    drawObstacles();
    ctx.drawImage(charImage, xPosition, yPosition, charWidth, charHeight);
    gravity();
    xPosition = xPosition + dx;
    collectDoughnuts();
    collectObstacles();
    end();
}

// function end() {
//     var ifall = false;
//     for (var i = 0; i < doughnuts[i].length; i++) {
//         if (doughnuts[i].visible == true) {
//             ifall = true;
//         }
//     }
//     if (ifall == false) {
//         ctx.clearRect(0, 0, can.width, can.height);
//         ctx.font = "80px Georgia";
//         ctx.fillText("WSZYSTKO ZJADŁEŚ", 140, 100);
//     }
// }

setInterval(draw, 10);
// SETUP

let app = new PIXI.Application({
    antialias: true,
});
let loader = PIXI.Loader.shared;
document.querySelector(".swiper-slide:nth-child(1)").prepend(app.renderer.view);

app.renderer.view.width = window.innerWidth;
app.renderer.view.height = window.innerHeight;
app.renderer.resize(window.innerWidth, window.innerHeight);
  
window.addEventListener("resize", function () {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});
document.querySelector("canvas").addEventListener("click", function(){
    circlesNumber = getRandomInt(2, 8);
    circlesRGB = [
        generateCircles(circlesNumber, circlesMaxX, circlesMaxY, circlesMinSize, circlesMaxSize),
        generateCircles(circlesNumber, circlesMaxX, circlesMaxY, circlesMinSize, circlesMaxSize),
        generateCircles(circlesNumber, circlesMaxX, circlesMaxY, circlesMinSize, circlesMaxSize)
    ];
})

const container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;
app.stage.addChild(container);


// MATH
  
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));


// GRAPHICS

const redGraphics = new PIXI.Graphics();
const greenGraphics = new PIXI.Graphics();
const blueGraphics = new PIXI.Graphics();
graphics = [redGraphics, greenGraphics, blueGraphics];

function setupGraphics(graphicsArr) {
    for (let i = 0; i < graphicsArr.length; i++) {
        graphicsArr[i].blendMode = PIXI.BLEND_MODES.SCREEN;
        container.addChild(graphicsArr[i]);
    }
}
setupGraphics(graphics);

function clearGraphics(graphicsArr) {
    for (let i = 0; i < graphicsArr.length; i++) {
        graphicsArr[i].clear();
    }
}


// SHAPES

var time = 0;

function generateCircles(number, Xsize, Ysize, minR, maxR) {
    var arr = [];
    while(arr.length < number) {
      var rCircle = new PIXI.Circle(
          getRandomInt(-Xsize/2, Xsize/2),
          getRandomInt(-Ysize/2, Ysize/2),
          getRandomInt(minR, maxR)
          )
      arr.push(rCircle);
    }
    return arr;
}

function drawCircles(circlesArr, graphicsObj, color) {
    for (let i = 0; i < circlesArr.length; i++) {
        graphicsObj
            .beginFill(color)
            .drawCircle(circlesArr[i].x, circlesArr[i].y, circlesArr[i].radius)
            .endFill();
    }
}

var circlesNumber = getRandomInt(2, 18);
var circlesMaxX = window.innerWidth/2;
var circlesMaxY = window.innerHeight/5*2;
var circlesMinSize = 10;
var circlesMaxSize = 300;

circlesRGB = [
    generateCircles(circlesNumber, circlesMaxX, circlesMaxY, circlesMinSize, circlesMaxSize),
    generateCircles(circlesNumber, circlesMaxX, circlesMaxY, circlesMinSize, circlesMaxSize),
    generateCircles(circlesNumber, circlesMaxX, circlesMaxY, circlesMinSize, circlesMaxSize)
];

function getRadiuses(circlesArrArr) {
    var arrArr = [];
    for (let i = 0; i < circlesArrArr.length; i++) {
        var arr = [];
        for (let ii = 0; ii < circlesArrArr[i].length; ii++) {
            var r = circlesArrArr[i][ii].radius;
            arr.push(r);
        }
        arrArr.push(arr);
    }
    return arrArr;
}

const radiuses = getRadiuses(circlesRGB);

function updateCirclesRGBRadiuses(t) {
    for (let i = 0; i < circlesRGB.length; i++) {
        for (let ii = 0; ii < circlesRGB[i].length; ii++) {
            var A = circlesMaxSize/3*2;
            var B = Math.PI/(range(0, Math.sqrt(window.innerWidth**2 + window.innerHeight**2), 4, .1, mouseDistanceFromMiddle));
            var C = range(circlesMinSize ,circlesMaxSize, 0, B, radiuses[i][ii]);
            var D = circlesMinSize/2;
            circlesRGB[i][ii].radius = circlesMinSize/2 + Math.abs(
                range(0, Math.sqrt(window.innerWidth**2 + window.innerHeight**2)/2-50, A, 0, mouseDistanceFromMiddle)
                * Math.sin(t/60*Math.PI+C)
                + D
                );
        }
    }
}

function getCursorOriginDistance(event) {
    var d;
    d = Math.sqrt((event.clientX)**2+(event.clientY)**2);
    return d;
}

var mouseX, mouseY, mouseDistanceFromMiddle;
document.querySelector("canvas").addEventListener('mousemove', (event) => {
	mouseX = event.clientX;
    mouseY = event.clientY;
    mouseDistanceFromMiddle = Math.floor(Math.sqrt((window.innerWidth/2 - mouseX)**2+(window.innerHeight/2 - mouseY)**2));
});


// TICKER

app.ticker.add((delta) => {
    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    
    time--;
    clearGraphics(graphics);
    updateCirclesRGBRadiuses(time, Math.floor(app.ticker.FPS));
    drawCircles(circlesRGB[0], redGraphics, 0xFF0000);
    drawCircles(circlesRGB[1], greenGraphics, 0x00FF00);
    drawCircles(circlesRGB[2], blueGraphics, 0x0000FF);
});
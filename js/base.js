// LEFT PAGE NAVIGATION

function navSelectClick(e) {
    var clickedButton = e.target;
    for (var i = 0, len = clickedButton.parentElement.children.length; i < len; i++) {
        clickedButton.parentElement.children[i].classList.remove("selected");
    }
    clickedButton.classList.add("selected");
}

// COPY TO CLIPBOARD FUNCTION

var copyInterpolationFunc = document.getElementById("copyInterpolationFuncID")

copyInterpolationFunc.addEventListener('click', function(event) {
    copyTextToClipboard(copyInterpolationFunc.childNodes[0].nodeValue);
});

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
}

// TOOLTIP FUNCTIONALITY
var tooltipElements = document.querySelectorAll(".tooltip");

for (var i = 0; i < tooltipElements.length; i++) {
    tooltipElements[i].addEventListener("mousemove", updateTooltipPos, false);
}

function updateTooltipPos(e) {
    for (var i=tooltipElements.length; i--;) {
        tooltipElements[i].querySelector(".tooltiptext").style.left = e.pageX - tooltipElements[i].querySelector(".tooltiptext").clientWidth/4  + 'px';
        tooltipElements[i].querySelector(".tooltiptext").style.top = e.pageY - 60 + 'px';
    }
}

// SOME MATH

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

// SLIDER FUNCTIONALITY

var sliderElement = document.getElementById("animLengthSliderID");
var animLengthDisplay = document.getElementById("animLengthDisplayID");

document.addEventListener("input", (event) => {
    if (sliderElement.value > 999) {
        animLengthDisplay.innerText = sliderElement.value/1000 + "s"
    } else {
        animLengthDisplay.innerText = sliderElement.value + "ms"
    }
    domTravelerElement.style.animationDuration = sliderElement.value+"ms";
})

// GO TO INSTAGRAM - LINK
function goToInstagram() {
    window.open(
        'https://www.instagram.com/vojtech_janosik/',
        '_blank'
    );
}

// ANIM CONTROL BUTTONS

function animControlAlign(e) {
    for (let i = 0; i < Object.keys(curveObj.dataVectors).length; i++) {
        curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]].x = Math.round(dispW/9*i);
        curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]].y = Math.round(dispH/2);

        SVG("#MP"+i).center(curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]].x, curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]].y);
    }

    curveObj.drawHandleLines(curveObj.dataVectors);
    curve.plot(curveObj.vectorsToString());
    domTravelerElement.style.offsetPath = "path('" + curveObj.vectorsToString() + "')";
}

function animControlToStart(e) {
    var el = document.getElementById("travelerRect");
    el.getAnimations().forEach((anim) => {
        anim.cancel();
        anim.play();
        anim.pause();
    });
    
    document.getElementById("animControlPauseSvg").classList.remove("animControlIconDisplayNone");
    document.getElementById("animControlPlaySvg").classList.add("animControlIconDisplayNone");
}

function animControlPause(e) {

    if(document.getElementById("animControlPlaySvg").classList.contains("animControlIconDisplayNone")) {
        document.getElementById("animControlPauseSvg").classList.add("animControlIconDisplayNone");
        document.getElementById("animControlPlaySvg").classList.remove("animControlIconDisplayNone");

        var el = document.getElementById("travelerRect");
        el.getAnimations().forEach((anim) => {
        anim.play();
        });
    } else {
        document.getElementById("animControlPauseSvg").classList.remove("animControlIconDisplayNone");
        document.getElementById("animControlPlaySvg").classList.add("animControlIconDisplayNone");

        var el = document.getElementById("travelerRect");
        el.getAnimations().forEach((anim) => {
        anim.pause();
        });
    }

}

// DRAW ANIMATION SVG CONTAINER

var animContainer = document.querySelector(".animationContainer");
var dispW = animContainer.clientWidth;
var dispH = animContainer.clientHeight;
var initW = dispW;
var initH = dispH;

var maxX = dispW;
var minX = 0;
var maxY = dispH;
var minY = 0;

var handleLinesSetUp = false;

addEventListener("resize", windowResize);

var draw = SVG().addTo(animContainer).size(dispW, dispH).addClass("svgElement");

function windowResize() {
    // dispW = animContainer.clientWidth;
    // dispH = animContainer.clientHeight;

    // maxX = dispW;
    // minX = 0;
    // maxY = dispH;
    // minY = 0;

    // draw.size(dispW, dispH);
    // curveObj.windowResizeUpdate();
    location.reload();
}

// ANIMATION CURVE TRAVELER
const curveObj = {
    dataVectors : {
        P1 : new Victor(Math.round(dispW/9*0), Math.round(dispH/2)),
        P1C2 : new Victor(Math.round(dispW/9*1), Math.round(dispH/2)),
        P2C1 : new Victor(Math.round(dispW/9*2), Math.round(dispH/2)),
        P2 : new Victor(Math.round(dispW/9*3), Math.round(dispH/2)),
        P2C2 : new Victor(Math.round(dispW/9*4), Math.round(dispH/2)),
        P3C1 : new Victor(Math.round(dispW/9*5), Math.round(dispH/2)),
        P3 : new Victor(Math.round(dispW/9*6), Math.round(dispH/2)),
        P3C2 : new Victor(Math.round(dispW/9*7), Math.round(dispH/2)),
        P4C1 : new Victor(Math.round(dispW/9*8), Math.round(dispH/2)),
        P4 : new Victor(Math.round(dispW/9*9), Math.round(dispH/2))
    },

    drawHandleLines(vectors) {

        if (handleLinesSetUp === false) {

            handleLinesSetUp = true;

            for (let i = 0; i < Object.keys(vectors).length; i++) {
                let pBefore = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i-1]];
                let p = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]];
                let pAfter = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i+1]];

                if (i === 1 || i === 4 || i === 7) {
                    var handleLine = handleLinesGroup.line(0, 0, 0, 0).attr({
                        x1 : p.x,
                        y1 : p.y,
                        x2 : pBefore.x,
                        y2 : pBefore.y,
                        id : i
                    });
                }

                if (i === 2 || i === 5 || i === 8) {
                    var handleLine = handleLinesGroup.line(0, 0, 0, 0).attr({
                        x1 : p.x,
                        y1 : p.y,
                        x2 : pAfter.x,
                        y2 : pAfter.y,
                        id : i
                    });
                }

                if (i === 0 || i === 3 || i === 6 || i === 9) {
                    var handleLine = handleLinesGroup.line(0, 0, 0, 0).attr({
                        id : i
                    });
                }
            }

        } else {
            for (let i = 0; i < Object.keys(vectors).length; i++) {
                let pBefore = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i-1]];
                let p = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]];
                let pAfter = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i+1]];

                if (i === 1 || i === 4 || i === 7) {
                    handleLinesGroup.get(i).attr({
                        x1 : p.x,
                        y1 : p.y,
                        x2 : pBefore.x,
                        y2 : pBefore.y
                    })
                }

                if (i === 2 || i === 5 || i === 8) {
                    handleLinesGroup.get(i).attr({
                        x1 : p.x,
                        y1 : p.y,
                        x2 : pAfter.x,
                        y2 : pAfter.y
                    })
                }
            }
        }
    },

    setupControlPoints() {
        for (let i = 0; i < Object.keys(curveObj.dataVectors).length; i++) {
            let p = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]];
            var draggableGroup = draw.group().addClass("moveabePoint").attr("id", "MP" + i);

            draggableGroup.circle(32).center(p.x, p.y).draggable().on('dragstart', e => {
                const { handler, box } = e.detail;
                handler.el.parent().addClass("draggingCP");
            }).on('dragmove', e => {
                const { handler, box } = e.detail;
                handler.el.next().center(handler.el.cx(), handler.el.cy());
                handler.el.parent().addClass("draggingCP");

                curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]].x = Math.round(handler.el.cx());
                curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]].y = Math.round(handler.el.cy());
                
                // if (i === 2 || i === 5 ) {
                //     let CP1 = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]].clone();
                //     let P = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i+1]].clone();
                //     let CP2 = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i+2]].clone();

                //     let CP1_P = CP1.clone().invert().add(P);
                //     let P_CP2 = P.clone().invert().add(CP2);
                //     let rotatedP_CP2 = P_CP2.clone().rotate(-P_CP2.angle());
                //     let newVector = P.clone().add(rotatedP_CP2.clone().rotate(CP1_P.angle()));
                    
                //     curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i+2]].copy(newVector.clone());

                //     SVG.find(".moveabePoint")[i+2].center(newVector.x, newVector.y);
                // }
                // if (i === 4 || i === 7 ) {
                //     let CP1 = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]].clone();
                //     let P = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i-1]].clone();
                //     let CP2 = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i-2]].clone();

                //     let CP1_P = CP1.clone().invert().add(P);
                //     let P_CP2 = P.clone().invert().add(CP2);
                //     let rotatedP_CP2 = P_CP2.clone().rotate(-P_CP2.angle());
                //     let newVector = P.clone().add(rotatedP_CP2.clone().rotate(CP1_P.angle()));
                    
                //     curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i-2]].copy(newVector.clone());

                //     SVG.find(".moveabePoint")[i-2].center(newVector.x, newVector.y);
                // }

                curveObj.drawHandleLines(curveObj.dataVectors);
                curve.plot(curveObj.vectorsToString());
                domTravelerElement.style.offsetPath = "path('" + curveObj.vectorsToString() + "')";
            }).on('dragend', e => {
                const { handler, box } = e.detail;

                handler.el.parent().removeClass("draggingCP");
            }).on('dragmove.namespace', e => {
                const { handler, box } = e.detail;
                e.preventDefault();
              
                let { cx, cy } = box;
              
                if (cx < minX) {
                  cx = minX;
                }
              
                if (cy < minY) {
                  cy = minY;
                }
              
                if (cx > maxX) {
                  cx = maxX;
                }
              
                if (cy > maxY) {
                    cy = maxY;
                  }
              
                handler.el.center(cx, cy);
              });

            draggableGroup.rect(8, 8).radius(2).center(p.x, p.y);
        }
    },

    dataString : "",
    vectorsToString() {
        let string = "";
        for (let i = 0; i < Object.keys(curveObj.dataVectors).length; i++) {
            let p = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]];

            if (i === 1) {
                string = string.trim();
                string = string + "C";
            }
            
            string = string + p.x + " " + p.y + " ";
        }
        string = string.trim();
        string = "M" + string;

        return string;
    },

    windowResizeUpdate() {
        for (let i = 0; i < Object.keys(curveObj.dataVectors).length; i++) {
            let p = curveObj.dataVectors[Object.keys(curveObj.dataVectors)[i]];
            p.x = Math.round(dispW / 9 * i);

            curve.siblings()[i+1].children().forEach(element => {
                element.center(p.x, p.y);
            });

            // curveObj.drawHandleLines(curveObj.dataVectors);

            curve.plot(curveObj.vectorsToString());
        }

    }
};

var curve = draw.path(curveObj.vectorsToString()).attr('stroke-linejoin', "round");
var handleLinesGroup = draw.group().addClass("handleLinesGroup").back();
curveObj.drawHandleLines(curveObj.dataVectors);
curveObj.setupControlPoints();

var traveler = draw.rect(24, 24).radius(2).center(0, 0).attr("id", "travelerRect");

var domTravelerElement = document.getElementById("travelerRect");
domTravelerElement.style.offsetPath = "path('" + curveObj.vectorsToString() + "')";

// CONVERT PATH STR TO CUBIC-BEZIER() AND BACK

function pathToCubicBezier(path) {
    coords = [...path.match(/-?\d*\.?\d+/g)]
    coords[2] /= 150;
    coords[3] = coords[3]/(-150)+1;
    coords[4] /= 150;
    coords[5] = coords[5]/(-150)+1;

    return "cubic-bezier("+coords[2].toFixed(2)+
    ", "+coords[3].toFixed(2)+
    ", "+coords[4].toFixed(2)+
    ", "+coords[5].toFixed(2)+
    ")";
}

function cubicBezierToPath(cubicBezier) {
    coords = [...cubicBezier.match(/-?\d*\.?\d+/g)]
    coords[0] *= 150;
    coords[1] *= -150;
    coords[1] += 150;
    coords[2] *= 150;
    coords[3] *= -150;
    coords[3] += 150;
    return "M0 150C"+coords[0]+" "+coords[1]+" "+coords[2]+" "+coords[3]+" 150 0"
}

// EASING FUNCTION LIBRARY

class easingFunctionClass {
    constructor(name, cssName, cubicBezierArr) {
        this.name = name;
        this.cssName = cssName;
        this.cubicBezier = "cubic-bezier("+cubicBezierArr[0].toFixed(Math.max(1, (cubicBezierArr[0].toString().split('.')[1] || []).length))+
        ", "+cubicBezierArr[1].toFixed(Math.max(1, (cubicBezierArr[1].toString().split('.')[1] || []).length))+
        ", "+cubicBezierArr[2].toFixed(Math.max(1, (cubicBezierArr[2].toString().split('.')[1] || []).length))+
        ", "+cubicBezierArr[3].toFixed(Math.max(1, (cubicBezierArr[3].toString().split('.')[1] || []).length))+")";
        this.path = cubicBezierToPath(this.cubicBezier);
    }
}

const easingFuncLib = {
    linear : new easingFunctionClass("linear","linear", [0.0, 0.0, 1.0, 1.0]),
    ease : new easingFunctionClass("ease","ease", [0.25, 0.1, 0.25, 1.0]),
    easeIn : new easingFunctionClass("easeIn","ease-in", [0.42, 0.0, 1.0, 1.0]),
    easeInOut : new easingFunctionClass("easeInOut","ease-in-out", [0.42, 0.0, 0.58, 1.0]),
    easeOut : new easingFunctionClass("easeOut","ease-out", [0.0, 0.0, 0.58, 1.0]),
    custom : new easingFunctionClass("custom","custom", [0.0, 0.0, 1.0, 1.0])
}

// console.log(easingFuncLib.ease.cubicBezier);

function listLibInDOM() {
    let containerEl = document.getElementById("easing-functions-container");
    let optionsArray = [];
    
    for (var i = 0; i < Object.keys(easingFuncLib).length; i++) {
        optionsArray[i] = document.createElement("span");
    }

    for (var i = 0; i < Object.keys(easingFuncLib).length; i++) {
        if (i===0) {
            optionsArray[i].classList.add("presetSelected");
        }
        optionsArray[i].classList.add("custom-option");
        optionsArray[i].setAttribute("data-easingfuncoption", Object.values(easingFuncLib)[i].name);
        optionsArray[i].textContent = Object.values(easingFuncLib)[i].cssName;
        containerEl.appendChild(optionsArray[i]);
    }
}
listLibInDOM();

// DROPDOWN SELECT FOR EASING PRESETS

document.getElementById('presetsSelectorID').addEventListener('click', function() {
    this.classList.toggle('open');
})

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        currentEasingFunc = easingFuncLib[this.dataset.easingfuncoption];
        presetOptionClicked();

        if (!this.classList.contains('presetSelected')) {
            this.parentNode.querySelector('.custom-option.presetSelected').classList.remove('presetSelected');
            this.classList.add('presetSelected');
            this.closest('.presetsSelector').querySelector('.select__trigger span').textContent = currentEasingFunc.cssName;
        }
    })
}

window.addEventListener('click', function(e) {
    const select = document.querySelector('.presetsSelector');
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});

// FUNCTION EASING HANDLING

var currentEasingFunc = easingFuncLib.linear;

function presetOptionClicked() {
    domTravelerElement.style.animationTimingFunction = currentEasingFunc.cssName;
    easingFuncSettings.curveStartHandlePoint.x = [...currentEasingFunc.path.match(/-?\d*\.?\d+/g)][2];
    easingFuncSettings.curveStartHandlePoint.y = [...currentEasingFunc.path.match(/-?\d*\.?\d+/g)][3];
    easingFuncSettings.curveEndHandlePoint.x = [...currentEasingFunc.path.match(/-?\d*\.?\d+/g)][4];
    easingFuncSettings.curveEndHandlePoint.y = [...currentEasingFunc.path.match(/-?\d*\.?\d+/g)][5];
    easingFuncSettings.setCurvePoints();
    easingFuncSettings.update();
    copyInterpolationFunc.childNodes[0].nodeValue = currentEasingFunc.cubicBezier;
}

// EASING FUNCTION CURVE ELEMENT
var easingFuncCurveElement = document.getElementById("easingFuncCurveElement");
var easingFuncCurveSVGContainer = SVG(easingFuncCurveElement);

const easingFuncSettings = {
    curveStartPoint : {
        x : 0,
        y : 150
    },
    curveStartHandlePoint : {
        x : 0,
        y : 150
    },
    curveEndHandlePoint : {
        x : 150,
        y : 0
    },
    curveEndPoint : {
        x : 150,
        y : 0
    },
    getPathString() {
        return "M"+easingFuncSettings.curveStartPoint.x+" "
        +easingFuncSettings.curveStartPoint.y+"C"
        +easingFuncSettings.curveStartHandlePoint.x+" "
        +easingFuncSettings.curveStartHandlePoint.y+" "
        +easingFuncSettings.curveEndHandlePoint.x+" "
        +easingFuncSettings.curveEndHandlePoint.y+" "
        +easingFuncSettings.curveEndPoint.x+" "
        +easingFuncSettings.curveEndPoint.y+" "
    },
    getPathCubicBezier() {
        return pathToCubicBezier(easingFuncSettings.getPathString());
    },
    setCurvePoints() {
        easingFuncSettings.curveStartHandlePoint.x = [...currentEasingFunc.path.match(/-?\d*\.?\d+/g)][2];
        easingFuncSettings.curveStartHandlePoint.y = [...currentEasingFunc.path.match(/-?\d*\.?\d+/g)][3];
        easingFuncSettings.curveEndHandlePoint.x = [...currentEasingFunc.path.match(/-?\d*\.?\d+/g)][4];
        easingFuncSettings.curveEndHandlePoint.y = [...currentEasingFunc.path.match(/-?\d*\.?\d+/g)][5];
    },
    setUp() {
        easingFuncHandleLine1 = easingFuncCurveSVGContainer.line(easingFuncSettings.curveStartPoint.x, easingFuncSettings.curveStartPoint.y, easingFuncSettings.curveStartHandlePoint.x, easingFuncSettings.curveStartHandlePoint.y);
        easingFuncHandleLine2 = easingFuncCurveSVGContainer.line(easingFuncSettings.curveEndPoint.x, easingFuncSettings.curveEndPoint.y, easingFuncSettings.curveEndHandlePoint.x, easingFuncSettings.curveEndHandlePoint.y);

        easingFuncCurve = easingFuncCurveSVGContainer.path(easingFuncSettings.getPathString());

        easingFuncHandle1 = easingFuncCurveSVGContainer.group().addClass("easingFuncHandle");
        easingFuncHandle1.circle(32).center(easingFuncSettings.curveStartHandlePoint.x, easingFuncSettings.curveStartHandlePoint.y);
        easingFuncHandle1.rect(8, 8).radius(2).center(easingFuncSettings.curveStartHandlePoint.x, easingFuncSettings.curveStartHandlePoint.y);
        easingFuncHandle1.draggable()
        .on('dragmove.namespace', e => {
            const { handler, box } = e.detail;

            easingFuncSettings.curveStartHandlePoint.x = Math.round(box.cx);
            easingFuncSettings.curveStartHandlePoint.y = Math.round(box.cy);
            easingFuncSettings.update();
        })
        .on('dragend', e => {
            const { handler, box } = e.detail;
            easingFuncHandle1.cx(Math.round(easingFuncHandle1.cx()));

            if (easingFuncSettings.curveStartHandlePoint.x > 150) {
                easingFuncSettings.curveStartHandlePoint.x = 150;
            }
            if (easingFuncSettings.curveStartHandlePoint.x < 0) {
                easingFuncSettings.curveStartHandlePoint.x = 0;
            }
            if (easingFuncSettings.curveStartHandlePoint.y > 150) {
                easingFuncSettings.curveStartHandlePoint.y = 150;
            }
            if (easingFuncSettings.curveStartHandlePoint.y < 0) {
                easingFuncSettings.curveStartHandlePoint.y = 0;
            }

            easingFuncSettings.update();

            copyInterpolationFunc.childNodes[0].nodeValue = easingFuncSettings.getPathCubicBezier();
            domTravelerElement.style.animationTimingFunction = easingFuncSettings.getPathCubicBezier();

            document.querySelector(".custom-option.presetSelected").classList.remove('presetSelected');
            document.getElementById("easing-functions-container").lastChild.classList.add('presetSelected');
            document.querySelector('.select__trigger span').textContent = "custom";
        })

        easingFuncHandle2 = easingFuncCurveSVGContainer.group().addClass("easingFuncHandle");
        easingFuncHandle2.circle(32).center(easingFuncSettings.curveEndHandlePoint.x, easingFuncSettings.curveEndHandlePoint.y);
        easingFuncHandle2.rect(8, 8).radius(2).center(easingFuncSettings.curveEndHandlePoint.x, easingFuncSettings.curveEndHandlePoint.y);
        easingFuncHandle2.draggable()
        .on('dragmove.namespace', e => {
            const { handler, box } = e.detail;
            e.preventDefault();

            easingFuncSettings.curveEndHandlePoint.x = Math.round(box.cx);
            easingFuncSettings.curveEndHandlePoint.y = Math.round(box.cy);
            easingFuncSettings.update();
        })
        .on('dragend', e => {
            const { handler, box } = e.detail;

            easingFuncHandle2.cx(Math.round(easingFuncHandle2.cx()));

            if (easingFuncSettings.curveEndHandlePoint.x > 150) {
                easingFuncSettings.curveEndHandlePoint.x = 150;
            }
            if (easingFuncSettings.curveEndHandlePoint.x < 0) {
                easingFuncSettings.curveEndHandlePoint.x = 0;
            }
            if (easingFuncSettings.curveEndHandlePoint.y > 150) {
                easingFuncSettings.curveEndHandlePoint.y = 150;
            }
            if (easingFuncSettings.curveEndHandlePoint.y < 0) {
                easingFuncSettings.curveEndHandlePoint.y = 0;
            }

            easingFuncSettings.update();

            console.log(easingFuncSettings.getPathString());

            copyInterpolationFunc.childNodes[0].nodeValue = easingFuncSettings.getPathCubicBezier();
            domTravelerElement.style.animationTimingFunction = easingFuncSettings.getPathCubicBezier();

            document.querySelector(".custom-option.presetSelected").classList.remove('presetSelected');
            document.getElementById("easing-functions-container").lastChild.classList.add('presetSelected');
            document.querySelector('.select__trigger span').textContent = "custom";
        })
    },
    update() {
        easingFuncHandleLine1.plot(easingFuncSettings.curveStartPoint.x, easingFuncSettings.curveStartPoint.y, easingFuncSettings.curveStartHandlePoint.x, easingFuncSettings.curveStartHandlePoint.y);
        easingFuncHandleLine2.plot(easingFuncSettings.curveEndPoint.x, easingFuncSettings.curveEndPoint.y, easingFuncSettings.curveEndHandlePoint.x, easingFuncSettings.curveEndHandlePoint.y);
        
        easingFuncCurve.plot(easingFuncSettings.getPathString());

        easingFuncHandle1.center(easingFuncSettings.curveStartHandlePoint.x, easingFuncSettings.curveStartHandlePoint.y)
        easingFuncHandle2.center(easingFuncSettings.curveEndHandlePoint.x, easingFuncSettings.curveEndHandlePoint.y)
    }
}

easingFuncSettings.setUp();
easingFuncSettings.update();
(function(){
/* constants */
var width = 400,     //viewBox width in px
    height = 300,    //viewBox height in px
    nShapes = 80,    //number of gems to draw
    timeLimit = 15,  //total time in seconds
    gameboard = document.getElementById("gameboard"), //the SVG
    timer = document.getElementById("timer"), //for time remaining
    scoreboard = document.getElementById("scoreboard"), //for click counter
    misses = document.getElementById("misses"), //container for misses
    gems = document.getElementsByClassName("clickable"),     //<0>
    score = 0, //number of pieces collected so far
    svgNS = gameboard.namespaceURI;

/* initialize */
gameboard.setAttribute("viewBox", [0,0,width,height]);
for (var i=0; i<nShapes; i++) {
    var gem = document.createElementNS(svgNS, "use");
    gem.setAttribute("class", "clickable");
    gem.setAttributeNS("http://www.w3.org/1999/xlink", 
                       "href", "#gem");
    gem.setAttribute("fill", randomColor() );
    gem.setAttribute("transform", 
            "translate(" + [Math.random()*width, Math.random()*height] + ")"
            + "rotate(" + Math.random()*360 + ")");           //<1>
    gem._transform = gem.transform.baseVal.consolidate();     //<2>
        // convert to matrix form & store a reference for easy update
    gem._velocity = {                                         //<3>
        x: 2*(0.5 - Math.random())*10, /* px per s */
        y: 2*(0.5 - Math.random())*10, /* px per s */
        a: 2*(0.5 - Math.random())*120 /* degrees per s */
    }
    gameboard.appendChild(gem);
}

var oldT, nextFrame;
if (requestAnimationFrame) {                                  //<4>
    nextFrame = requestAnimationFrame(moveGems);
    oldT = performance? performance.now() : 0;
}
function moveGems(t) {
    var delta = (t - oldT)/1000;                              //<5>
    for (var i=0, n=gems.length; i<n; i++) {                  //<6>
        var gem = gems[i];
        gem._transform.setMatrix(
            gem._transform.matrix
                .translate(gem._velocity.x*delta, gem._velocity.y*delta)
                .rotate(gem._velocity.a*delta)                //<7>
        );
        if (gem._transform.matrix.e > width)                  //<8>
            gem._velocity.x *= -1;
        if (gem._transform.matrix.f > height)
            gem._velocity.y *= -1;
    }
    oldT = t;
    nextFrame = requestAnimationFrame(moveGems);              //<9>
}

var endTime = Date.now() + timeLimit*1000;
updateTime();
var timerInterval = setInterval(updateTime, 100);
updateScore();
gameboard.addEventListener("mouseup", checkClick);

function randomColor() {
    /* returns a random color with at least 70% saturation
       and 40-80% lightness (for drawing on dark background) */
    var hue = Math.random()*360,
        sat = 70 + Math.random()*30,
        light = 40 + Math.random()*30;
    return "hsl(" + hue+"," + sat+"%," + light+"% )";
}
var last5seconds = false;
function updateTime() {
    var timeLeft = endTime - Date.now();
    if (timeLeft <= 0) {
        endGame();
        timeLeft = 0;
        timer.removeAttribute("aria-live");
    }
    if ((!last5seconds)&&(timeLeft <= 5000)) { 
        //less than 5 seconds left
        timer.setAttribute("aria-live", "polite");
        last5seconds = true;
    }
    timer.textContent = (timeLeft/1000).toFixed(1);
}
function updateScore() {
    scoreboard.textContent = score.toFixed(0);
}
function endGame() {
    clearInterval(timerInterval);
    cancelAnimationFrame(nextFrame);                       //<10>
    gameboard.removeEventListener("mouseup", checkClick);
    document.documentElement.setAttribute("class", "game-over");
}
function checkClick(event) {
    var element = event.target.correspondingUseElement
                    || event.target;
    if (element.getAttribute("class")=="clickable") {
        element.setAttribute("class", "clicked");
        score++;
        updateScore();
    }
    else {
        var point = gameboard.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        point = point.matrixTransform(
            misses.getScreenCTM().inverse() );
        var circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("class", "miss");
        circle.setAttribute("r", 4);
        circle.setAttribute("cx", point.x);
        circle.setAttribute("cy", point.y);
        misses.appendChild(circle);
    }
}
})();
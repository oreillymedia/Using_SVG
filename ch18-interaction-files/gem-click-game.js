(function(){
/* constants */                                           //<1>
var width = 400,  //viewBox width in px
    height = 300, //viewBox height in px
    nShapes = 80,  //number of confetti pieces to draw
    timeLimit = 15,    //total time in seconds
    gameboard = document.getElementById("gameboard"), //the SVG
    timer = document.getElementById("timer"), //for time remaining
    scoreboard = document.getElementById("scoreboard"), //for click counter
    score = 0, //number of pieces collected so far
    svgNS = gameboard.namespaceURI;

/* initialize */
gameboard.setAttribute("viewBox", [0,0,width,height]);
for (var i=0; i<nShapes; i++) {
    var use = document.createElementNS(svgNS, "use");
    use.setAttribute("class", "clickable");
    use.setAttributeNS("http://www.w3.org/1999/xlink", 
                       "href", "#gem");
    use.setAttribute("fill", randomColor() );
    use.setAttribute("x", Math.random()*width);
    use.setAttribute("y", Math.random()*height);
    gameboard.appendChild(use);
}
var endTime = Date.now() + timeLimit*1000;
updateTime();                                      //<5>
var timerInterval = setInterval(updateTime, 100);
updateScore();
gameboard.addEventListener("mouseup", checkClick);   //<7>

function randomColor() {
    /* returns a random color with at least 70% saturation
       and 40-80% lightness (for drawing on dark background) */
    var hue = Math.random()*360,
        sat = 70 + Math.random()*30,                       //<8>
        light = 40 + Math.random()*30;
    return "hsl(" + hue+"," + sat+"%," + light+"% )";
}
var last5seconds = false;
function updateTime() {
    var timeLeft = endTime - Date.now();
    if (timeLeft <= 0) {
        endGame();                                         //<9>
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
    gameboard.removeEventListener("mouseup", checkClick);    //<9>
    document.documentElement.setAttribute("class", "game-over");
}
function checkClick(event) {
    var element = event.target.correspondingUseElement
                    || event.target;
    if (element.getAttribute("class")=="clickable") {      //<10>
        element.setAttribute("class", "clicked");
        score++;
        updateScore();
    }
}
})();
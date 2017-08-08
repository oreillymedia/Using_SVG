(function(){
/* constants */                                    //<1>
var width = 400,  //viewBox width in px
    height = 300, //viewBox height in px
    nShapes = 80,  //number of confetti pieces to draw
    timeLimit = 15,    //total time in seconds,
    gameboard = document.getElementById("gameboard"), //the SVG
    timer = document.getElementById("timer"), //for time remaining
    scoreboard = document.getElementById("scoreboard"), //counter
    svgNS = gameboard.namespaceURI;

var score = 0; //number of pieces collected so far

/* initialize */
gameboard.setAttribute("viewBox", [0,0,width,height]);        //<2>
for (var i=0; i<nShapes; i++) {
    var circle = document.createElementNS(svgNS, "circle");   //<3>
    circle.setAttribute("class", "clickable");
    circle.setAttribute("r", 8); //fixed size
    circle.setAttribute("fill", randomColor() );              //<4>
    circle.setAttribute("cx", Math.random()*width);
    circle.setAttribute("cy", Math.random()*height);
    gameboard.appendChild(circle);
}
var endTime = Date.now() + timeLimit*1000;
updateTime();                                      //<5>
var timerInterval = setInterval(updateTime, 100);
updateScore();
gameboard.addEventListener("click", checkClick);   //<6>

function randomColor() {
    /* returns a random color with at least 50% saturation
       and 50-80% lightness (for drawing on dark background) */
    var hue = Math.random()*360,
        sat = 50 + Math.random()*50,               //<7>
        light = 50 + Math.random()*30;
    return "hsl(" + hue+"," + sat+"%," + light+"% )";
}
function updateTime() {
    var timeLeft = endTime - Date.now();
    if (timeLeft <= 0) {
        endGame();                                 //<8>
        timeLeft = 0;
    }
    timer.textContent = (timeLeft/1000).toFixed(1);
}
function updateScore() {
    scoreboard.textContent = score.toFixed(0);
}
function endGame() {
    clearInterval(timerInterval);
    gameboard.removeEventListener("click", checkClick);    //<9>
    document.documentElement.setAttribute("class", "game-over");
}
function checkClick(event) {
    var element = event.target;
    if (element.getAttribute("class")=="clickable") {      //<10>
        element.setAttribute("class", "clicked");
        score++;
        updateScore();
    }
}
})();
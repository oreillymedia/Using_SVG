window.addEventListener("load", function(){                  //<1>
    var doc = document;
    var svg = doc.getElementById("preserve-svg");            //<2>

    var preserve = doc.getElementById("preserve");
    var xAlign = doc.getElementById("x-align");
    var yAlign = doc.getElementById("y-align");

    doc.getElementById("preserve-options")
       .addEventListener("change", update);                  //<3>

    function update(event) {                                 //<4>
        var p, string;
        p = preserve.value;
        if (p == "none") {
            xAlign.disabled = yAlign.disabled = true;        //<5>
            string = p;
        }
        else {
            xAlign.disabled = yAlign.disabled = false;
            string = xAlign.value + yAlign.value + " " + p;  //<6>
        }
        svg.setAttribute("preserveAspectRatio", string);
    }

    update();                                                //<7>
});
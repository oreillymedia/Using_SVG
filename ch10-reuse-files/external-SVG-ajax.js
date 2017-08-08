window.addEventListener("load", function() {                 //<1>
    var svgNS = "http://www.w3.org/2000/svg",
        xlinkNS = "http://www.w3.org/1999/xlink";
    
    var svg = document.getElementsByTagName("svg")[0];       //<2>
    
    var extUse = document.querySelectorAll(
                    "use:not([*|href^='#'])"                 //<3>
    );
    var extFiles = {};                                       //<4>
    for (var i=0, n=extUse.length; i<n; i++) {
        var use = extUse[i];
        var ref = use.getAttributeNS(xlinkNS,"href")
                      .split("#");                           //<5>
        
        var file = ref[0];
        if (!extFiles[file]){
            extFiles[file] = [];
        }
        extFiles[file].push({element:use, target:ref[1] });  //<6>
    }
    
    for (var fileURL in extFiles) { 
        var request = new XMLHttpRequest();
        request.addEventListener("load",
            createResponseHandler(request, 
                    extFiles[fileURL])                       //<7>
        );
        request.overrideMimeType("image/svg+xml");
        request.open("GET", fileURL);
        request.send();
    }
    
    function createResponseHandler(request, elementList) {
        return function() {                                  //<8>
            var file = request.responseXML;
            
            var defs = document.createElementNS(svgNS, "defs");
            defs.appendChild(file.documentElement);
            svg.appendChild(defs);                    //<9>
            
            for (var i=0, n=elementList.length; i<n; i++) {
                var o = elementList[i];
                o.element.setAttributeNS(xlinkNS, "href",
                        "#" + o.target );                    //<10>
            }
        }
    }
});
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
    
    var fileIndex = 0;
    for (var fileURL in extFiles) {        
        fileIndex++;
        var request = new XMLHttpRequest();
        request.addEventListener("load",
            createResponseHandler(request, 
                    extFiles[fileURL], fileIndex)            //<7>
        );
        request.overrideMimeType("image/svg+xml");
        request.open("GET", fileURL);
        request.send();
    }
    
    function createResponseHandler(request, 
                                   elementList,
                                   index) {
        return function() {                                  //<8>
            var file = request.responseXML;
            
            var el = file.querySelectorAll("[id]");            
            for (var i=0, n=el.length; i<n; i++) {           //<9>
                var id = el[i].getAttribute("id"),
                    newID = prefixID(id, index);
                el[i].setAttribute("id", newID );
                
                var reuse = file.querySelectorAll(
                                    "[*|href='#"+id+"']");
                for (var j=0, m=reuse.length; j<m; j++) {
                    reuse[j].setAttributeNS(
                        xlinkNS, "href", "#"+newID);
                }
                
                var styleref = file.querySelectorAll(
                                    "[style*='url(#"+id+")']");
                for (var j=0, m=styleref.length; j<m; j++) {
                    var style = reuse[j].getAttribute("style");
                    style = style.replace("(#"+id+")", 
                                         "(#"+newID+")" );
                    reuse[j].setAttribute("style", style);
                }
            }
            
            var defs = document.createElementNS(svgNS, "defs");
            defs.insertBefore(file.documentElement, null);
            svg.insertBefore(defs, null);                    //<10>
            
            for (var i=0, n=elementList.length; i<n; i++) {
                var o = elementList[i];
                o.element.setAttributeNS(xlinkNS, "href",
                        "#" + prefixID(o.target, index) );   //<11>
            }
        }
    }
    function prefixID(id, index){
        return "file" + index + "-" + id;                    //<12>
    }
});
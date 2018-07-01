$(document).ready(function() {
    function newScreenObject(top, id) {
        var obj = {};
        obj.domObject = $("#screen" + id);
        obj.top = top;

        obj.domObject.css("top", top + "vh");
        return obj;
    }

    var screenTab = new Array();
    var nbrScreen = 4;
    var currentScreenId = 1;

    var indexInterval;

    var introOver = true;

    for(var id = 0; id < nbrScreen; id++) {
        var top = id * 100;
        screenTab.push(newScreenObject(top, id + 1));
    }

    setTimeout(function() {
        screenDown();
    }, 10000);

    setTimeout(function() {
        screenDown();
        introOver = true;
    }, 22000);

    setTimeout(function() {
        screenDown();
    }, 38000);

    setTimeout(function() {
        console.log("intro over");
        introOver = true;
    }, 48000);

    function screenUp() {
        if(currentScreenId > 1) {
            for(var i = 0; i < screenTab.length; i++) {
                screenTab[i].top += 100;
                screenTab[i].domObject.css("top", screenTab[i].top + "vh");
            }
            currentScreenId--;
            return 0;
        }
        return 1;
    }

    function screenDown() {
        if(currentScreenId < nbrScreen) {
            for(var i = 0; i < screenTab.length; i++) {
                screenTab[i].top -= 100;
                screenTab[i].domObject.css("top", screenTab[i].top + "vh");
            }
            currentScreenId++;
            return 0;
        }
        return 1;
    }

    $('body').bind('mousewheel', function(e){
        if(introOver) {
            if(e.originalEvent.wheelDelta /120 > 0) {
                screenUp();
            }
            else{
                screenDown();
            }
        }  
    });
});
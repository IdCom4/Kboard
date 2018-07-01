$(document).ready(function() {
    var logo = $("#logo-wrapper");
    var stickLeft = $("#stick-left");
    var stickRight = $("#stick-right");
    var firstPitch = $("#firstPitch");
    var firstPitchP = $("#firstPitch p");
    var cursor = $("#firstPitch .cursor");

    var screen1Interval;
    var wordIndex = 0;
    var letterIndex = 0;
    var cursorBlink = 0;

    var newSpan;

    var firstPitchContent = [
        "FROM THE ",
        "IDEA TO THE PROJECT ",
        "IN POWERFULL WAY."
    ];

    setTimeout(function() {
        logo.css("top", "50px");
    }, 1000);

    setTimeout(function() {
        stickLeft.css("left", "0");
        stickRight.css("right", "0");
    }, 2000);

    setTimeout(function() {
        firstPitch.css("opacity", "1");
    }, 3000);

    setTimeout(startScreen1Interval, 3500);

    function startScreen1Interval() {
        screen1Interval = setInterval(function() {
            if(wordIndex < firstPitchContent.length) {
                if(letterIndex == 0) {
                    newSpan = '<span id="span-'+ wordIndex +'"'+ ((wordIndex % 2 == 0)? '' : 'class="important"') +'></span>';
                    $(newSpan).insertBefore(cursor);
                }
                var currentSpan = $("#firstPitch p #span-" + wordIndex);
                currentSpan.text(currentSpan.text() + firstPitchContent[wordIndex][letterIndex]);
                letterIndex++;
                if(letterIndex >= firstPitchContent[wordIndex].length) {
                    wordIndex++;
                    letterIndex = 0;
                }
                if(wordIndex >= firstPitchContent.length) {
                    setTimeout(function() {
                        $("#firstPitch .important").css("color", "white");
                    }, 500);
                }
            } else {
                if(cursorBlink % 8 == 0) {
                    cursor.css("opacity", "1");
                }
                if(cursorBlink % 8 == 4) {
                    cursor.css("opacity", "0");
                }
                cursorBlink++;
            }
        }, 100);
    }
});
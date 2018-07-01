$(document).ready(function() {
    var secondPitch = $("#secondPitch");
    var cursor = $("#secondPitch .cursor");

    var screen2Interval;
    var wordIndex = 0;
    var letterIndex = 0;
    var cursorBlink = 0;

    var newSpan;

    var turnOver;
    var writing = true;

    var seconds = 0;
    var lastTime = 0;

    var secondPitchContent = [
        "WE ARE A TEAM OF CODERS.",
        "WE MAKE YOUR "
    ];

    var turnOverTab = [
        "PROJECT.",
        "START-UP.",
        "DREAM."
    ];

    setTimeout(function() {
        /*secondPitch.css("opacity", "1");*/
        startScreen2Interval();
    }, 11000);


    function startScreen2Interval() {
        screen2Interval = setInterval(function() {
            if(wordIndex < secondPitchContent.length) {
                if(letterIndex == 0) {
                    newSpan = '<span id="span-'+ wordIndex +'"></span>';
                    $(newSpan).insertBefore(cursor);
                }
                var currentSpan = $("#secondPitch p #span-" + wordIndex);
                currentSpan.text(currentSpan.text() + secondPitchContent[wordIndex][letterIndex]);
                letterIndex++;
                if(letterIndex >= secondPitchContent[wordIndex].length) {
                    wordIndex++;
                    if(wordIndex == 1) {
                        $("<br/>").insertBefore(cursor);
                    }
                    letterIndex = 0;
                }
            } else {
                wordIndex = 0;
                letterIndex = 0;
                $('<span id="turnOver"></span>').insertBefore(cursor);
                clearInterval(screen2Interval);
                startScreen2TurnOverInterval();
            }
        }, 100);
    }

    function startScreen2TurnOverInterval() {
        turnOver = $("#secondPitch #turnOver");
        setInterval(function() {
            seconds++;
        }, 1000);

        screen2Interval = setInterval(function() {
            if(writing) {
                if(letterIndex < turnOverTab[wordIndex].length) {
                    turnOver.text(turnOver.text() + turnOverTab[wordIndex][letterIndex]);
                    letterIndex++;
                    lastTime = seconds;
                }
                else {
                    if(cursorBlink % 8 == 0) {
                    cursor.css("opacity", "0");
                    }
                    if(cursorBlink % 8 == 4) {
                        cursor.css("opacity", "1");
                    }
                    if((wordIndex < turnOverTab.length && seconds - lastTime >= 2) || (wordIndex >= turnOverTab.length && seconds - lastTime >= 3)) {
                        writing = false;
                        letterIndex--;
                        cursor.css("opacity", "1");
                    }
                }
            }
            else {
                if(letterIndex >= 0) {
                    var text = turnOver.text();
                    text = text.slice(0, text.length - 1);
                    turnOver.text(text);
                    letterIndex--;
                }
                else {
                    letterIndex = 0;
                    writing = true;
                    wordIndex = (wordIndex < turnOverTab.length - 1) ? wordIndex + 1 : 0;
                }
            }
            cursorBlink++;
        }, 100);
    }
});
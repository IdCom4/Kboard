$(document).ready(function() {
	var fourthPitch = $("#fourthPitch");
    var cursor = $("#fourthPitch .cursor");

    var screen4Interval;
    var wordIndex = 0;
    var letterIndex = 0;
    var cursorBlink = 0;

    var newSpan;

    var turnOver;
    var writing = true;

    var seconds = 0;
    var lastTime = 0;

    var fourthPitchContent = [
        "CONTACT US AT  "
    ];

    var turnOverTab = [
        "06 05 04 03 02.",
        "contact-us@gmail.com."
    ];

    setTimeout(function() {
        /*fourthPitch.css("opacity", "1");*/
        startScreen4Interval();
    }, 39000);


    function startScreen4Interval() {
        screen4Interval = setInterval(function() {
            if(wordIndex < fourthPitchContent.length) {
                if(letterIndex == 0) {
                    newSpan = '<span id="span-'+ wordIndex +'"></span>';
                    $(newSpan).insertBefore(cursor);
                }
                var currentSpan = $("#fourthPitch p #span-" + wordIndex);
                currentSpan.text(currentSpan.text() + fourthPitchContent[wordIndex][letterIndex]);
                letterIndex++;
                if(letterIndex >= fourthPitchContent[wordIndex].length) {
                    wordIndex++;
                    letterIndex = 0;
                }
            } else {
                wordIndex = 0;
                letterIndex = 0;
                $('<span id="turnOver"></span>').insertBefore(cursor);
                clearInterval(screen4Interval);
                startScreen4TurnOverInterval();
            }
        }, 100);
    }

    function startScreen4TurnOverInterval() {
        turnOver = $("#fourthPitch #turnOver");
        setInterval(function() {
            seconds++;
        }, 1000);

        screen4Interval = setInterval(function() {
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
                    if(seconds - lastTime >= 5) {
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
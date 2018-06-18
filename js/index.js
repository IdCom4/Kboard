$(document).ready(function() {
    var logo = $("#logo-wrapper");
    var stickLeft = $("#stick-left");
    var stickRight = $("#stick-right");
    var weAre = $("#weAre");
    var andWe = $("#andWe");
    var cursor = $("#cursor");
    var wordsSpan = $("#wordsSpan");

    var wordsTab = [
        "CREATE",
        "DEVELOP",
        "IMAGINE",
    ];

    var wordsIndex = 0;
    var lettersIndex = 0;

    var intervalAlgo;
    var intervalSeconds;
    var seconds = 0;
    var lastTime = 0;

    var writing = true;

    var intervalCount = 0;

    setTimeout(function() {
        logo.css("top", "100px");
    }, 1000);

    setTimeout(function() {
        stickLeft.css("left", "0");
        stickRight.css("right", "0");
    }, 4000);

    setTimeout(function() {
        stickLeft.css("left", "100vw");
        stickRight.css("right", "100vw");
    }, 7000);

    setTimeout(function() {
        weAre.css("opacity", "1");
    }, 9000);

    setTimeout(function() {
        andWe.css("opacity", "1");
    }, 11000);

    setTimeout(startInterval, 12000);

    function startInterval() {
        intervalSeconds = setInterval(function() {
            seconds++;
        }, 1000);
        intervalAlgo = setInterval(function() {
            if(writing) {
                if(lettersIndex < wordsTab[wordsIndex].length) {
                    wordsSpan.text(wordsSpan.text() + wordsTab[wordsIndex][lettersIndex]);
                    lettersIndex++;
                    lastTime = seconds;
                }
                else {
                    if(intervalCount % 2 == 1) {
                        cursor.css("opacity", "1");
                    }
                    else {
                        cursor.css("opacity", "0");
                    }
                    if(seconds - lastTime >= 2) {
                        writing = false;
                        lettersIndex--;
                        cursor.css("opacity", "1");
                    }
                }
            }
            else {
                if(lettersIndex >= 0) {
                    var text = wordsSpan.text();
                    text = text.slice(0, text.length - 1);
                    wordsSpan.text(text);
                    lettersIndex--;
                }
                else {
                    lettersIndex = 0;
                    writing = true;
                    wordsIndex = (wordsIndex < wordsTab.length - 1) ? wordsIndex + 1 : 0;
                }
            }
            intervalCount++;
        }, 500);
    }
});
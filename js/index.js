$(document).ready(function() {
    var logo = $("#logo-wrapper");
    var stickLeft = $("#stick-left");
    var stickRight = $("#stick-right");
    var weAre = $("#weAre");
    var andWe = $("#andWe");
    var cursor = $("#cursor");
    var wordsSpan = $("#wordsSpan");

    var wordsTab = [
        "MentalDeMetal",
        "MentalDePapier",
        "MentalFebrile",
        "MentalJoyeux",
        "MentalTropGénial"
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
    }, 3000);

    setTimeout(function() {
        stickLeft.css("left", "100vw");
        stickRight.css("right", "100vw");
    }, 5000);

    setTimeout(function() {
        weAre.css("opacity", "1");
    }, 7000);

    setTimeout(function() {
        andWe.css("opacity", "1");
    }, 9000);

    setTimeout(startInterval, 10000);

    function startInterval() {
        intervalSeconds = setInterval(function() {
            seconds++;
        }, 1000);
        intervalAlgo = setInterval(function() {
            if(writing) {
                if(lettersIndex < wordsTab[wordsIndex].length) {
                    wordsSpan.css("transition", "0s");
                    wordsSpan.css("color", "white");
                    wordsSpan.text(wordsSpan.text() + wordsTab[wordsIndex][lettersIndex]);
                    lettersIndex++;
                    lastTime = seconds;
                }
                else {
                    if(wordsIndex == wordsTab.length - 1) {
                        wordsSpan.css("transition", "1s");
                        wordsSpan.css("color", "rgb(196, 57, 117)");
                    }
                    if(intervalCount % 2 == 1) {
                        cursor.css("opacity", "1");
                    }
                    else {
                        cursor.css("opacity", "0");
                    }
                    if((wordsIndex != wordsTab.length - 1 && seconds - lastTime >= 3) || (wordsIndex == wordsTab.length - 1 && seconds - lastTime >= 5)) {
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
        }, 300);
    }
});
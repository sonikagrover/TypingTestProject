const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const reset = document.querySelector("#reset");
const timer = document.querySelector(".timer");

var theTimer = [0,0,0,0];
var interval;
var timerRunning = false;


//Start the timer
function startTimer() {
 let textEnteredLength = testArea.value.length;
    if(textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}


// Run a timer
function runTimer(){
    let currentTime = leadingZero(theTimer[0]) + ":" + leadingZero(theTimer[1]) + ":"+ leadingZero(theTimer[2]);
    timer.innerHTML = currentTime;
    theTimer[3]++;

    theTimer[0] = Math.floor((theTimer[3]/100/60));
    theTimer[1]= Math.floor((theTimer[3]/100) -(theTimer[0] * 60));
    theTimer[2] = Math.floor((theTimer[3] - (theTimer[1] * 100) - (theTimer[0]* 6000)));

}

// Add Leading zero to numbers 9 or below for timer
function leadingZero(time){
    if(time <= 9){
        time = "0"+ time;
    }
    return time;
}
//Reset function
function startOver(){
    console.log("Reset button has been pressed!");
    clearInterval(interval);
    interval = null;
    theTimer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    timer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";

}

//Match the text entered with the provided text

function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "lightBlue";
        } else {
            testWrapper.style.borderColor = "red";
        }
    }
}
//Event listeners for thekeyboard input and the reset

testArea.addEventListener("keypress",startTimer,false);
testArea.addEventListener("keyup",spellCheck, false);
reset.addEventListener("click", startOver, false);
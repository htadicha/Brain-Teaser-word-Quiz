// Credit: adding eventlistener from the training
document.addEventListener("DOMContentLoaded", function () {
    let wordText = document.getElementsByClassName("word")[0],
        // Credit: query selector and getElementBy.. taken from Stackoverflow and treehouse sites
        // https://teamtreehouse.com/community/getelementsbyclassname-versus-queryselector
        hintText = document.querySelector(".helper span"),
        timeText = document.querySelector(".seconds b"),
        inputField = document.getElementsByTagName("input")[0],
        refreshBtn = document.getElementsByClassName("refresh")[0],
        checkBtn = document.getElementsByClassName("check")[0];
    let correctWord, timer;
    let initTimer = MaxTime => {
       clearInterval(timer);
       timer = setInterval(() => {
        if(MaxTime > 0){
            MaxTime--;
            timeText.innerText = MaxTime;
        } else {
        clearInterval(timer);
        alert (`Time off! ${correctWord.toUppercase()} was the correct word`);
        initGame();
     }
       }, 1000); 
    };
})
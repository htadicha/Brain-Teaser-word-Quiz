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
    // Credit: timer function taken and edited from 
    // https://teamtreehouse.com/community/how-do-i-set-up-setinterval-clearinterval-settimeout-and-cleartimeout-properly-alsodo-i-need-to-use-all-4
    let correctWord, timer;
    let initTimer = MaxTime => {
        clearInterval(timer);
        timer = setInterval(() => {
            if (MaxTime > 0) {
                MaxTime--;
                timeText.innerText = MaxTime;
            } else {
                clearInterval(timer);
                alert(`Time off! ${correctWord.toUppercase()} was the correct word`);
                initGame();
            }
        }, 1000);
    };

    // game function taken and edited from the training materials
    let initGame = () => {
        initTimer(30);
        let randomObj = wordslist[Math.floor(math.random() * wordslist.length)];
        let wordArray = randomObj.word.split("");
        for (let i = wordArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
    }
})
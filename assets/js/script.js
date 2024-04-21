// Credit: adding eventlistener from the training
document.addEventListener("DOMContentLoaded", function() {
    let wordText = document.getElementsByClassName("word")[0],
        // Credit: query selector and getElementBy.. taken from Stackoverflow and treehouse sites
        // https://teamtreehouse.com/community/getelementsbyclassname-versus-queryselector
        hintText = document.getElementsByClassName("helper")[0].getElementsByTagName("span")[0],
        timeText = document.getElementsByClassName("seconds")[0].getElementsByTagName("b")[0],
        inputField = document.getElementsByTagName("input")[0],
        refreshBtn = document.getElementsByClassName("refresh")[0],
        checkBtn = document.getElementsByClassName("check")[0];
    // Credit: timer function taken and edited from 
    // https://teamtreehouse.com/community/how-do-i-set-up-setinterval-clearinterval-settimeout-and-cleartimeout-properly-alsodo-i-need-to-use-all-4
    let correctWord, timer;
    let initTimer = maxTime => {
        clearInterval(timer);
        timer = setInterval(() => {
            if (maxTimeaxTime > 0) {
                maxTime--;
                timeText.innerText = MaxTime;
            } else {
                clearInterval(timer);
                alert(`Time off! ${correctWord.toUppercase()} was the correct word`);
                initGame();
            }
        }, 1000);
    };
    // game function taken and edited from the training materials
    // picked from Coding Nepal for  Fisher-Yates algorithm.
    let initGame = () => {
        initTimer(30);
        let randomObj = words[Math.floor(Math.random() * words.length)];
        let wordArray = randomObj.word.split("");
        for (let i = wordArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
        wordText.innerText = wordArray.join("");
        hintText.innerText = randomObj.hint;
        correctWord = randomObj.word.toLowerCase();
        inputField.value = "";
        inputField.setAttribute("maxlength", correctWord.length);
    };
    let checkWord = () => {
        let userWord = inputField.value.trim().toLowerCase();
        if (!userWord) {
            alert("Please enter the word to check!");
            return;
        }
        if (userWord !== correctWord) {
            alert(`Oops! ${userWord} is not the correct word`);
        } else {
            alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
        }
        initGame();
    };

    refreshBtn.addEventListener("click", initGame);
    checkBtn.addEventListener("click", checkWord);

    // Initialize game on page load
    initGame();
});




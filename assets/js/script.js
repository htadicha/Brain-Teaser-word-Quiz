document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    let wordText = document.querySelector(".word"),
        hintText = document.querySelector(".helper span"),
        timeText = document.querySelector(".seconds b"),
        inputField = document.querySelector("input"),
        refreshBtn = document.querySelector(".refresh"),
        checkBtn = document.querySelector(".check"),
        counterText = document.querySelector(".counter span:first-child"),
        totalWordsText = document.querySelector(".total-words"),
        feedbackText = document.querySelector(".feedback");

    // Game Variables
    let correctWord, timer;
    let counter = 0;
    let trialCount = 0;
    let usedWords = [];
    const maxTrials = 12; // Number of words per round

    // Initialize Game
    totalWordsText.textContent = maxTrials; // Display total words per trial
    counterText.textContent = counter; // Display correct count

    // Show Feedback Function
    const showFeedback = (message, isCorrect = null) => {
        feedbackText.textContent = message;
        feedbackText.classList.remove("correct", "wrong", "neutral");

        if (isCorrect === true) {
            feedbackText.classList.add("correct");
        } else if (isCorrect === false) {
            feedbackText.classList.add("wrong");
        } else {
            feedbackText.classList.add("neutral");
        }

        feedbackText.style.display = "block";

        // Hide feedback after 3 seconds for neutral messages
        if (isCorrect === false || isCorrect === null) {
            setTimeout(() => {
                feedbackText.style.display = "none";
            }, 3000);
        }
    };

    // Initialize Game Function
    const initGame = () => {
        if (trialCount >= maxTrials) {
            showFinalScore();
            return;
        }

        // Select a random word that hasn't been used yet
        let randomObj;
        do {
            randomObj = words[Math.floor(Math.random() * words.length)];
        } while (usedWords.includes(randomObj.word));

        usedWords.push(randomObj.word);
        trialCount++;

        // Scramble the word
        let wordArray = randomObj.word.split("");
        for (let i = wordArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }

        // Update DOM
        wordText.innerText = wordArray.join("");
        hintText.innerText = randomObj.hint;
        correctWord = randomObj.word.toLowerCase();
        inputField.value = "";
        inputField.setAttribute("maxlength", correctWord.length);
        initTimer(30); // Start timer
    };

    // Initialize Timer Function
    const initTimer = (maxTime) => {
        clearInterval(timer);
        timeText.innerText = maxTime;

        timer = setInterval(() => {
            if (maxTime > 0) {
                maxTime--;
                timeText.innerText = maxTime;
            } else {
                clearInterval(timer);

                // Ask the user if they want to continue
                let userChoice = confirm("Time's up! Do you want to continue to the next word?");
                if (userChoice) {
                    // Record it as a wrong answer and move to the next word
                    showFeedback("⌛ Time's up! Moving to the next word.", false);
                    trialCount++; // Increment trial count
                    setTimeout(() => {
                        feedbackText.style.display = "none"; // Hide feedback
                        initGame(); // Move to the next word
                    }, 2000);
                } else {
                    // End the game and show the final score
                    showFinalScore();
                }
            }
        }, 1000);
    };

    // Check Word Function
    const checkWord = () => {
        let userWord = inputField.value.trim().toLowerCase();
        if (!userWord) {
            showFeedback("⚠️ Please enter a word!", null);
            return;
        }

        if (userWord === correctWord) {
            counter++;
            counterText.textContent = counter;
            showFeedback(`✅ Correct! "${correctWord.toUpperCase()}"`, true);
        } else {
            showFeedback(`❌ Wrong! Try again.`, false);
        }

        // Move to the next word after 2 seconds and hide feedback
        setTimeout(() => {
            feedbackText.style.display = "none"; // Hide feedback
            initGame(); // Move to the next word
        }, 2000);
    };

    // Show Final Score Function
    const showFinalScore = () => {
        clearInterval(timer);
        wordText.innerText = "Game Over!";
    
        // Add the .game-over class to hide Hint and Time Left
        document.querySelector(".details").classList.add("game-over");
    
        inputField.style.display = "none";
        checkBtn.style.display = "none";
    
        showFeedback(`🏆 You got ${counter} out of ${maxTrials} correct!`, null);
    
        setTimeout(() => {
            let userChoice = confirm("Do you want to play again? Click OK to continue or Cancel to quit.");
            if (userChoice) {
                resetGame();
            }
        }, 4000);
    };
    
    const resetGame = () => {
        counter = 0;
        trialCount = 0;
        usedWords = [];
        counterText.textContent = counter;
    
        // Remove the .game-over class to show Hint and Time Left again
        document.querySelector(".details").classList.remove("game-over");
    
        inputField.style.display = "block";
        checkBtn.style.display = "block";
        initGame();
    };
   

    // Event Listeners
    refreshBtn.addEventListener("click", resetGame);
    checkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        checkWord();
    });

    // Start the Game
    initGame();
});
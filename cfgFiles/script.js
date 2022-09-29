// Button Related
const btnRollEl = document.querySelector('.btn-roll');
const btnHoldEl = document.querySelector('.btn-hold');
const btnRestartEl = document.querySelector('.btn-restart');
// Dice Related
const dice = document.querySelector('.dice');
// Score Related
const currentEl0 = document.querySelector('.current--0');
const currentEl1 = document.querySelector('.current--1');
const scoreEl0 = document.querySelector('.score--0');
const scoreEl1 = document.querySelector('.score--1');
// Score Variables
let score, currentPlayer, isGameRunning, currentScore;
// Side Related
const side0 = document.querySelector('.side0');
const side1 = document.querySelector('.side1');
const startGame = () => {
    // Reseting Script Variables
    score = [0, 0];
    currentPlayer = 0;
    isGameRunning = true;
    currentScore = 0;
    /*
     Reseting to initial state, meaning that removing classes from unecessary angles and setting to 0 score and current scores...
    */
    side0.classList.add('activePlayer');
    side1.classList.remove('playerActive');

    side0.classList.remove('winnerPlayer');
    side1.classList.remove('winnerPlayer');

    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;

    currentEl0.textContent = 0;
    currentEl1.textContent = 0;
};
// Starting Game as Script Loads
startGame();

const switchPlayer = () => {
    // Current Roll Stack goes 0 dinamicaly
    document.querySelector(`.current--${currentPlayer}`).textContent = 0;
    // Swithing sides with .toggle
    side0.classList.toggle('activePlayer');
    side1.classList.toggle('activePlayer');
    // Switching Player
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
    // Reseting Current Score (to reuse.)
    currentScore = 0;
};

btnRollEl.addEventListener('click', () => {
    if (isGameRunning) {
        // Generating Dice and Removing Hidden Class
        const randomDice = Math.trunc(Math.random() * 6 + 1);
        dice.classList.remove('hidden');
        dice.src = `dice-${randomDice}.png`;

        if (randomDice !== 1) {
            currentScore += randomDice;
            // Dinamically Alocating Current Score
            document.querySelector(`.current--${currentPlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHoldEl.addEventListener('click', () => {
    if (isGameRunning) {
        // Adding to Score Array the Current Score Via CurrentPlayer Variable
        score[currentPlayer] += currentScore;
        document.querySelector(`.score--${currentPlayer}`).textContent =
            score[currentPlayer];

        if (score[currentPlayer] >= 100) {
            // Stoping the game to block buttons and other functionalities
            isGameRunning = false;
            // Adding WinnerPlayer to the side who got 100p
            document
                .querySelector(`.side${currentPlayer}`)
                .classList.add('winnerPlayer');
            // Removing Current Side activePlayer Status
            document
                .querySelector(`.side${currentPlayer}`)
                .classList.remove('activePlayer');
            // Hiding Dice
            dice.classList.add('hidden');
        } else {
            // Switching In Case Current Score isnt === 100
            switchPlayer();
        }
    }
});

btnRestartEl.addEventListener('click', () => {
    startGame();
});

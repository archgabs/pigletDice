// This is the 1st Version of the code, the final and refactored is on WiP.
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
let score = [0, 0];
// Player Related
let isPlayerOne = true;
let isGameRunning = true;
const side0 = document.querySelector('.side0');
const side1 = document.querySelector('.side1');
// Roll Button Event
btnRollEl.addEventListener('click', () => {
    if (isGameRunning) {
        let randomDice = Math.trunc(Math.random() * 6 + 1);
        dice.classList.remove('hidden');
        dice.src = `dice-${randomDice}.png`;

        if (randomDice !== 1) {
            if (isPlayerOne) {
                // If isPlayerOne === true
                score[0] += randomDice;
                currentEl0.textContent = score[0];
            } else {
                // If isPlayerOne === flase
                score[1] += randomDice;
                currentEl1.textContent = score[1];
            }
        } else {
            if (isPlayerOne) {
                score[0] = 0;
                currentEl0.textContent = 0;
                side0.classList.toggle('activePlayer');
                side1.classList.toggle('activePlayer');

                isPlayerOne = false;
            } else {
                side0.classList.toggle('activePlayer');
                side1.classList.toggle('activePlayer');
                score[1] = 0;
                currentEl1.textContent = 0;
                isPlayerOne = true;
            }
        }
    }
});
// Hold Button Event
btnHoldEl.addEventListener('click', () => {
    if (isPlayerOne) {
        if (score[0] >= 100) {
            side0.classList.add('winnerPlayer');
            isGameRunning = false;
        } else {
            isPlayerOne = false;
            currentEl0.textContent = 0;
            scoreEl0.textContent = score[0];
            side0.classList.toggle('activePlayer');
            side1.classList.toggle('activePlayer');
        }
    } else {
        if (score[1] >= 100) {
            isGameRunning = false;
            side1.classList.add('winnerPlayer');
        } else {
            isPlayerOne = true;
            currentEl1.textContent = 0;
            scoreEl1.textContent = score[1];
            side0.classList.toggle('activePlayer');
            side1.classList.toggle('activePlayer');
        }
    }
});
// Restart Button Event
btnRestartEl.addEventListener('click', () => {
    isGameRunning = true;
    isPlayerOne = true;

    score[0] = 0;
    score[1] = 0;
    side0.classList.add('activePlayer');
    side1.classList.remove('activePlayer');

    side0.classList.remove('winnerPlayer');
    side1.classList.remove('winnerPlayer');

    currentEl0.textContent = 0;
    currentEl1.textContent = 0;
    scoreEl0.textContent = 0;
    scoreEl1.textContent = 0;
});

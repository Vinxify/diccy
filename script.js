'use strict;';

const btnNew = document.querySelector('.btn-new');
const btnHold = document.querySelector('.btn-hold');
const btnRoll = document.querySelector('.btn-roll');
const diceEl = document.querySelector('.dice--0');
const diceE2 = document.querySelector('.dice--1');

const pointPlayer1El = document.querySelector('.score-detail--0');
const pointPlayer2El = document.querySelector('.score-detail--1');

const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');

const currentscorePl1 = document.querySelector('.current-score--0');
const currentscorePl2 = document.querySelector('.current-score--1');

let score = [0, 0];
let currentScore = 0;
let currentPlayer = 0;
let playing = true;

const switchPlayer = function () {
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
  document.querySelector(`.current-score--${currentPlayer}`).innerHTML = 0;
  currentScore = 0;

  currentPlayer = currentPlayer === 0 ? 1 : 0;
  // document.querySelector(`.current-score--${currentPlayer}`).innerHTML = 0;
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    diceE2.classList.remove('hidden');
    const dice = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    diceEl.src = `dice-${dice}.png`;
    diceE2.src = `dice-${dice2}.png`;

    // console.log(score);

    // switch player
    if (dice + dice2 >= 6) {
      currentScore += dice + dice2;
      document.querySelector(`.current-score--${currentPlayer}`).innerHTML =
        currentScore;
      // console.log(score[`${currentPlayer}`]);
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[`${currentPlayer}`] += currentScore;

    document.querySelector(`.score-detail--${currentPlayer}`).textContent =
      score[`${currentPlayer}`];
    if (score[`${currentPlayer}`] >= 10) {
      playing = false;
      console.log('great');
      diceEl.classList.add('hidden');
      diceE2.classList.add('hidden');
      player2El.classList.remove('player--active');
      player1El.classList.remove('player--active');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  score = [0, 0];
  currentScore = 0;
  currentPlayer = 0;

  playing = true;
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
  pointPlayer1El.textContent = 0;
  pointPlayer2El.textContent = 0;
  currentscorePl1.textContent = 0;
  currentscorePl2.textContent = 0;
  diceEl.classList.add('hidden');
  diceE2.classList.add('hidden');
});

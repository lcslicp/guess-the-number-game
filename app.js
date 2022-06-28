//[x] generate random number from 1-20
//[x] keep record of attempts
//[x] check input is lower or higher
//[x] check input === sessionNumber

const generateRandomNumber = (mininum, maximum) => {
  return Math.floor(Math.random() * (maximum - mininum + 1)) + mininum;
};

const attempts = [];
const allowedAttempts = 3;
const sessionNumber = generateRandomNumber(1, 20);

const onSubmitHandler = (event) => {
  event.preventDefault();
  if (attempts.length >= allowedAttempts) {
    attempts.splice(0, allowedAttempts);
  }
  const input = document.getElementById('input-field');
  attempts.push(input.value);

  const attemptsDiv = document.querySelector('.attempts-counter');
  const indicators = document.querySelector('.indicators');
  const changeSymbol = document.querySelector('#display-symbol');
  const startOver = document.querySelector('.start-over');
  const form = document.querySelector('form');

  const wrongAnswer = () => {
    changeSymbol.innerText = 'X';
    changeSymbol.style.color = 'red';
    form.style.animation = 'shake 150ms 4 linear';
  }
  const correctAnswer = () => {
    changeSymbol.style.color = 'yellow';
    indicators.innerText = 'You got it right, congrats!'.toUpperCase();
    indicators.style.color = 'yellow';
    indicators.style.animation = 'blinker 440ms step-end infinite';
  }
  const gameDone = () => {
    form.remove();
    startOver.style.display = 'block';
    background.style.transition = 'background 2s ease';
    attemptsDiv.style.display = 'none';
  }
  const value = Number(input.value);
  const background = document.querySelector('html');

  if (value === sessionNumber) {
    changeSymbol.innerText = sessionNumber;
    correctAnswer();
    gameDone();
    background.style.backgroundColor = '#440A67';
  }
  if (value > sessionNumber) {
    wrongAnswer();
    indicators.innerText = 'Too High!';
  }
  if (value < sessionNumber) {
    wrongAnswer();
    indicators.innerText = 'Too Low!';
  }
  if (allowedAttempts - attempts.length == 0 && value !== sessionNumber) {
    changeSymbol.innerText = 'Game Over';
    changeSymbol.style.color = 'red';
    gameDone();
    indicators.remove();
    startOver.style.backgroundColor = 'red';
    background.style.backgroundColor = 'black';
  }
  attemptsDiv.innerText = `Attempts left: ${allowedAttempts - attempts.length}`;
};

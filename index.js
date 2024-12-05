const input = document.querySelector(".input");
const output = document.querySelector(".output");
const form = document.querySelector(".input-box");

const GAME_START = "1";
const GAME_END = "9";
const NUMBER_INPUT_REGEX = /^[1-9]{3}$/;
const NUMBER_LENGTH = 3;
const NUMBER_MIN = 1;
const NUMBER_MAX = 9;

let correctAnswer = "";
let gameStatus = false;

const print = (str) => {
  output.insertAdjacentHTML("beforeend", str);
};

const inputReset = () => (input.value = "");

const pickRandomNumber = () => {
  let numbers = "";

  while (numbers.length < NUMBER_LENGTH) {
    const num = Math.floor(Math.random() * NUMBER_MAX) + NUMBER_MIN;

    if (!numbers.includes(num)) numbers += num;
  }

  return numbers;
};

const printHint = (ball, strike) => {
  let str = "";

  if (ball) str += `${ball}볼`;
  if (strike) str += `${strike}스트라이크`;
  if (strike === 0 && ball === 0) str = "낫싱";

  print(str);

  if (strike === NUMBER_LENGTH) {
    gameStatus = false;
    return print("<br>3개의 숫자를 모두 맞히셨습니다.<br>--------게임 종료---------");
  }

  print("<br>숫자를 입력해주세요 : ");
};

const compareNumber = () => {
  const inputNumbers = input.value;
  const set = new Set(inputNumbers);
  let ball = 0;
  let strike = 0;

  print(`${inputNumbers}<br>`);
  inputReset();

  if (NUMBER_INPUT_REGEX.test(inputNumbers) && set.size === NUMBER_LENGTH) {
    for (let i = 0; i < NUMBER_LENGTH; i++) {
      if (inputNumbers[i] === correctAnswer[i]) strike += 1;
      else if (correctAnswer.includes(inputNumbers[i])) ball += 1;
    }

    /**
      방법1
      [...threeNumbers].forEach((num, index) => {
        if (correctAnswer[index] == num) {
          strike += 1;
        } else if (correctAnswer.includes(num)) {
          ball += 1;
        }
      });
     */

    return printHint(ball, strike);
  }

  print("중복없이 3자릿수를 입력해주세요.<br> 숫자를 입력해주세요 : ");
};

const startGame = () => {
  gameStatus = true;
  correctAnswer = pickRandomNumber();
  output.innerHTML = "컴퓨터가 숫자를 뽑았습니다.<br>";
  console.log(correctAnswer);
  print("숫자를 입력해주세요 : ");
  inputReset();
};

const endGame = () => {
  gameStatus = false;
  correctAnswer = "";
  output.innerHTML = "";
  print("애플리케이션이 종료되었습니다.");
  inputReset();
};

const isNotPlaying = () => {
  output.innerHTML = "";
  print("1 혹은 9를 입력해주세요<br>");
  inputReset();
};

const gameHandler = (event) => {
  event.preventDefault();

  if (input.value === GAME_START) return startGame();
  else if (input.value === GAME_END) return endGame();

  if (gameStatus) return compareNumber();
  isNotPlaying();
};

form.addEventListener("submit", gameHandler);

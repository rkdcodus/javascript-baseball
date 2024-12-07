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
  const numbers = Array.from({ length: NUMBER_MAX }, (_, i) => i + 1);
  const shuffled = numbers.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, NUMBER_LENGTH).join("");
};

const printHint = (ball, strike) => {
  let str = "";

  if (ball) str += `${ball}볼`;
  if (strike) str += `${strike}스트라이크`;
  if (strike === 0 && ball === 0) str = "낫싱";

  print(str);
};

const printResult = (strike) => {
  if (strike === NUMBER_LENGTH) {
    print("<br>3개의 숫자를 모두 맞히셨습니다.<br>--------게임 종료---------");
    return false;
  }
  print("<br>숫자를 입력해주세요 : ");
  return true;
};

const compareNumber = () => {
  const inputNumbers = input.value;
  const set = new Set(inputNumbers);

  print(`${inputNumbers}<br>`);
  inputReset();
  console.log(correctAnswer);
  if (NUMBER_INPUT_REGEX.test(inputNumbers) && set.size === NUMBER_LENGTH) {
    const { balls, strikes } = [...inputNumbers].reduce(
      (result, num, idx) => {
        if (correctAnswer[idx] == num) {
          return { ...result, strikes: result.strikes + 1 };
        } else if (correctAnswer.includes(num)) {
          return { ...result, balls: result.balls + 1 };
        }
        return result;
      },
      { balls: 0, strikes: 0 }
    );

    printHint(balls, strikes);
    gameStatus = printResult(strikes);
    return;
  }

  print("중복없이 3자릿수를 입력해주세요.<br> 숫자를 입력해주세요 : ");
};

const startGame = () => {
  gameStatus = true;
  correctAnswer = pickRandomNumber();
  output.innerHTML = "컴퓨터가 숫자를 뽑았습니다.<br>";
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

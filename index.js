import { GAME_END, GAME_START, NUMBER_INPUT_REGEX, NUMBER_LENGTH, NUMBER_MAX } from "./constant.js";
import { printHint, printResult, print } from "./output.js";

const input = document.querySelector(".input");
const output = document.querySelector(".output");
const form = document.querySelector(".input-box");

let correctAnswer = "";
let gameStatus = false;

const inputReset = () => (input.value = "");

const pickRandomNumber = () => {
  const numbers = Array.from({ length: NUMBER_MAX }, (_, i) => i + 1);
  const shuffled = numbers.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, NUMBER_LENGTH).join("");
};

const inputValidator = (input) => {
  const set = new Set(input);

  if (NUMBER_INPUT_REGEX.test(input) && set.size === NUMBER_LENGTH) {
    return true;
  }
  return false;
};

const compareNumber = (inputNumbers) => {
  return [...inputNumbers].reduce(
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

const notPlaying = () => {
  output.innerHTML = "";
  print("1 혹은 9를 입력해주세요<br>");
  inputReset();
};

const playingGame = () => {
  const inputNumbers = input.value;
  print(`${inputNumbers}<br>`);
  inputReset();

  if (inputValidator(inputNumbers)) {
    const { balls, strikes } = compareNumber(inputNumbers);
    printHint(balls, strikes);
    gameStatus = printResult(strikes);
    return;
  }

  print("중복없이 3자릿수를 입력해주세요.<br> 숫자를 입력해주세요 : ");
};

const gameHandler = (event) => {
  event.preventDefault();

  if (input.value === GAME_START) return startGame();
  else if (input.value === GAME_END) return endGame();

  if (gameStatus) return playingGame();
  notPlaying();
};

form.addEventListener("submit", gameHandler);

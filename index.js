const input = document.querySelector(".input");
const output = document.querySelector(".output");
const form = document.querySelector(".input-box");

const start = "1";
const end = "9";
const regex = /^[1-9]{3}$/;

let correctAnswer = 0;

const print = (str) => {
  output.insertAdjacentHTML("beforeend", str);
};

const pickRandomNumber = () => {
  let numbers = "";

  while (numbers.length < 3) {
    const num = Math.floor(Math.random() * 9) + 1;

    if (!numbers.includes(num)) numbers += num;
  }

  return numbers;
};

const printHint = (ball, strike) => {
  let str = "";

  if (ball) str += `${ball}볼`;
  if (strike) str += `${strike}스트라이크`;
  if (str === "") str = "낫싱";

  print(str);

  if (str === "3스트라이크") {
    print("<br>3개의 숫자를 모두 맞히셨습니다.<br>--------게임 종료---------");
  } else {
    print("<br>숫자를 입력해주세요 : ");
  }
};

const compareNumber = () => {
  const threeNumbers = input.value;
  const set = new Set(threeNumbers);
  let ball = 0;
  let strike = 0;

  print(`${threeNumbers}<br>`);

  if (regex.test(threeNumbers) && set.size === 3) {
    for (let i = 0; i < 3; i++) {
      if (threeNumbers[i] === correctAnswer[i]) strike += 1;
      else if (correctAnswer.includes(threeNumbers[i])) ball += 1;
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

    printHint(ball, strike);
  } else {
    print("중복없이 3자릿수를 입력해주세요.<br> 숫자를 입력해주세요 : ");
  }
};

const gameHandler = (event) => {
  event.preventDefault();

  if (input.value === start) {
    correctAnswer = pickRandomNumber();
    output.innerHTML = "컴퓨터가 숫자를 뽑았습니다.<br>";
    print("숫자를 입력해주세요 : ");
  } else if (input.value === end) {
    output.innerHTML = "";
    correctAnswer = 0;
    print("애플리케이션이 종료되었습니다.");
  } else if (!correctAnswer) {
    print("1 혹은 9를 입력해주세요<br>");
  }

  if (correctAnswer && input.value !== start) {
    compareNumber();
  }

  input.value = "";
};

form.addEventListener("submit", gameHandler);

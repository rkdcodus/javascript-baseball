const input = document.querySelector(".input");
const button = document.querySelector(".button");
const output = document.querySelector(".output");

let correctAnswer = 0;

if (!correctAnswer) {
  button.addEventListener("click", () => {
    if (input.value == 1) {
      //컴퓨터 숫자 랜덤 생성&출력
      correctAnswer = pickRandomNumber();

      output.insertAdjacentHTML("beforeend", "컴퓨터가 숫자를 뽑았습니다.<br>");
    } else if (input.value == 9) {
      alert("애플리케이션이 종료되었습니다.");
    }

    if (correctAnswer) {
      compareNumber();
    } else {
      alert("1 혹은 9를 입력해주세요");
    }
    input.value = "";
  });
}

function pickRandomNumber() {
  let numbers = "";

  while (numbers.length < 3) {
    const num = Math.floor(Math.random() * 9) + 1;
    // 서로 다른 숫자 합치기
    if (!numbers.includes(num)) {
      numbers += num;
    }
  }

  return numbers;
}

function compareNumber() {
  let threeNumbers = input.value;

  if (input.value.length == 3) {
    // 컴퓨터 3자릿수와 비교하고 힌트를 출력
    output.insertAdjacentHTML("beforeend", `${threeNumbers}<br>`);
    output.insertAdjacentHTML("beforeend", "숫자를 입력해주세요.<br>");
  } else {
    output.insertAdjacentHTML("beforeend", "중복없이 3자릿수를 입력해주세요.<br>");
  }
}

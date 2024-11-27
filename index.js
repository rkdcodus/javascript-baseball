const input = document.querySelector(".input");
const button = document.querySelector(".button");
const output = document.querySelector(".output");

let correctAnswer = 0;

button.addEventListener("click", () => {
  if (input.value == 1) {
    //컴퓨터 숫자 랜덤 생성&출력
    correctAnswer = pickRandomNumber();

    output.insertAdjacentHTML("beforeend", "컴퓨터가 숫자를 뽑았습니다.<br>");
  } else if (input.value == 9) {
    output.innerHTML = "";
    correctAnswer = 0;
    alert("애플리케이션이 종료되었습니다.");
  }

  if (correctAnswer && input.value != 1) {
    compareNumber();
  }

  input.value = "";
});

// 숫자 랜덤 뽑기 함수
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

// 숫자 비교 함수
function compareNumber() {
  let threeNumbers = input.value;
  const set = new Set(threeNumbers);
  let ball = 0;
  let strike = 0;

  if (set.size == 3) {
    // 컴퓨터 랜덤 숫자와 비교하기
    // for(i = 0; i < 3; i++) {
    //   let a = 0;
    //   if (threeNumbers[i] == correctAnswer[a]) {
    //     strike += 1;
    //   } else {
    //     if (threeNumbers[a] == correctAnswer[a]) {
    //       ball += 1;
    //       a += 1;
    //     }
    //   }
    // }
    [...threeNumbers].forEach((num, index) => {
      if (correctAnswer[index] == num) {
        strike += 1;
      } else if (correctAnswer.includes(num)) {
        ball += 1;
      }
    });
    output.insertAdjacentHTML("beforeend", `${threeNumbers}<br>`);

    let str = "";

    if (ball) {
      str += `${ball}볼`;
    }

    if (strike) {
      str += `${strike}스트라이크`;
    }

    if (str === "") {
      str = "낫싱";
    }

    output.insertAdjacentHTML("beforeend", `${str}<br>`);
    // output.insertAdjacentHTML("beforeend", "숫자를 입력해주세요.<br>");
  } else {
    output.insertAdjacentHTML("beforeend", "중복없이 3자릿수를 입력해주세요.<br>");
  }
}

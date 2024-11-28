const input = document.querySelector(".input");
const button = document.querySelector(".button");
const output = document.querySelector(".output");

let correctAnswer = 0;

button.addEventListener("click", () => {
  if (input.value == 1) {
    //컴퓨터 숫자 랜덤 생성&출력
    correctAnswer = pickRandomNumber();
    output.innerHTML = "컴퓨터가 숫자를 뽑았습니다.<br>";
    output.insertAdjacentHTML("beforeend", "숫자를 입력해주세요 : ");
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

//
function printHint(ball, strike) {
  let str = "";

  if (ball) str += `${ball}볼`;
  if (strike) str += `${strike}스트라이크`;
  if (str === "") str = "낫싱";

  output.insertAdjacentText("beforeend", `${str}`);

  if (str === "3스트라이크") {
    output.insertAdjacentHTML(
      "beforeend",
      `<br>3개의 숫자를 모두 맞히셨습니다.<br>
      --------게임 종료---------`
    );
  } else {
    output.insertAdjacentHTML("beforeend", `<br>숫자를 입력해주세요 : `);
  }
}

// 숫자 비교 함수
function compareNumber() {
  const threeNumbers = input.value;
  const set = new Set(threeNumbers);
  let ball = 0;
  let strike = 0;

  console.log(correctAnswer);

  if (set.size == 3) {
    for (let i = 0; i < 3; i++) {
      if (threeNumbers[i] === correctAnswer[i]) {
        strike++;
      } else if (correctAnswer.includes(threeNumbers[i])) {
        ball++;
      }
    }

    // 방법1
    // [...threeNumbers].forEach((num, index) => {
    //   if (correctAnswer[index] == num) {
    //     strike += 1;
    //   } else if (correctAnswer.includes(num)) {
    //     ball += 1;
    //   }
    // });

    output.insertAdjacentHTML("beforeend", `${threeNumbers}<br>`);

    printHint(ball, strike);
  } else {
    if (output.innerHTML.endsWith("숫자를 입력해주세요 : ")) {
      output.innerHTML = output.innerHTML.slice(0, -13);
    }
    output.insertAdjacentHTML("beforeend", "중복없이 3자릿수를 입력해주세요.<br>");
  }
}

/**
 * 
1. 숫자를 입력해주세요 : 를 적합하게 추가한다. O
2. ==과 ===의 적합한 사용
3. 예외 처리 상태 코드 추가(400, 404, 201등) + 추가 안해야 하나?
-> 상태 코드보다는 메세지로 예외 처리
4. 코드 가독성 정리, 주석 처리
5. 중복되는 코드 병합, 반복문 최소화
6. 반복되는 코드는 함수화
7. 문자열 따옴표, 백틱 통일
 */

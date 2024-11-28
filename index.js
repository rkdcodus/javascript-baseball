const input = document.querySelector(".input");
const button = document.querySelector(".button");
const output = document.querySelector(".output");

const start = "1";
const end = "9";
const regex = /^[1-9]{3}$/;

let correctAnswer = 0;

/**
 * 
1. 숫자를 입력해주세요 : 를 적합하게 추가한다. O
2. ==과 ===의 적합한 사용 o
3. 예외 처리 상태 코드 추가(400, 404, 201등) + 추가 안해야 하나?
-> 상태 코드보다는 메세지로 예외 처리
4. 코드 가독성 정리, 주석 처리 o
5. 중복되는 코드 병합, 반복문 최소화
6. 반복되는 코드는 함수화 o
7. 문자열 따옴표, 백틱 통일 o 

예외처리
1. 숫자 이외의 문자를 3자리 입력 시 정상 작동되고 있음.
2. 엔터 쳤을 때 새로고침됨.


질문
1. 함수 정의 방식 ( 화살표 함수 vs 함수 선언문)
2. 함수와 본문 순서 
3. 비교 로직 방법 어떤게 좋은지
4. 커밋 메시지에 함수명을 적는게 좋은지.
 */

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

  console.log(correctAnswer);

  if (regex.test(threeNumbers) && set.size === 3) {
    console.log(set);
    for (let i = 0; i < 3; i++) {
      if (threeNumbers[i] === correctAnswer[i]) strike += 1;
      else if (correctAnswer.includes(threeNumbers[i])) ball += 1;
    }

    // 방법1
    // [...threeNumbers].forEach((num, index) => {
    //   if (correctAnswer[index] == num) {
    //     strike += 1;
    //   } else if (correctAnswer.includes(num)) {
    //     ball += 1;
    //   }
    // });

    //print(`${threeNumbers}<br>`);

    printHint(ball, strike);
  } else {
    // if (output.innerHTML.endsWith("숫자를 입력해주세요 : ")) {
    //   output.innerHTML = output.innerHTML.slice(0, -13);
    // }
    print("중복없이 3자릿수를 입력해주세요.<br> 숫자를 입력해주세요 : ");
  }
};

button.addEventListener("click", () => {
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
});

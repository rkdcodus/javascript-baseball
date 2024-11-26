const input = document.querySelector(".input");
const button = document.querySelector(".button");
const output = document.querySelector(".box");

button.addEventListener("click", () => {
  if (input.value == 1) {
    output.innerText = input.value;
    //컴퓨터 숫자 랜덤 생성&출력
    const correctAnswer = pickRandomNumber();
    console.log(correctAnswer);
  } else if (input.value == 9) {
    alert("애플리케이션이 종료되었습니다.");
  } else {
    alert("1 혹은 9를 입력해주세요");
  }
});

function pickRandomNumber() {
  let numbers = Math.floor(Math.random() * 9) + 1;
  while (numbers.length <= 3) {
    const num = Math.floor(Math.random() * 9) + 1;
    // 서로 다른 숫자 합치기
  }
  return numbers;
}

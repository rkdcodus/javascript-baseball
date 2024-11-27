const input = document.querySelector(".input");
const button = document.querySelector(".button");
const output = document.querySelector(".output");

button.addEventListener("click", () => {
  // let num = 1

  // if (num) {
  //   num++
  // } else (num == 2) {

  // }
  if (input.value == 1) {
    //컴퓨터 숫자 랜덤 생성&출력
    const correctAnswer = pickRandomNumber();
    console.log(typeof correctAnswer);

    output.insertAdjacentHTML("beforeend", "컴퓨터가 숫자를 뽑았습니다.<br>");
  } else if (input.value == 9) {
    alert("애플리케이션이 종료되었습니다.");
  } else {
    alert("1 혹은 9를 입력해주세요");
  }

  input.value = "";
});

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

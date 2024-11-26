const input = document.querySelector(".input");
const button = document.querySelector(".button");
const output = document.querySelector(".box");

button.addEventListener("click", () => {

  if (input.value == 1) {
    output.innerText(input.value);

    //컴퓨터 숫자 랜덤 생성&출력

  } else if (input.value == 9) {
    alert("애플리케이션이 종료되었습니다.");
  } else {
    alert("1 혹은 9를 입력해주세요");
  }

});

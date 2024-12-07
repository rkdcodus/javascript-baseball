import { NUMBER_LENGTH } from "./constant.js";
const output = document.querySelector(".output");

export const print = (str) => {
  output.insertAdjacentHTML("beforeend", str);
};

export const printHint = (ball, strike) => {
  let str = "";

  if (ball) str += `${ball}볼`;
  if (strike) str += `${strike}스트라이크`;
  if (strike === 0 && ball === 0) str = "낫싱";

  print(str);
};

export const printResult = (strike) => {
  if (strike === NUMBER_LENGTH) {
    print("<br>3개의 숫자를 모두 맞히셨습니다.<br>--------게임 종료---------");
    return false;
  }
  print("<br>숫자를 입력해주세요 : ");
  return true;
};

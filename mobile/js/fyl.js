"use strict";

//워딩 강조이벤트
function textProcess(divId, text, separator) {
  if (text == undefined || text == null || text == '') {
    return;
  }

  if (separator == undefined || separator == null || separator == '') {
    separator = ' ';
  }

  var textArr = text.split(separator);

  if ($(divId)) {
    var resultString = "";

    for (var i = 0; i < textArr.length; i++) {
      resultString += "<span class='gray' position=" + i + " >" + textArr[i] + "</span>&nbsp;";
    }

    $(divId).append(resultString);
    textAnimation(textArr.length);
  }
}

var textAnimation = function textAnimation(textLength) {
  var time = 250;
  var count = 0;
  var timer;

  function showText() {
    if (count >= textLength) {
      clearInterval(timer);
      return;
    }

    var findObject = "span[position=" + count + "]";
    $(findObject).animate({
      opacity: '1'
    }, time);
    count++;
  }

  timer = setInterval(showText, time);
};

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() >= Math.ceil($('.'))) var text1 = "Shape.Shifter 쉐이프 쉬프터는 신화나 소설 속에서 형태가 변신하는 능력자를 의미하며 이야기 속에서 물리적인 모양을 변신하는 능력은 초인간적인 능력, 신의 개입, 악마의 조작, 마법과 주문 같은 초월의 능력으로 가능했습니다.<br>역사적으로 누적된 수많은 설화와 사례들은 고정된 모습을 전복하려는 인간의 모양 변신에 대한 욕망을 투사합니다. Find Your Light 3는 루이까또즈의 헤리티지인 가방이 가지고 있는 원형의 한계를 뛰어 넘어 가방에 물리적 변형을 가하며 자유롭게 창작하는 프로젝트입니다.<br>10인의 아티스트와 함께 패션과 미술의 혼성적 경계에서 새로운 차원의 감각을 추구하며 동시대 예술의 가능성을 탐험합니다.";
    textProcess('#contentText1', text1);
  });
}); // 둥둥 떠있는 이벤트
// 범위 랜덤 함수(소수점 2자리까지)

function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingEvent(selector, delay, sizeX, sizeY) {
  gsap.to(selector, random(1.5, 2.5), {
    x: sizeX,
    y: sizeY,
    repeat: -1,
    //무한반복
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay) //지연시간

  });
}

floatingEvent('.floating1', 1, 8, 6);
floatingEvent('.floating2', 0.5, -6, 8);
floatingEvent('.floating3', 0.5, -4, 6);
floatingEvent('.floating4', 0.5, -4, 6);
floatingEvent('.floating5', 0.5, -4, 6);
floatingEvent('.floating6', 0.5, -4, 6);
floatingEvent('.floating7', 0.5, -4, 6);
floatingEvent('.floating8', 0.5, -4, 6);
floatingEvent('.floating9', 0.5, -4, 6);
floatingEvent('.floating10', 0.5, -4, 6);
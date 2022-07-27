"use strict";

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
  var text1 = "Shape.Shifter 쉐이프 쉬프터는 신화나 소설 속에서 형태가 변신하는 능력자를 의미하며 이야기 속에서 물리적인 모양을 변신하는 능력은 초인간적인 능력, 신의 개입, 악마의 조작, 마법과 주문 같은 초월의 능력으로 가능했습니다.<br>역사적으로 누적된 수많은 설화와 사례들은 고정된 모습을 전복하려는 인간의 모양 변신에 대한 욕망을 투사합니다. Find Your Light 3는 루이까또즈의 헤리티지인 가방이 가지고 있는 원형의 한계를 뛰어 넘어 가방에 물리적 변형을 가하며 자유롭게 창작하는 프로젝트입니다.<br>10인의 아티스트와 함께 패션과 미술의 혼성적 경계에서 새로운 차원의 감각을 추구하며 동시대 예술의 가능성을 탐험합니다.";
  textProcess('#contentText1', text1); //var text2 = "양승빈은 역사적으로 누적된 수많은 설화와 사례들은 고정된 모습을 전복하려는 인간의 모양 변신에 대한 욕망을 투사합니다. <br><br> 올해 Find your light3는 루이까또즈의 헤리티지인 가방이 가지고 있는 원헤리티지인 가방이 가지고 있는 원헤리티지인 가방이 가지고 있는 원형의 한계를 뛰어 넘어 가방에 물리적 변형을 가하며 자유롭게 창작하는 프로젝트입니다. <br><br> 양승빈은 역사적으로 누적된 수많은 설화와 사례들은 고정된 모습을 전복하려는 인간의 모양 변신에 대한 욕망을 투사합니다. 올해 Fi헤리티지인 가방이 가지고 있는 원헤리티지인 가방이 가지고 있는 원nd your light3는 루이까또즈의 헤리티지인 가방이 가지고 있는 원형의 한계를 뛰어 넘어 가방에 물리적 변형을 가하며 자유롭게 창작하는 프로젝트입니다.";
  //textProcess( '#contentText2', text2 );
});
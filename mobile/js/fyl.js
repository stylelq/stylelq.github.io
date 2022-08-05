"use strict";

//워딩 강조이벤트
function textProcess(divId, text, separator, time) {
  if (text == undefined || text == null || text == '') {
    return;
  }

  if (separator == undefined || separator == null || separator == '') {
    separator = ' ';
  }

  if (time == undefined || time == null || time == '') {
    time = 300;
  }

  var textArr = text.split(separator);

  if ($(divId)) {
    var resultString = "";

    for (var i = 0; i < textArr.length; i++) {
      resultString += "<span class='gray' position=" + i + " >" + textArr[i] + "</span>&nbsp;";
    }

    $(divId).append(resultString);
    var count = 0;
    showText(divId, count, textArr.length, time);
  }
}

function textYellow(divId, text, separator, time) {
  if (text == undefined || text == null || text == '') {
    return;
  }

  if (separator == undefined || separator == null || separator == '') {
    separator = ' ';
  }

  if (time == undefined || time == null || time == '') {
    time = 300;
  }

  var textArr = text.split(separator);

  if ($(divId)) {
    var resultString = "";

    for (var i = 0; i < textArr.length; i++) {
      resultString += "<span class='yellow' position=" + i + " >" + textArr[i] + "</span>&nbsp;";
    }

    $(divId).append(resultString);
    var count = 0;
    showTextYellow(divId, count, textArr.length, time);
  }
}

function showText(divId, count, textLength, time) {
  if (count >= textLength) {
    return;
  } else {
    var parentObject = $(divId);
    var findObject = parentObject.find("span[position=" + count + "]");
    $(findObject).animate({
      opacity: '1'
    }, time);
    count++;
    setTimeout(function () {
      showText(divId, count, textLength, time);
    }, time);
  }
}

function showTextYellow(divId, count, textLength, time) {
  if (count >= textLength) {
    return;
  } else {
    var parentObject = $(divId);
    var findObject = parentObject.find("span[position=" + count + "]");
    $(findObject).animate({
      opacity: '1'
    }, time).css('color', '#ffe100');
    count++;
    setTimeout(function () {
      showTextYellow(divId, count, textLength, time);
    }, time);
  }
} // 범위 랜덤함수(소수점 2자리까지)


function random(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
} // 둥둥 떠있는 이벤트


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
} // 플로팅 이벤트 실행


floatingEvent('.floating1', 6, 15, 15);
floatingEvent('.floating2', 6, -15, 15);
floatingEvent('.floating3', 6, 15, 15);
floatingEvent('.floating4', 6, -15, 15);
floatingEvent('.floating5', 6, 15, 15);
floatingEvent('.floating6', 6, -15, 15);
floatingEvent('.floating7', 6, 15, 15);
floatingEvent('.floating8', 6, -15, 15);
floatingEvent('.floating9', 6, 15, 15);
floatingEvent('.floating10', 6, -15, 15);
/*function fylPlayVideo(){
    var areaElem = $(this);
    var areaNum = areaElem.attr('class').replace(/[^0-9]/g, '') - 1;
    areaElem.find('.fyl-section1__intro').addClass('is-hide');
    videoNum = areaNum;
    objAry[videoNum].playVideo();
}*/

var playBtn = $('.fyl-section1__play');
var pauseBtn = $('.fyl-section1__pause');
var video = $('#stopVideo');

function fylPauseVideo() {
  playBtn.removeClass('is-hide');
  video.get(0).pause();
}

function fylReplayVideo() {
  video.get(0).play();
  playBtn.addClass('is-hide');
} //$('.js-fyl-btn').on('click', fylPlayVideo); // 영상재생


$('#stopVideo').on('click', fylPauseVideo); // 영상정지

$('#replayVideo').on('click', fylReplayVideo); //영상재실행

$(document).ready(function () {
  var text1 = "<b>Shape.Shifter 쉐이프 쉬프터</b>는 신화나 소설 속에서<br><b>형태가 변신하는 능력자</b>를 의미하며 이야기 속에서<br><b>물리적인 모양을 변신하는 능력</b>은 초인간적인 능력,<br>신의 개입, 악마의 조작, 마법과 주문 같은 초월의<br>능력으로 가능했습니다.<br>역사적으로 누적된 수많은 설화와 사례들은 고정된<br>모습을 전복하려는 인간의 모양 변신에 대한 욕망을<br>투사합니다. Find Your Light 3는 루이까또즈의<br>헤리티지인 가방이 가지고 있는 원형의 한계를 뛰어<br>넘어 가방에 물리적 변형을 가하며 자유롭게<br>창작하는 프로젝트입니다.<br>10인의 아티스트와 함께 패션과 미술의<br>혼성적 경계에서 새로운 차원의 감각을 추구하며<br>동시대 예술의 가능성을 탐험합니다.";
  textProcess('#contentText1', text1);
  var text2 = "양승빈은 역사적으로 누적된 수많은 설화와 사례들은 고정된 모습을 전복하려는 인간의 모양  변신에 대한 욕망을 투사합니다.  올해 Find your light3는 루이까또즈의 헤리티지인 가방이 가지고 있는 원헤리티지인 가방이 가지고 있는 원헤리티지인 가방이 가지고 있는 원형의 한계를 뛰어 넘어 가방에 물리적 변형을 가하며 자유롭게 창작하는 프로젝트입니다. <br><br>양승빈은 역사적으로 누적된 수많은 설화와 사례들은 고정된 모습을 전복하려는 인간의 모양  변신에 대한 욕망을 투사합니다.  올해 Fi헤리티지인 가방이 가지고 있는 원헤리티지인 가방이 가지고 있는 원nd your light3는 루이까또즈의 헤리티지인 가방이 가지고 있는 원형의 한계를 뛰어 넘어 가방에 물리적 변형을 가하며 자유롭게 창작하는 프로젝트입니다.";
  textYellow('#contentText2', text2);
});
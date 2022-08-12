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
}

$('#stopVideo').on('click', fylPauseVideo); // 영상정지

$('#replayVideo').on('click', fylReplayVideo); //영상재실행
// 텍스트 이벤트

var text1 = "<b>Shape.Shifter 쉐이프 쉬프터는</b> 신화나 소설 속에서 <b>형태가 변신하는 능력자를</b> 의미하며,<br>이야기 속에서 <b>물리적인 모양을 변신하는 능력은</b> 초인간적인 능력, 신의 개입, 악마의 조작, 마법과 주문 같은 초월의 능력으로 가능했습니다.<br>역사적으로 누적된 수많은 설화와 사례들은 고정된 모습을 전복하려는 인간의 모양 변신에 대한 욕망을 투사합니다.<br>Find Your Light 3는 루이까또즈의 헤리티지인 가방이 가지고 있는 원형의 한계를 뛰어 넘어 가방에 물리적 변형을 가하며 자유롭게 창작하는 프로젝트<br>입니다. 10인의 아티스트와 함께 패션과 미술의 혼성적 경계에서 새로운 차원의 감각을 추구하며 동시대 예술의 가능성을 탐험합니다.";
var text2 = "루이까또즈는 젊은 아티스트와 함께 다양한 문화와 에너지를 공유하기 위한 Find Your Light 프로젝트를 2020년부터 이어가고 있습니다.  루이까또즈는 <br>" + "젊은 아티스트와 함께 다양한 문화와 에너지를 공유하기 위한 Find Your Light 프로젝트를 2020년부터 이어가고 있습니다.<br>" + "2022년 프로젝트 Shape.Shifter 쉐이프 쉬프터는 브랜드의 헤리티지인 가방이 가지고 있는 원형의 한계를 뛰어넘어 가방에 물리적 변형을<br>" + "가하며 자유롭게 창작하는 프로젝트입니다. <br><br>" + "컨트리뷰터스는 공예인 김은학과 공예·디자인 연구자 이정은이 결성한 제작문화 콜렉티브로 공예·디자인과 연결된 사회 현상, 역사, 인물, 지역 등에 대한<br>" + "포괄적인 리서치를 컨트리뷰터스는 공예인 김은학과 공예·디자인 연구자 이정은이 결성한 제작문화 콜렉티브로 역사, 인물, 지역 등에 대한<br>" + "포괄적인 리서치를 기반으로 기획, 제작, 연구 활동을 시작했습니다. 공예·디자인에 대한 아티스틱 리서치와 창작을 목표로 둘 사이를 매개하는 기획 활동을<br>" + "진행 중입니다.";
var isVisible = false;
var listTxt = $('#contentText1');
var workTxt = $('#contentText2');
window.addEventListener('scroll', function () {
  if (listTxt.scrollTop && workTxt.scrollTop && isVisible == false) {
    isVisible = true;
    textProcess('#contentText1', text1);
    textYellow('#contentText2', text2);
  }
});
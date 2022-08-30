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


floatingEvent('.floating1', 3, 10, 10);
floatingEvent('.floating2', 3, -10, 10);
floatingEvent('.floating3', 3, 10, 10);
floatingEvent('.floating4', 3, -10, 10);
floatingEvent('.floating5', 3, 10, 10);
floatingEvent('.floating6', 3, -10, 10);
floatingEvent('.floating7', 3, 10, 10);
floatingEvent('.floating8', 3, -10, 10);
floatingEvent('.floating9', 3, 10, 10);
floatingEvent('.floating10', 3, -10, 10); // var playBtn = $('.fyl-section1__play');
// var pauseBtn = $('.fyl-section1__pause');
// var video = $('#stopVideo');
//
// function fylPauseVideo(){
//     playBtn.removeClass('is-hide');
//     video.get(0).pause();
// }
//
// function fylReplayVideo(){
//     video.get(0).play();
//     playBtn.addClass('is-hide');
// }
//
// $('#stopVideo').on('click', fylPauseVideo); // 영상정지
// $('#replayVideo').on('click',fylReplayVideo); //영상재실행
// 텍스트 이벤트

var text1 = "<b>Shape.Shifter 쉐이프 쉬프터는</b> 신화나 소설 속에서<br>형태가 변신하는 능력자를 의미하며,<br>이야기 속에서 물리적인 모양을 변신하는 능력은<br>초인간적인 능력, 신의 개입, 악마의 조작, 마법과 주문<br>같은 초월의 능력으로 가능했습니다.<br>역사적으로 누적된 수많은 설화와 사례들은 고정된<br>모습을 전복하려는 인간의 모양 변신에 대한<br>욕망을 투사합니다.<br>Find Your Light의 세번째 프로젝트 쉐이프 쉬프터는<br>루이까또즈의 헤리티지인 가방이 가지고 있는<br>원형의 한계를 뛰어 넘어 가방에 물리적 변형을 가하며<br>자유롭게 창작하는 것을 목표로 합니다.<br>10인의 아티스트와 함께 패션과 미술의 혼성적<br>경계에서 새로운 차원의 감각을 추구하며 동시대<br>예술의 가능성을 탐험합니다.";
var yangseoungbin = "양승빈은 전통적 공예와 스토리텔링을 활용해<br/>오브제를 창작하는 디자이너입니다.<br/>네덜란드의 디자인 아카데미 에인트호번에서<br/>Public Private과 Contextual Design 과정을 졸업한<br/>이래 에인트호번과 서울을 오가며 활동을 이어가고<br/>" + "있습니다.<br/>전통적인 옻칠 기법을 다양한 물성에 적용하는 리서<br/>치를 기반으로 한 ‘21g’ 시리즈에서 ‘Lacquered<br/>Forms’와 ‘Simulacre’ 시리즈로 점차 작업을 확장하고<br/>있습니다." + "작가의 작품 ‘Simulacre’ 시리즈는<br/>영국 V&A 뮤지엄과 네덜란드 스테델릭 미술관에 영<br/>구 소장 중입니다. 최근에는 작가 자신의 스토리텔링<br/>을 기반으로 고고학적 허구를 오브젝트에 결합한 작<br/>업 ‘Requiem’을 진행 중입니다.<br/><br/>" + "양승빈은 디지털 이미지가 전송되고 복제되는<br/>과정에서 이미지가 기존의 인식과 다른 낯선 모습으<br/>로 열화되는 디지털 변형 현상에 주목했습니다.<br/> " + "&lt;Deconstructed Icons&gt;는 루이까또즈 제품을 찍은<br/>2D 이미지를 다시 3D 디지털 이미지로 치환하고<br/>디지털 상에서 ‘조각내기’와 ‘붙이기’를 반복해<br/>해체-변형-재조합을 시도한 결과입니다.<br/>관습적인 맥락에서 대상을 분리한 시각적 변형은<br/>" + "우리에게 친숙한 루이까또즈 가방을<br/>이질적이면서도 기이한 디지털적 심미성을 가진<br/>오브제로 변화시킵니다. ";
var isVisible = false;
var listTxt = $('#contentText1');
var workTxt = $('#contentText2');
window.addEventListener('scroll', function () {
  if (listTxt.scrollTop && workTxt.scrollTop && isVisible == false) {
    isVisible = true;
    textProcess('#contentText1', text1);
    textYellow('#contentText2', yangseoungbin);
  }
});
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
} // function floatingHalloween(selector,delay,sizeX, sizeY){
//     gsap.to(selector, random(1, 1),{
//         x: sizeX,
//         y: sizeY,
//         repeat: -1, //무한반복
//         yoyo: true,
//         ease: Power1.easeInOut,
//         delay: random(0, delay)//지연시간
//     })
// }
// 플로팅 이벤트 실행


floatingEvent('.floating1', 3, 10, 10);
floatingEvent('.floating2', 3, -10, 10);
floatingEvent('.floating3', 3, 10, 10);
floatingEvent('.floating4', 3, -10, 10);
floatingEvent('.floating5', 3, 10, 10);
floatingEvent('.floating6', 3, -10, 10);
floatingEvent('.floating7', 3, 10, 10);
floatingEvent('.floating8', 3, -10, 10);
floatingEvent('.floating9', 3, 10, 10);
floatingEvent('.floating10', 3, -10, 10); //floatingHalloween('.halloween',0,1, 15);
// var playBtn = $('.fyl-section1__play');
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

var text1 = "<b>Shape.Shifter 쉐이프 쉬프터는</b> 신화나 소설 속에서<br>형태가 변신하는 능력자를 의미하며,<br>이야기 속에서 물리적인 모양을 변신하는 능력은<br>초인간적인 능력, 신의 개입, 악마의 조작, 마법과 주문<br>같은 초월의 능력으로 가능했습니다.<br>역사적으로 누적된 수많은 설화와 사례들은 고정된<br>모습을 전복하려는 인간의 모양 변신에 대한<br>욕망을 투사합니다.<br>Find Your Light의 세번째 프로젝트 쉐이프 쉬프터는<br>루이까또즈의 헤리티지인 가방이 가지고 있는<br>원형의 한계를 뛰어 넘어 가방에 물리적 변형을 가하며<br>자유롭게 창작하는 것을 목표로 합니다.<br>10인의 아티스트와 함께 패션과 미술의 혼성적<br>경계에서 새로운 차원의 감각을 추구하며 동시대<br>예술의 가능성을 탐험합니다."; // 양승빈

var yangseoungbin = "양승빈은 전통적 공예와 스토리텔링을 활용해<br/>오브제를 창작하는 디자이너입니다.<br/>네덜란드의 디자인 아카데미 에인트호번에서<br/>Public Private과 Contextual Design 과정을 졸업한<br/>이래 에인트호번과 서울을 오가며 활동을 이어가고<br/>" + "있습니다.<br/>전통적인 옻칠 기법을 다양한 물성에 적용하는 리서<br/>치를 기반으로 한 ‘21g’ 시리즈에서 ‘Lacquered<br/>Forms’와 ‘Simulacre’ 시리즈로 점차 작업을 확장하고<br/>있습니다." + "작가의 작품 ‘Simulacre’ 시리즈는<br/>영국 V&A 뮤지엄과 네덜란드 스테델릭 미술관에 영<br/>구 소장 중입니다. 최근에는 작가 자신의 스토리텔링<br/>을 기반으로 고고학적 허구를 오브젝트에 결합한 작<br/>업 ‘Requiem’을 진행 중입니다.<br/><br/>" + "양승빈은 디지털 이미지가 전송되고 복제되는<br/>과정에서 이미지가 기존의 인식과 다른 낯선 모습으<br/>로 열화되는 디지털 변형 현상에 주목했습니다.<br/> " + "<span>Deconstructed</span> <span>Icons</span>는 루이까또즈 제품을 찍은<br/>2D 이미지를 다시 3D 디지털 이미지로 치환하고<br/>디지털 상에서 ‘조각내기’와 ‘붙이기’를 반복해<br/>해체-변형-재조합을 시도한 결과입니다.<br/>관습적인 맥락에서 대상을 분리한 시각적 변형은<br/>" + "우리에게 친숙한 루이까또즈 가방을<br/>이질적이면서도 기이한 디지털적 심미성을 가진<br/>오브제로 변화시킵니다. "; // 최수진

var choisujin = "최수진은 여러 종류의 광물을 이용해 사물의 존재<br>양상을 재현하고 연출합니다.<br>작가의 관점으로 번역되어 현실에 재구축되는<br>덩어리들은 물질과 작품의 간극을 넘나들며<br>" + "실재에 대한 열망을 드러냅니다.<br>때로는 너무 많은 사물에 권태와 사랑을 동시에<br>느끼며 2022년 현재 서울에 위치한 작업실 물질세계<br>에서 작품활동을 이어가고 있습니다.<br><br>" + "최수진의 <span>Objects</span> <span>of</span> <span>Lumps</span>는 전형적인 가방의<br>형상을 유연하고 꾸덕한 물질로 치환했습니다.<br>가방의 몸통은 가로와 세로 방향으로<br>확장되며 변형되고, 은색의 구슬로 " + "변환된 체인은 가<br>방에서 떨어져 나와 간신히 몸통에 걸쳐쳤습니다.<br>여분의 물질들은 덩어리가 되어 주변에 흩어졌습니다.<br>검고 꾸덕한 조각이 되어버린 가방들" + "은 표면의<br>금속 부자재의 흔적만이 남아 그들이 가방이었음을<br>간신히 말해줍니다.<br>각각의 덩어리가 하나로 모여 있는 모습은 어느 조각<br>공원의 전경처럼 공간에 묵직" + "하게 존재합니다. "; // 연진영

var yeonjinyoung = "연진영의 작업은 산업용 기자재나 폐기물을 활용해<br>가구 디자인이라는 방법론을 우회해 조각으로 귀결<br>됩니다. 재고로 남은 패딩, 산업용 앵글, 덕트처럼<br>" + "다양한 재료들을 활용해 통상적으로 재료가<br>수행하는 역할을 배제하고 재료가 가진 물성을<br>재해석해 새로운 가치를 부여하는 작업을 합니다.<br>" + "이 과정에서 새로운 시도와 고유한 물성의 차이가<br>만들어 내는 모호하고 불안정한 다중의 경계들을<br>미적으로 형상화하는 데 의미를 둡니다.<br><br>" + "연진영은 재고로 남은 구스 다운 쟈켓, 망가진 농구공,<br>변형된 알루미늄 파이프 등 기존 사물이 가진 물성을<br>변주해 가방의 형태를 가진 새로운 오브제를 창조했<br>습니다.<br>" + "<span>Padded Bag</span>은 시제품, 사소한 결함, 과잉생산으로 폐<br>기만을 남겨준 구스 다운 쟈켓에 기능을 부여해 사물<br>의 지속가능성에 대해 이야기합니다.<br>" + "<span>Basketball Bag</span>은 스포츠 오브제인 농구공의 형태를<br>차용해 역동성을 가방에 부여하고 반투명한 소재의<br>적용을 통해 도발적이고 호기심을 자아냅니다.<br>" + "<span>Pipe Bag</span>은 변형이 쉬워 외부의 힘에 의해 망가지고<br>쉽게 붕괴되는 알루미늄 파이프로 완성했습니다.<br>" + "구부러진 파이프는 보편적인 형태와는 다른 낯설음<br>을 제공하고 사물의 새로운 면을 보게 합니다."; // 강재원

var kangjaewon = "강재원은 미래의 조각에 관심을 가지고 3D 모델링 소<br>프트웨어를 활용해 조각을 창작합니다. 디지털 환경<br>과 소프트웨어의 기능에서 발생하는 감각을 토대로<br>자신만의 조각을 만들어 왔습니다. 완성된 조각은 디<br>지털 이미지, 영상, 3D프린팅, 알루미늄, 스테인레스,<br>인플레이터블 등 다양한 매체로 변주됩니다.<br><br>" + "강재원은 3D 모델링 프로그램 에서 편의를 위한 기능<br>이 역으로 현실의 조각에 영향을 미치는 점에 주목했<br>습니다. 전통적인 조각 방식과 달리 작가는 화면 너머<br>로 다양한 각도로 물체를 돌려가며 <b>Move</b>당기고<br><b>Smooth</b>로 밀며 형태를 만들어나갑니다.<br>" + "<span>Deformation 20, 21, 22</span>는 가방이 변하는 순간의 가<br>방이 변하는 순간의 모습을 상상하며 운동감과 속도<br>감을 지닌 조각으로 창조했습니다. 3개의 실린더 입<br>" + "체 기둥을 3D 프로그램에서 제공하는 현실의 물리법<br>칙을 모사한 기능들(Deformation: Skew, Twist,<br>Bend, Gravity 등)을 적용해 변주하는 방식을 추가했<br>습니다. 조절바(control panel)의 수치로 형태를 조절<br>" + "하고 ctrl+z와 ctrt+shift+z를 적용해 과거와 현재를<br>오가며 작가가 원하는 조형성을 갖춘 형태를 선택합<br>니다. 순서와 강도의 조합에 따라 전혀 다른 결과가<br>도출되기에 신중하게 블렌딩하는 과정을 거쳐 완성<br>됩니다. 완성된 조각들은 3D 파일로 존재하며 조각들<br>주변에 환경과 조명을 설정한 렌더 이미지와 영상, 크<br>롬 도금한 3D 프린팅, 주조된 금속, 인플레이터블<br>" + "(Inflatable) 등 다양한 크기와 소재, 매체를 가로지르<br>며 미래의 조각으로 변화합니다.";
var isVisible = false;
var listTxt = $('#contentText1');
var workTxt = $('#contentText2');
var workTxt2 = $('#contentText3');
var workTxt3 = $('#contentText4');
var workTxt3 = $('#contentText5');
window.addEventListener('scroll', function () {
  if (listTxt.scrollTop && workTxt.scrollTop && isVisible == false) {
    isVisible = true;
    textProcess('#contentText1', text1);
    textYellow('#contentText2', yangseoungbin);
    textYellow('#contentText3', choisujin);
    textYellow('#contentText4', yeonjinyoung);
    textYellow('#contentText5', kangjaewon);
  }
});
"use strict";

//youtube
var idAry = [],
    urlAry = [],
    objAry = [];
$(".content-video__youtube").each(function (i) {
  $(this).attr("id", "player" + i);
  idAry.push("player" + i);
  urlAry.push($(this).data("url"));
});
var videoNum = 0;
var videoPlay = "false";
var videoLoad = false;

function onYouTubeIframeAPIReady() {
  for (var i = 0; i < $(".content-video__youtube").length; i++) {
    var player;
    var playerId = idAry[i];
    player = new YT.Player(playerId, {
      videoId: urlAry[i],
      width: "100%",
      height: "100%",
      playerVars: {
        'controls': 1,
        'rel': 0,
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    objAry.push(player);
  }
}

function onPlayerStateChange(event) {
  if (event.data === 0) {
    $('.content-video__intro').removeClass('is-hide');
  }
}

function onPlayerReady(event) {
  videoLoad = true;
}

$('.js-play-btn').on('click', function () {
  if (videoLoad == false) {
    alert("아직 동영상이 로드되지 않았습니다.");
  } else {
    var areaElem = $(this);
    var areaNum = areaElem.attr('class').replace(/[^0-9]/g, '') - 1;
    areaElem.find('.content-video__intro').addClass('is-hide');
    videoNum = areaNum;
    objAry[videoNum].playVideo();
  }
});
$('.event-section__link').on('click', function (e) {
  e.preventDefault();
  stopVideo();
  var ytb_num = $(this).data('ytbNum');
  videoNum = ytb_num;
  console.log(videoNum);
  var menuNum = $(this).index();
  $(this).siblings().removeClass('is-active');
  $(this).parents('.event-section').find('.content-video__area').removeClass('is-active').eq(menuNum).addClass('is-active');
  $(this).parents('.event-section').find('.event-section__bg').eq(menuNum).addClass('is-active');
});

function stopVideo() {
  objAry[videoNum].stopVideo();
  $('#' + idAry[videoNum] + '').removeClass('is-active');
  $('.content-video__intro').removeClass('is-hide');
}

var typedPlay = "false";
var fixedPlay;
var sectionH;
$(window).on('load resize', function () {
  var boxAry = []; // var gnbH = $($gnb).outerHeight();

  $(".event-section").each(function () {
    var boxH = $(this).offset().top;
    boxAry.push(boxH);
  });

  (function () {
    sectionH = $('.event-section').outerHeight();
    var menuElem = document.querySelector('.event-menu');
    var typedElem = document.querySelector('.js-type-line');
    var topH = $('.event-top').outerHeight() + sectionH * 3;
    var currentY;

    function showScroll() {
      typedY = parseInt(typedElem.getBoundingClientRect().top);
      currentY = window.pageYOffset;
      fixedPlay = currentY < topH ? false : true;

      if (currentY > 0) {
        menuElem.classList.add('is-active');
      } // if (typedY < 0){
      //     if (typedPlay == "false"){
      //         //typed
      //         typedPlay = "true";
      //         var typed = new Typed('#typed', {
      //             stringsElement: '#typed-strings',
      //             typeSpeed: 100,
      //             backSpeed: 0,
      //             startDelay: 0,
      //             loop: false,
      //             loopCount: Infinity,
      //             onStringTyped: function () {
      //                 setTimeout(function () {
      //                     $('.typed-cursor').animate({ 'opacity': '0' }, 1400).removeClass('is-focus');
      //                 }, 1000)
      //             }
      //         });
      //         $('.typed-cursor').addClass('is-focus');
      //     }
      // }

    }

    ;
    window.addEventListener('scroll', function () {
      showScroll();
    });
  })();

  $(".js-hash").on('click', function (e) {
    e.preventDefault();
    var hashNum = $(this).parents('.event-menu__item').index();
    console.log($('.event-section').eq(hashNum + 1).offset().top);
    $('html,body').animate({
      scrollTop: $('.event-section').eq(hashNum + 1).offset().top - 10
    }, 500);
  });
});
$('.event-top__btn').on('click', function (e) {
  e.preventDefault();

  if ($("#find-video").prop('muted')) {
    $("#find-video").prop('muted', false);
    $(this).addClass('is-active');
  } else {
    $("#find-video").prop('muted', true);
    $(this).removeClass('is-active');
  }
});
"use strict";

//youtube
var idAry = [],
    urlAry = [],
    objAry = [];
$(".project-video__youtube").each(function (i) {
  $(this).attr("id", "player" + i);
  idAry.push("player" + i);
  urlAry.push($(this).data("url"));
});
var videoNum = 0;
var videoPlay = "false";
var videoLoad = false;

function onYouTubeIframeAPIReady() {
  for (var i = 0; i < $(".project-video__youtube").length; i++) {
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
    $('.project-video__intro').removeClass('is-hide');
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
    areaElem.find('.project-video__intro').addClass('is-hide');
    videoNum = areaNum;
    objAry[videoNum].playVideo();
  }
});
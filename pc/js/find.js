"use strict";

var findSlide = new Swiper('.js-find2-slide', {
  loop: true,
  speed: 500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.find-slide__dot',
    clickable: true
  }
});
findSlide.on('slideChange', function () {
  var num = findSlide.realIndex + 1;
  var findStoreElem = document.querySelectorAll('.find-store__item');
  Array.prototype.forEach.call(findStoreElem, function (findElem) {
    findElem.classList.remove('is-active');
  });
  document.querySelector(".find-store__item[data-num='" + num + "']").classList.add('is-active');
});
window.addEventListener('DOMContentLoaded', function () {
  //해쉬값으로 이동
  var hash = window.location.hash.substr(1);
  var location = document.querySelector(".js-target-move").offsetTop;
  var headerH = 100; //gnb높이

  var scrollMove = location - headerH;

  if (hash != "") {
    window.scrollTo({
      top: scrollMove,
      left: 0,
      behavior: 'smooth'
    });
  } // const topPadding = 86;
  // const winH = window.innerHeight;
  // const poster = document.querySelector('#js-poster');
  // const posterH = winH - topPadding;
  // poster.style.height = `${posterH}px`


  function showScroll() {
    var scrollMotion = new Array();
    var scrollMotionAll = document.querySelectorAll('.js-scroll-motion');
    var winH = window.innerHeight;
    Array.prototype.forEach.call(scrollMotionAll, function (scrollMotionElem, i) {
      scrollMotion.push(scrollMotionElem.getBoundingClientRect().top);

      if (scrollMotion[i] < winH * 0.8) {
        scrollMotionAll[i].classList.add('is-active');
      }
    });
  }

  ;

  function showLoad() {
    var loadMotionAll = document.querySelectorAll('.js-load-motion');
    Array.prototype.forEach.call(loadMotionAll, function (loadMotion) {
      loadMotion.classList.add('is-active');
    });
  }

  window.addEventListener('scroll', function () {
    showScroll();
  });
  window.addEventListener('load', function () {
    showLoad();
  });
  var soundBtn = document.querySelector('.js-sound-btn');
  var video = document.querySelector('.collabo-wrap__video');
  soundBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var videoMuted = video.muted;

    if (videoMuted) {
      video.muted = false;
      soundBtn.classList.add('is-active');
    } else {
      video.muted = true;
      soundBtn.classList.remove('is-active');
    }
  });
});
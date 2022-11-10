"use strict";

/*lalawallet */
//상품 슬라이드
if ($('.event-slide__container').length > 0) {
  var swiper = new Swiper(".event-slide__container", {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    loop: true,
    touchRatio: 0 //드래그 금지

  });
} // value값 확인


var rangeBar = $('.event-range__bar');

function getRangeValue(e) {
  var value = $(e).val();
  rangeBar.attr('value', value);
  return false;
} // 특정슬라이드 이동


function changeSlideColor() {
  getRangeValue(rangeBar);

  if (this.value > 0 && this.value <= 25) {
    // Butter Yellow
    swiper.slideTo(1, 0, false);
  } else if (this.value > 25 && this.value <= 50) {
    // Strawberry
    swiper.slideTo(2, 0, false);
  } else if (this.value > 50 && this.value <= 75) {
    // Lavender
    swiper.slideTo(3, 0, false);
  } else if (this.value > 75 && this.value <= 100) {
    // Powder Blue
    swiper.slideTo(4, 0, false);
  } else {
    return false;
  }
}

rangeBar.bind('input', changeSlideColor);
rangeBar.bind('change', getRangeValue(rangeBar));
/*may promotion*/
//best 배너슬라이드

if ($('.promotion-thumb').length > 0 && $('.promotion-thumb__item').length > 1) {
  var promotionSlide = new Swiper('.promotion-thumb__container', {
    observer: true,
    observeParents: true,
    watchOverflow: true,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".promotion-thumb__pagination",
      type: "fraction"
    },
    on: {
      init: function init() {
        var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
        var cate = slide.data("slide");
        var slide = $('[data-link=' + cate + ']').parent('.promotion-recommend__tab--item').addClass('is-current').siblings('.promotion-recommend__tab--item').removeClass('is-current');
        $('.promotion-thumb__progressbar').removeClass("animate");
        $('.promotion-thumb__progressbra').removeClass("active");
        $('.promotion-thumb__progressbar').eq(0).addClass("animate");
        $('.promotion-thumb__progressbar').eq(0).addClass("active");
      },
      beforeTransitionStart: function beforeTransitionStart() {
        var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
        var cate = slide.data("slide");
        var slide = $('[data-link=' + cate + ']').parent('.promotion-recommend__tab--item').addClass('is-current').siblings('.promotion-recommend__tab--item').removeClass('is-current');
      },
      slideChangeTransitionStart: function slideChangeTransitionStart() {
        $('.promotion-thumb__progressbar').removeClass("animate");
        $('.promotion-thumb__progressbar').removeClass("active");
        $('.promotion-thumb__progressbar').eq(0).addClass("active");
      },
      slideChangeTransitionEnd: function slideChangeTransitionEnd() {
        $('.promotion-thumb__progressbar').eq(0).addClass("animate");
      }
    }
  });
  $('.js-slide-tab').on('click', function () {
    var link = $(this).data("link");
    var slide = $('[data-slide=' + link + ']').index();
    var num = slide;
    promotionSlide.slideTo(num);
  });
}

if ($('.promotion-view__video--src').length > 0) {
  var video = document.querySelector('.promotion-view__video--src');
  var videoMuted = video.muted;

  if (videoMuted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
} // 2022 9월 프로모션
// function openCouponPopup(e){
//     e.preventDefault();
//     $('.thanksgiving-dim').addClass('is-show');
//     $('.thanksgiving-popup').addClass('is-show');
// }
// $('.js-coupon-open').on('click', openCouponPopup);
//
// function openCloseButton(e){
//     e.preventDefault();
//     $('.thanksgiving-pop__button').addClass('is-colorChange');
//     $('.thanksgiving-pop__close').addClass('is-show');
//     $('.thanksgiving-pop__link').text('쿠폰 발급 완료!');
// }
// $('.js-coupon-download').on('click', openCloseButton);
//
// function closePopup(e){ // 팝업닫기
//     $('.thanksgiving-dim').removeClass('is-show');
//     $('.thanksgiving-popup').removeClass('is-show');
// }
// $('.js-popup-close').on('click', closePopup);
// 2022.11 minicaviar


var mouse = {
  x: 0,
  y: 0
};
var showcasePos = 0;
var showcaseCount = 20;
var cardGap = 180;
var cardWidth = 380;
var padding = 0;
var touch = false;

function listeners() {
  var loadCount = 0;
  $(".showcase-cards__img").one('load', function () {
    loadCount++;
  }).each(function () {
    if (this.complete) {
      $(this).trigger('load');
    }
  });
  $(".card-wrap").mousemove(function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
}

function showcaseOffset() {
  if (!touch) {
    $(".showcase-cards .showcase-cards__box").each(function (i) {
      var index = showcaseCount - 1 - i;
      var offset = cardGap * index;
      $(this).css({
        'left': offset + 'px'
      });
    });
  }
}

function cardAnimation() {
  requestAnimationFrame(cardAnimation);

  if (!touch) {
    var position = mouse.x / window.innerWidth * 1.4 - 0.2;

    if (position > 1) {
      position = 1;
    }

    if (position < 0) {
      position = 0;
    }

    var index = Math.round(position * (showcaseCount - 1));
    $(".showcase-cards .showcase-cards__box").each(function (i) {
      if (showcaseCount - 1 - i < index) {
        $(this).addClass('push');
      } else {
        $(this).removeClass('push');
      }
    });
    var edge = 0;
    var g = (cardGap * (showcaseCount - 1) + cardWidth - window.innerWidth + padding * 2 + edge * 2) / (showcaseCount - 1);
    var offset = edge - index * g;
    showcasePos += (offset - showcasePos) / 10;
    $(".showcase-cards").css({
      'transform': 'translate(' + showcasePos + 'px, 0px)'
    });
  } else {
    var position = $(".showcase").scrollLeft() / ($(".showcase-cards").outerWidth() - window.innerWidth) * 1 - 0;

    if (position > 1) {
      position = 1;
    }

    if (position < 0) {
      position = 0;
    }

    var index = Math.round(position * (showcaseCount - 1));
    $(".showcase-cards .showcase-cards__box").each(function (i) {
      if (showcaseCount - 1 - i < index) {
        $(this).addClass('push');
      } else {
        $(this).removeClass('push');
      }
    });
  }
}

$(document).ready(function () {
  if (showcaseCount > $(".showcase-cards__box").length) {
    showcaseCount = $(".showcase-cards__box").length;
  }

  listeners();
  showcaseOffset();
  requestAnimationFrame(cardAnimation);
});
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
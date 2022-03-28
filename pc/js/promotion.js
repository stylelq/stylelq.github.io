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
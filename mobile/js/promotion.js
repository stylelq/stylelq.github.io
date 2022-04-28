"use strict";

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
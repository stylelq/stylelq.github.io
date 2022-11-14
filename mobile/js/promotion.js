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
} // 2022 9월 프로모션
// function openCouponPopup(e){    // 쿠폰열기
//     e.preventDefault();
//     $('.thanksgiving-dim').addClass('is-show');
//     $('.thanksgiving-popup').addClass('is-show');
// }
// $('.js-coupon-open').on('click', openCouponPopup);
//
// function openCloseButton(e){    // 닫기버튼 열기
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
// 2022.11 minicavir


var mouse = {
  x: 0,
  y: 0
};
var showcasePos = 0;
var showcaseCount = 20;
var cardGap = 100;
var cardWidth = 240;
var padding = 20;
var touch = false;
var mobile = false;
var pageReady = true;
var current = '';
var root = '';

function listeners() {
  var loadCount = 0;
  $(".showcase-cards .card img").one('load', function () {
    loadCount++;
    console.log(loadCount);

    if (loadCount == $(".showcase-cards .card").length) {
      pageHandler('showcase');
    }
  }).each(function () {
    if (this.complete) {
      $(this).trigger('load');
    }
  });
  $(".card--new").click(function () {
    if (pageReady) {
      pageReady = false;

      if ($(".card--wrapper .card").length > 0) {
        $(".card--options").removeClass('active');
        $(".button--main").removeClass('active');
        clearCard();
      }
    }
  });
  $("body").mousemove(function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
}

function showcaseOffset() {
  if (!touch) {
    $(".showcase-cards .card").each(function (i) {
      var index = showcaseCount - 1 - i;
      var offset = cardGap * index;
      $(this).css({
        'left': offset + 'px'
      });
    });
  }
}

function pageHandler(dest) {
  if (dest != current) {
    pageReady = false;
    current = dest;

    if (dest == 'showcase') {
      $(".showcase").addClass('active');
      setTimeout(function () {
        pageReady = true;
      }, 500);
    }
  }
}

function textareaHeight(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
}

function clearCard() {
  $(".button--submit").removeClass('active');
  var card = $(".card--wrapper .card");
  card.addClass('remove');
  setTimeout(function () {
    card.remove();
  }, 1000);
}

function anim() {
  requestAnimationFrame(anim);

  if (!touch) {
    var pos = mouse.x / window.innerWidth * 1.4 - 0.2;

    if (pos > 1) {
      pos = 1;
    }

    if (pos < 0) {
      pos = 0;
    }

    var index = Math.round(pos * (showcaseCount - 1));
    $(".showcase-cards .card").each(function (i) {
      if (showcaseCount - 1 - i < index) {
        $(this).addClass('push');
      } else {
        $(this).removeClass('push');
      }
    });
    var edge = 100;

    if (mobile) {
      edge = 30;
    }

    var g = (cardGap * (showcaseCount - 1) + cardWidth - window.innerWidth + padding * 2 + edge * 2) / (showcaseCount - 1);
    var offset = edge - index * g;
    showcasePos += (offset - showcasePos) / 10;
    $(".showcase-cards").css({
      'transform': 'translate(' + showcasePos + 'px, 0px)'
    });
  } else {
    var pos = $(".showcase").scrollLeft() / ($(".showcase-cards").outerWidth() - window.innerWidth) * 1 - 0;

    if (pos > 1) {
      pos = 1;
    }

    if (pos < 0) {
      pos = 0;
    }

    var index = Math.round(pos * (showcaseCount - 1));
    $(".showcase-cards .card").each(function (i) {
      if (showcaseCount - 1 - i < index) {
        $(this).addClass('push');
      } else {
        $(this).removeClass('push');
      }
    });
  }
}

$(document).ready(function () {
  if ("ontouchstart" in document.documentElement) {
    touch = true;
    $("body").addClass('touch');
  }

  if (showcaseCount > $(".showcase-cards .card").length) {
    showcaseCount = $(".showcase-cards .card").length;
  }

  listeners();
  showcaseOffset();
  requestAnimationFrame(anim);
});
"use strict";

jQuery(function () {
  //스크롤 픽스
  if ($('.fyl-menu').length > 0) {
    var hasScrolled = function hasScrolled() {
      var thisSt = $(window).scrollTop();
      if (Math.abs(lastScrollTop - thisSt) <= delta) return;

      if (thisSt > lastScrollTop && thisSt > navbarHeight) {
        $('.fyl-menu').addClass('is-active');
        $('.cart-fix').addClass('is-up');
        $('.footer').addClass('bottom-fix');
      } else {
        if (thisSt + $(window).height() < $(document).height()) {
          $('.fyl-menu').removeClass('is-active');
          $('.cart-fix').removeClass('is-up');
          $('.footer').addClass('bottom-fix');
        }
      }

      lastScrollTop = thisSt;
    };

    // 프로젝트 하단 픽스
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.header').outerHeight();
    $(window).scroll(function (event) {
      didScroll = true;
    });
    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);
    $('.cart-fix').addClass('is-project');
  } //클릭 스크롤


  function projectScroll() {
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 340);
    return false;
  }

  $(document).on('click', '.js-hash', projectScroll);
});
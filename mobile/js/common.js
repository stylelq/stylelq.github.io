"use strict";

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

jQuery(function () {
  $(document).ready(function () {
    /*
    //Gnb
    */
    //Gnb 메뉴햄버거버튼 클릭시 노출/비노출 관련 액션
    function GnbMenu() {
      if ($('.type-1depth').hasClass('is-active')) {
        $('.gnb').removeClass('is-active');
        $('.dim').removeClass('is-active');
        $('.header').removeClass('is-bg-view');
        $('html').removeClass('is-hidden');

        if ($(window).scrollTop() == 0) {
          $('.header').removeClass('is-active');
        }
      } else {
        $('.type-1depth').addClass('is-active');
        $('.dim').addClass('is-active');
        $('.header').addClass('is-bg-view');
        $('html').addClass('is-hidden');

        if ($(window).scrollTop() == 0) {
          $('.header').addClass('is-active');
        }
      }

      return false;
    }

    $(document).on('click', '.js-menu-btn, header .dim', GnbMenu); //Gnb 메뉴 클릭시 공통액션

    $('.gnb-body__link').off('click').on('click', function (e) {
      e.preventDefault();
      var dataPage = $(this).attr('data-page'); //3depth open/close

      if (dataPage == "3depth") {
        e.preventDefault();
        var gnbItem = $(this).parents('.gnb-body__item');

        if (gnbItem.hasClass('is-active')) {
          gnbItem.removeClass('is-active');
          gnbItem.find('.gnb-3depth').removeClass('is-active');
        } else {
          gnbItem.siblings().removeClass('is-active');
          gnbItem.siblings().find('.gnb-3depth').removeClass('is-active');
          gnbItem.addClass('is-active');
          gnbItem.find('.gnb-3depth').addClass('is-active');
        }
      } else if (dataPage != "none") {
        e.preventDefault();
        $("." + dataPage).addClass('is-active');
        $("." + dataPage).find('.gnb-body__item').eq(0).addClass('is-active');
        $("." + dataPage).find('.gnb-3depth').eq(0).addClass('is-active');
      } else if (dataPage == "none") {
        e.preventDefault();
        var el = $(this).attr('href');
        location.href = el;
      }
    }); //Gnb 2뎁스 닫기

    $('.js-gnb-back').off('click').on('click', function (e) {
      e.preventDefault();
      $('.gnb.type-2depth').removeClass('is-active');
      $('.gnb-body__item, .gnb-3depth').removeClass('is-active');
    });
    /*
    //Header Search
    */
    //헤더 서치박스 열기

    $('.js-search-open').off('click').on('click', function (e) {
      e.preventDefault();
      $('.search').addClass('is-active');
      $('html').addClass('is-hidden');
    }); //헤더 서치박스 닫기

    $('.js-search-close').off('click').on('click', function (e) {
      e.preventDefault();
      $('.search').removeClass('is-active');
      $('html').removeClass('is-hidden');
    }); //기본탭

    function basicTab() {
      var idx = $(this).parent('li').index();
      $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
      $(this).closest('.js-tab-wrap').find('.js-change-cont').eq(idx).addClass('is-current').siblings('.js-change-cont').removeClass('is-current');
      return false;
    }

    $(document).on('click', '.js-tab-change', basicTab);
    /*
    //Join(회원가입, 로그인)
    */
    //전체 체크박스 체크

    function allCheck() {
      var dataName = $(this).attr('name');
      var allCheckInput = $(this);
      $(allCheckInput).change(function () {
        if ($(allCheckInput).is(":checked") == true) {
          $('[name="' + dataName + '"]:not(:disabled)').prop("checked", true);
          $(this).parent('li').addClass('is-active');
        } else {
          $('[name="' + dataName + '"]:not(:disabled)').prop("checked", false);
        }
      });
    }

    ;
    $(document).on('click', '.js-check-all', allCheck); //통합 체크시 관련 체크박스 제어

    function allCheckItem() {
      var label = $(this).prev('[type=checkbox]');
      var dataName = label.attr('name');
      var subInput = $('[name="' + dataName + '"]:not(:disabled):not(.js-check-all)');
      $(label).change(function () {
        if (subInput.length > subInput.filter(":checked").length) {
          $('[name="' + dataName + '"].js-check-all').prop("checked", false);
        } else {
          $('[name="' + dataName + '"].js-check-all').prop("checked", true);
        }
      });
    }

    ;
    $(document).on('click', '.terms__depth2-item label', allCheckItem);
    /*
    //Product(리스트페이지)
    */
    //Lnb 2뎁스 메뉴 오픈

    function depthMenu() {
      var depthHead = $('.js-lnb-btn').closest('.lnb');

      if ($(depthHead).hasClass('is-open')) {
        $(depthHead).removeClass('is-open');
        $('html').removeClass('is-hidden');
      } else {
        $(depthHead).addClass('is-open');
        $('html').addClass('is-hidden');
      }

      return false;
    }

    $(document).on('click', '.js-lnb-btn', depthMenu); //Lnb 2뎁스 메뉴 닫기

    function depthMenuClose() {
      $('.lnb').removeClass('is-open');
      $('html').removeClass('is-hidden');
    }

    $(document).on('click', '.js-lnb-close', depthMenuClose); //상품리스트 타입 변경 버튼제어

    function productTypeChage() {
      if ($(this).hasClass('filter__link--list')) {
        $(this).removeClass('filter__link--list');
        $(this).addClass('filter__link--post');
        $('.product-post').removeClass('product-post--post');
        $('.product-post').addClass('product-post--list');
      } else {
        $(this).removeClass('filter__link--post');
        $(this).addClass('filter__link--list');
        $('.product-post').removeClass('product-post--list');
        $('.product-post').addClass('product-post--post');
      }
    }

    $(document).on('click', '.js-layout-chage', productTypeChage); //우측 하단 카트(cart-fix)

    if ($('.cart-fix').length > 0) {
      $(window).scroll(function () {
        var height = $(document).scrollTop();
        var headHeight = $('.header').scrollTop();

        if (height > headHeight) {
          $('.cart-fix').addClass('is-view');
        } else {
          $('.cart-fix').removeClass('is-view');
        }
      });
    } //스크롤탑 버튼


    function scrollTopBtn() {
      $('html, body').animate({
        scrollTop: '0'
      }, 340);
    }

    $(document).on('click', '.js-scrollTop', scrollTopBtn);
    /*
    //Product(상세페이지)
    */
    //상품상세 상단 배너슬라이드

    if ($('.detail-thumb').length > 0) {
      var _Swiper;

      var detailThumbSlide = new Swiper('.detail-thumb__container', (_Swiper = {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1
      }, _defineProperty(_Swiper, "slidesPerView", 1), _defineProperty(_Swiper, "pagination", {
        el: ".detail-thumb__pagination",
        type: "fraction"
      }), _defineProperty(_Swiper, "navigation", {
        nextEl: ".detail-thumb--next",
        prevEl: ".detail-thumb--prev"
      }), _Swiper));
    } //상품상세 쉐어 버튼 열기/닫기


    function detailShareOpen() {
      if ($('.detail-fix__share').hasClass('is-open')) {
        $('.detail-fix__share').removeClass('is-open');
      } else {
        $('.detail-fix__share').addClass('is-open');
      }
    }

    $(document).on('click', '.js-share-btn', detailShareOpen);
    /* 2021-12-29 wn.kim : jsp에서 제어
            //수량 카운트하기
            function quantityPlus(e){
                e.preventDefault();
                var stat = $('.quantity__text--current').val();
                var num = parseInt(stat,10);
                num++;
                 $('.quantity__text--current').val(num);
            }
            $(document).on('click', '.js-plus', quantityPlus);
             function quantityMinus(e){
                e.preventDefault();
                var stat = $('.quantity__text--current').val();
                var num = parseInt(stat,10);
                num--;
                if(num<=0){
                    alert('구매 최소수량은 1개입니다.');
                    num =1;
                }
                $('.quantity__text--current').val(num);
            }
            $(document).on('click', '.js-minus', quantityMinus);
    */
    //제품 서브메뉴 스크롤 픽시드

    if ($('.detail-tab').length > 0) {
      $(window).scroll(function () {
        var height = $(document).scrollTop();
        var topContHeight = $('.product-option').height();
        var mainOuterHeight = $('.site-main').outerHeight(true);
        var mainHeight = $('.site-main').height();
        var headerHeight = $('.header').height();
        var marginHeight = mainOuterHeight - mainHeight;
        var totalHeight = topContHeight + marginHeight + headerHeight;
        var upTotalHeight = topContHeight + marginHeight;

        if ($('.header').hasClass('type-bg')) {
          if (height > totalHeight) {
            $('.detail-tab').addClass('is-fixed');
            $('.header').addClass('is-bg-white');
          } else {
            $('.detail-tab').removeClass('is-fixed');
            $('.header').removeClass('is-bg-white');
          }
        } else {
          if (height > upTotalHeight) {
            $('.detail-tab').addClass('is-fixed');
            $('.header').addClass('is-bg-white');
          } else {
            $('.detail-tab').removeClass('is-fixed');
            $('.header').removeClass('is-bg-white');
          }
        }
      });
    } //제품상세 탭


    function detailTab() {
      var topContHeight = $('.product-option').height();
      var mainOuterHeight = $('.site-main').outerHeight(true);
      var mainHeight = $('.site-main').height();
      var marginHeight = mainOuterHeight - mainHeight;
      var totalHeight = topContHeight + marginHeight;
      var idx = $(this).parent('li').index();
      $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
      $('.detail-tab__info').eq(idx).addClass('is-current').siblings('.detail-tab__info').removeClass('is-current');
      $('html, body').animate({
        scrollTop: totalHeight
      }, 340);
    }

    $(document).on('click', '.js-tab-link', detailTab); //제품 상세 하단 픽시드 결제 박스

    if ($('.fix-button , .cart-fix__button, .inquiry-fix').length > 0) {
      $(window).scroll(function () {
        var height = $(document).scrollTop();
        var headHeight = $('.header').scrollTop();

        if (height > headHeight) {
          $('.fix-button').addClass('is-on');
        } else {
          $('.fix-button').removeClass('is-on');
        }
      });
      $('.cart-fix').addClass('is-up');
      $('.footer').addClass('bottom-fix');
    } //연관제품 슬라이드
    // 프로모션 - 스크롤 시 패럴랙스 효과


    if ($('.parallax-wrap').length > 0) {
      $(window).scroll(function () {
        var scroll = $(this).scrollTop(); //var pinkScroll = -scroll/3

        var yellowScroll = -scroll / 1; //$('.parallax-01').css({'transform' : 'matrix(0,'+ scroll +'px,0)'});
        //$('.parallax-01').css({'transform' : 'matrix(2,1,-1,1.5,30,-45)'});

        $('.parallax-01').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
        $('.parallax-02').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
        $('.parallax-03').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
        $('.parallax-04').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
        $('.parallax-05').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
        $('.parallax-06').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
        $('.parallax-07').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
        $('.parallax-08').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
        $('.parallax-09').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
        $('.parallax-10').css({
          'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
        });
      });
    } // 말풍선 클릭 시 이벤트


    function bubbleEvent() {
      var bubbleItem = $(this);
      setTimeout(function () {
        bubbleItem.fadeOut(500);
        bubbleItem.fadeIn(3000);
      }, 300);
    }

    $(document).on('click', '.js-click-bubble', bubbleEvent); //말풍선 클릭이벤트

    if ($('.recommended-slide').length > 0) {
      var recommendeSlide = new Swiper('.recommended-slide__container', {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        pagination: {
          el: ".recommended-slide__pagination",
          type: "fraction"
        }
      });
    } //프로젝트 슬라이드


    if ($('.project-slider').length > 0) {
      var projectSlide = new Swiper('.project-slider__container', {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: ".project-pagination"
        }
      });
    } // 프로젝트 작품별 슬라이드


    if ($('.project-slide').length > 0) {
      var projectSlide2 = new Swiper('.project-slide__container', {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: ".project-slide-pagination"
        }
      });
    } // 장소 슬라이드


    if ($('.project-place-slide').length > 0) {
      var projectSlide2 = new Swiper('.project-place__container', {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: ".project-place-pagination"
        }
      });
    } // 컬렉션 상품슬라이드


    if ($('.collection-slide').length > 0) {
      var collectionSlide = new Swiper('.collection-slide__container', {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 2,
        loop: true,
        navigation: {
          nextEl: ".collecton-next-btn",
          prevEl: ".collecton-prev-btn"
        }
      });
    } // 컬렉션 더보기 슬라이드


    if ($('.collection-more-slide').length > 0) {
      var eventSliderTouch = false;
      var collectionMoreSlide = new Swiper('.collection-more__container', {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        centeredSlides: true,
        rewind: true,
        speed: 8000,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: ".more-next-btn",
          prevEl: ".more-prev-btn"
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        on: {
          init: function init() {
            $('.collection-more__wrapper').css({
              transitionTimingFunction: 'linear'
            });
          },
          touchMove: function touchMove() {
            eventSliderTouch = true;
          },
          touchEnd: function touchEnd() {
            if (eventSliderTouch) {
              eventSliderTouch = false;
              this.params.speed = 500;
              this.params.autoplay.delay = 1000;
            }
          },
          transitionEnd: function transitionEnd() {
            this.params.speed = 8000;
            this.params.autoplay.delay = 0;
          },
          sliderFirstMove: function sliderFirstMove() {
            console.log('dd : ', this.activeIndex);
          }
        }
      });
      /*슬라이드 온클릭 시 자동슬라이드 정지*/

      $(document).on('click', collectionMoreSlide, function () {
        // collectionMoreSlide.autoplay.stop();
        collectionMoreSlide.autoplay.delay = 1000;
        console.log(collectionMoreSlide.autoplay);
      });
    } // 컬렉션 모델슬라이드(상단)


    if ($('.collection-model-slide').length > 0) {
      var collectionModelSlide = new Swiper('.collection-model__container', {
        effect: 'fade',
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.collection-slide-pagination',
          clickable: true
        },
        navigation: {
          nextEl: ".model-next-btn",
          prevEl: ".model-prev-btn"
        }
      });
    } // 컬렉션 모델슬라이드(하단)


    if ($('.collection-model-slideSecond').length > 0) {
      var collectionModelSlideSecond = new Swiper('.collection-model__containerSecond', {
        effect: 'fade',
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.collection-slide-paginationSecond',
          clickable: true
        },
        navigation: {
          nextEl: ".model-next-btn",
          prevEl: ".model-prev-btn"
        }
      });
    } // 프로모션 모델슬라이드(상단)


    if ($('.promotion-model-slide').length > 0) {
      var promotionModelSlide = new Swiper('.promotion-model__container', {
        effect: 'fade',
        observer: true,
        observeParents: true,
        watchOverflow: true,
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        }
      });
    } // 프로모션 모델슬라이드(하단)


    if ($('.promotion-model-slideSecond').length > 0) {
      var promotionModelSlideSecond = new Swiper('.promotion-model__containerSecond', {
        effect: 'fade',
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
          el: '.promotion-slide-paginationSecond',
          clickable: true
        },
        navigation: {
          nextEl: ".model-next-btn",
          prevEl: ".model-prev-btn"
        },
        on: {
          init: function init() {
            $('.model__progressbar').removeClass("animate");
            $('.model__progressbar').removeClass("active");
            $('.model__progressbar').eq(0).addClass("animate");
            $('.model__progressbar').eq(0).addClass("active");
          },
          slideChangeTransitionStart: function slideChangeTransitionStart() {
            $('.model__progressbar').removeClass("animate");
            $('.model__progressbar').removeClass("active");
            $('.model__progressbar').eq(0).addClass("active");
          },
          slideChangeTransitionEnd: function slideChangeTransitionEnd() {
            $('.model__progressbar').eq(0).addClass("animate");
          }
        }
      });
    } // 컬렉션,프로모션 비디오 재생버튼 액션추가


    if ($('.promotion-model-pochebag').length > 0) {
      var promotionModelSlideSecond = new Swiper('.promotion-model__pochebag', {
        //effect: 'fade',
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
          el: '.pochebag-slide-pagination',
          clickable: true
        },
        navigation: {
          nextEl: ".pochebag-next-btn",
          prevEl: ".pochebag-prev-btn"
        }
      });
    } // 프로모션 - 핸드폰가방 기획전


    if ($('.promotion-view__visual--play').length > 0) {
      var videoPlay = function videoPlay(e) {
        e.preventDefault();
        videoElem.play();
        videoThum.classList.add('is-hide');
      };

      var videoPause = function videoPause() {
        videoElem.pause();
        videoThum.classList.remove('is-hide');
        videoThum.classList.add('is-nobg');
      };

      var playBtn = document.querySelector('.promotion-view__visual--btn');
      var videoElem = document.querySelector('.promotion-view__videoNew');
      var videoThum = document.querySelector('.promotion-view__visual--thumb');
      playBtn.addEventListener('click', videoPlay);
      videoElem.addEventListener('click', videoPause);
    } // 컬렉션 썸네일 슬라이드


    if ($('.gallery-thumbs').length > 0) {
      var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 8,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      });
      var galleryTop = new Swiper('.gallery-top', {
        navigation: {
          nextEl: ".thumb-prev-btn",
          prevEl: ".thumb-next-btn"
        },
        thumbs: {
          swiper: galleryThumbs
        },
        effect: "fade",
        loop: true
      });
    } //리뷰 평가체크(현재는 사용하지않음. 혹시필요할시 사용하세요)


    function checkStar() {
      $(this).parent().children('.js-check-star').removeClass('is-active');
      $(this).addClass('is-active').prevAll('.js-check-star').addClass('is-active');
      return false;
    }

    $(document).on('click', '.js-check-star', checkStar); //리뷰 더보기(아코디언)

    function reviewMore() {
      var parent = $(this).closest('.review-list');

      if (parent.hasClass('is-view')) {
        parent.removeClass('is-view');
        $(this).text('더보기');
      } else {
        parent.addClass('is-view');
        $(this).text('접기');
      }

      return false;
    }

    $(document).on('click', '.js-more-view', reviewMore); //qna 더보기(아코디언)

    function qnaMore() {
      var parent = $(this).closest('.qna-item');

      if (parent.hasClass('is-view')) {
        parent.removeClass('is-view');
      } else {
        parent.addClass('is-view');
      }

      return false;
    }

    $(document).on('click', '.js-qna-more', qnaMore); //faq 더보기(아코디언)

    function faqMore() {
      var parent = $(this).closest('.notice-faq__item');

      if (parent.hasClass('is-active')) {
        parent.removeClass('is-active');
      } else {
        parent.addClass('is-active').siblings('li').removeClass('is-active');
      }

      return false;
    }

    $(document).on('click', '.js-faq-more', faqMore); //로케이션 더보기(아코디언)

    function locationMore() {
      var parent = $(this).closest('.stores-location__item');

      if (parent.hasClass('is-active')) {
        parent.removeClass('is-active');
      } else {
        parent.addClass('is-active').siblings('li').removeClass('is-active');
      }

      return false;
    }

    $(document).on('click', '.js-location-more', locationMore); //셀렉트 박스 텍스트 컬러변경(placeholder 시각적 효과)

    function selectPlaceholder() {
      $(this).addClass('is-check');
    }

    $(document).on('change', '.js-placeholder', selectPlaceholder); //기본 아코디언

    function accordionMore() {
      var parent = $(this).parent('li');

      if (parent.hasClass('is-active')) {
        parent.removeClass('is-active');
      } else {
        parent.addClass('is-active').siblings('li').removeClass('is-active');
      }

      return false;
    }

    $(document).on('click', '.js-accordion', accordionMore); //마이페이지 :: 주문배송조회 기간조회 dropDown

    function btnDropDown() {
      var parent = $(this).closest('.myOrderList-filter__btnList'),
          parentNext = parent.next('.myOrderList-filter__detail');

      if (parentNext.hasClass('is-view')) {
        parentNext.removeClass('is-view');
      } else {
        parentNext.addClass('is-view');
      }

      return false;
    }

    $(document).on('click', '.js-btn-dropDown', btnDropDown); //마이페이지 :: qna 더보기(아코디언)

    function myQnaMore() {
      var parent = $(this).closest('.myQna-wrap__item');

      if (parent.hasClass('is-active')) {
        parent.removeClass('is-active');
      } else {
        $('.myQna-wrap__item').removeClass('is-active');
        parent.addClass('is-active');
      }
    }

    $(document).on('click', '.js-myQna-more', myQnaMore);
  }); //결제탭

  function paymentTab() {
    var el = $(this).attr('href').replace("#", "");
    $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
    $('.payment-tool__list--item').removeClass('is-current');
    $('#' + el).addClass('is-current');
    return false;
  }

  $(document).on('click', '.js-payment-open', paymentTab); //스토어 스페셜 슬라이드

  if ($('.special-slide').length > 0) {
    var specialSlide = new Swiper('.special-slide__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: ".special-slide__pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".special-slide__next",
        prevEl: ".special-slide__prev"
      }
    });
  }
  /*
  //main(best)
  */
  //메인 - 검색 후 결과페이지 슬라이드


  if ($('.main-search').length > 0) {
    var mainSlide = new Swiper('.main-search__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 'auto',
      loop: true
    });
  }

  if ($('.detail-thumb').length > 0) {
    var detailThumbSlide = new Swiper('.detail-thumb__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      pagination: {
        el: ".detail-thumb__pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".detail-thumb--next",
        prevEl: ".detail-thumb--prev"
      }
    });
  } // //메인 배너슬라이드
  // if($('.js-first-slide').length == 0){   //첫번째 슬라이드
  //     $('.main-banner__pagination').hide();
  //     $('.main-banner__progressbar').hide();
  // }
  // if($('.js-main-slide').length > 0){ // 첫번째 제외한 슬라이드
  //     var mainSlide = new Swiper('.main-banner__container', {
  //         observer: true,
  //         observeParents: true,
  //         watchOverflow: true,
  //         slidesPerView: 1,
  //         loop: true,
  //         autoplay: {
  //             delay: 5000,
  //             disableOnInteraction: false,
  //         },
  //         pagination: {
  //             el: ".main-banner__pagination",
  //             type: "fraction",
  //         },
  //         on: {
  //             init: function () {
  //                 var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
  //                 var bg = slide.data("bg");
  //                 if ($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')) {
  //                     $('body').removeClass('is-black');
  //                     $('body').addClass('is-white');
  //                 } else {
  //                     $('body').removeClass('is-white');
  //                     $('body').addClass('is-black');
  //                 }
  //                 $('.main-banner__progressbar').removeClass("animate");
  //                 $('.main-banner__progressbar').removeClass("active");
  //                 $('.main-banner__progressbar').eq(0).addClass("animate");
  //                 $('.main-banner__progressbar').eq(0).addClass("active");
  //             },
  //             slideChangeTransitionStart: function () {
  //                 $('.main-banner__progressbar').removeClass("animate");
  //                 $('.main-banner__progressbar').removeClass("active");
  //                 $('.main-banner__progressbar').eq(0).addClass("active");
  //             },
  //             slideChangeTransitionEnd: function () {
  //                 $('.main-banner__progressbar').eq(0).addClass("animate");
  //             },
  //             beforeTransitionStart: function () {
  //                 var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
  //                 var bg = slide.data("bg");
  //                 if ($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')) {
  //                     $('body').removeClass('is-black');
  //                     $('body').addClass('is-white');
  //                 } else {
  //                     $('body').removeClass('is-white');
  //                     $('body').addClass('is-black');
  //                 }
  //             },
  //         },
  //     });
  // }


  function pagingOptionChange() {
    /*
    if ($('.main-banner__wrapper').find('.swiper-slide-active').data('bg') === 'white') {
        $('body').removeClass('is-black');
        $('body').addClass('is-white');
        $('.main-banner__pagination').removeClass('is-black');
        $('.main-banner__pagination').addClass('is-white');
    } else {
        $('body').removeClass('is-white');
        $('body').addClass('is-black');
        $('.main-banner__pagination').removeClass('is-white');
        $('.main-banner__pagination').addClass('is-black');
    }
    */
    if ($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')) {
      $('body').removeClass('is-black');
      $('body').addClass('is-white');
      $('.main-banner__pagination').removeClass('is-black');
      $('.main-banner__pagination').addClass('is-white');
    } else {
      $('body').removeClass('is-white');
      $('body').addClass('is-black');
      $('.main-banner__pagination').removeClass('is-white');
      $('.main-banner__pagination').addClass('is-black');
    }

    if ($('.swiper-slide-active.main-banner__item').find('.main-banner__content').data("title") === "is-white") {
      $('.main-banner__pagination').removeClass('is-black');
      $('.main-banner__pagination').addClass('is-white');
    } else {
      $('.main-banner__pagination').removeClass('is-white');
      $('.main-banner__pagination').addClass('is-black');
    }
  } // 메인 배너슬라이드


  if ($('.main-banner').length > 0 && $('.main-banner__item').length > 1) {
    var mainBannerProgressbarOpt = {
      init: function init() {
        pagingOptionChange();
        $('.main-banner__progressbar').removeClass("animate");
        $('.main-banner__progressbar').removeClass("active");
        $('.main-banner__progressbar').eq(0).addClass("animate");
        $('.main-banner__progressbar').eq(0).addClass("active");
      },

      /*slideChange:function(){
          var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
          var bg = slide.data("bg");
          if ($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')) {
              $('body').removeClass('is-black');
              $('body').addClass('is-white');
          }
          if($('.main-banner__item[data-bg="black"]').hasClass('swiper-slide-active'))  {
              $('body').removeClass('is-white');
              $('body').addClass('is-black');
          }
      },*/
      slideChangeTransitionStart: function slideChangeTransitionStart() {
        $('.main-banner__progressbar').removeClass("animate");
        $('.main-banner__progressbar').removeClass("active");
        $('.main-banner__progressbar').eq(0).addClass("active");
      },
      slideChangeTransitionEnd: function slideChangeTransitionEnd() {
        $('.main-banner__progressbar').eq(0).addClass("animate");
        pagingOptionChange();
      }
    };
    var mainBannerOption = {
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
        el: ".main-banner__pagination",
        type: "fraction"
      },
      on: mainBannerProgressbarOpt
    };
    var mainSlide = new Swiper('.main-banner__container', mainBannerOption); // 1장이하일 경우
    // mainBannerOption.loop = false;
    // mainBannerOption.autoplay = false;
    // mainBannerOption.pagination = false;
    // mainBannerOption.on = {};
  } //메인 배너슬라이드2


  if ($('.main-banner2').length > 0 && $('.main-banner2__item').length > 1) {
    var mainSlide = new Swiper('.main-banner2__container', {
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
        el: ".main-banner2__pagination",
        type: "fraction"
      },
      on: {
        init: function init() {
          if ($('.swiper-slide-active.main-banner2__item').find('.main-banner2__content').data("title") === "is-white") {
            $('.main-banner2__pagination').removeClass('is-black');
            $('.main-banner2__pagination').addClass('is-white');
          } else {
            $('.main-banner2__pagination').removeClass('is-white');
            $('.main-banner2__pagination').addClass('is-black');
          }

          $('.main-banner2__progressbar').removeClass("animate");
          $('.main-banner2__progressbar').removeClass("active");
          $('.main-banner2__progressbar').eq(0).addClass("animate");
          $('.main-banner2__progressbar').eq(0).addClass("active");
        },
        slideChangeTransitionStart: function slideChangeTransitionStart() {
          $('.main-banner2__progressbar').removeClass("animate");
          $('.main-banner2__progressbar').removeClass("active");
          $('.main-banner2__progressbar').eq(0).addClass("active");
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          $('.main-banner2__progressbar').eq(0).addClass("animate");
        },
        beforeTransitionStart: function beforeTransitionStart() {
          if ($('.swiper-slide-active.main-banner2__item').find('.main-banner2__content').data("title") === "is-white") {
            $('.main-banner2__pagination').removeClass('is-black');
            $('.main-banner2__pagination').addClass('is-white');
          } else {
            $('.main-banner2__pagination').removeClass('is-white');
            $('.main-banner2__pagination').addClass('is-black');
          }
        }
      }
    });
  } //메인 배너슬라이드3


  if ($('.main-banner3').length > 0 && $('.main-banner3__item').length > 1) {
    var mainSlide = new Swiper('.main-banner3__container', {
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
        el: ".main-banner3__pagination",
        type: "fraction"
      },
      on: {
        init: function init() {
          if ($('.swiper-slide-active.main-banner3__item').find('.main-banner3__content').data("title") === "is-white") {
            $('.main-banner3__pagination').removeClass('is-black');
            $('.main-banner3__pagination').addClass('is-white');
          } else {
            $('.main-banner3__pagination').removeClass('is-white');
            $('.main-banner3__pagination').addClass('is-black');
          }

          $('.main-banner3__progressbar').removeClass("animate");
          $('.main-banner3__progressbar').removeClass("active");
          $('.main-banner3__progressbar').eq(0).addClass("animate");
          $('.main-banner3__progressbar').eq(0).addClass("active");
        },
        slideChangeTransitionStart: function slideChangeTransitionStart() {
          $('.main-banner3__progressbar').removeClass("animate");
          $('.main-banner3__progressbar').removeClass("active");
          $('.main-banner3__progressbar').eq(0).addClass("active");
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          $('.main-banner3__progressbar').eq(0).addClass("animate");
        },
        beforeTransitionStart: function beforeTransitionStart() {
          if ($('.swiper-slide-active.main-banner3__item').find('.main-banner3__content').data("title") === "is-white") {
            $('.main-banner3__pagination').removeClass('is-black');
            $('.main-banner3__pagination').addClass('is-white');
          } else {
            $('.main-banner3__pagination').removeClass('is-white');
            $('.main-banner3__pagination').addClass('is-black');
          }
        }
      }
    });
  } //new 배너슬라이드


  if ($('.main-new').length > 0 && $('.main-new__item').length > 1) {
    var eventSliderTouch = false;
    var mainNewSlide = new Swiper('.main-new__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      centeredSlides: true,
      speed: 10000,
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: true
      },
      pagination: {
        el: ".main-new__pagination",
        type: "fraction"
      },
      on: {
        /*init: function(){
            var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
            var bg = slide.data("bg");
            if($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')){
                $('body').removeClass('is-black');
                $('body').addClass('is-white');
            }else {
                $('body').removeClass('is-white');
                $('body').addClass('is-black');
            }
        },
        beforeTransitionStart: function () {
            var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
            var bg = slide.data("bg");
            if($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')){
                $('body').removeClass('is-black');
                $('body').addClass('is-white');
            }else {
                $('body').removeClass('is-white');
                $('body').addClass('is-black');
            }
        },*/
        touchMove: function touchMove() {
          eventSliderTouch = true;
        },
        touchEnd: function touchEnd() {
          if (eventSliderTouch) {
            eventSliderTouch = false;
            this.params.speed = 500;
          }
        },
        transitionEnd: function transitionEnd() {
          this.params.speed = 10000;
        }
      }
    });
    /*슬라이드 온클릭 시 자동슬라이드 정지*/

    $(document).on('click', mainNewSlide, function () {
      mainNewSlide.autoplay.stop();
    });
  } //best 배너슬라이드


  if ($('.best-thumb').length > 0 && $('.best-thumb__item').length > 1) {
    var bestSlide = new Swiper('.best-thumb__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: ".best-thumb__pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".best-thumb--next",
        prevEl: ".best-thumb--prev"
      },
      on: {
        init: function init() {
          var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
          var cate = slide.data("slide");
          var slide = $('[data-link=' + cate + ']').parent('.main-best__tab--item').addClass('is-current').siblings('.main-best__tab--item').removeClass('is-current');
        },
        beforeTransitionStart: function beforeTransitionStart() {
          var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
          var cate = slide.data("slide");
          var slide = $('[data-link=' + cate + ']').parent('.main-best__tab--item').addClass('is-current').siblings('.main-best__tab--item').removeClass('is-current');
        }
      }
    });
    $('.js-slide-tab').on('click', function () {
      var link = $(this).data("link");
      var slide = $('[data-slide=' + link + ']').index();
      var num = slide;
      bestSlide.slideTo(num);
    });
  }
});
jQuery(function () {
  /*
  //Header Scroll Bg
  */
  $(document).ready(function () {
    // 헤더 스크롤 백그라운드
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

    function hasScrolled() {
      var thisSt = $(window).scrollTop();
      if (Math.abs(lastScrollTop - thisSt) <= delta) return;

      if (thisSt > lastScrollTop && thisSt > navbarHeight) {
        $('.header').addClass('type-bg');
        $('.detail-tab').removeClass('is-down');
        $('.js-fixed-check').removeClass('is-down');
      } else {
        if (thisSt + $(window).height() < $(document).height()) {
          $('.header').removeClass('type-bg');
          $('.detail-tab').addClass('is-down');
          $('.js-fixed-check').addClass('is-down');
        }
      }

      lastScrollTop = thisSt;
    }
  }); //스크롤 헤더 백그라운드

  $(window).scroll(function () {
    var height = $(document).scrollTop();

    if (height > 0) {
      $('.header').addClass('is-bg-view');
    } else {
      $('.header').removeClass('is-bg-view');
      $('.header').hasClass('is-active') ? $('.header').addClass('is-bg-view') : $('.header').removeClass('is-bg-view');
    }

    if ($('.header').hasClass('type-bg')) {
      $('.header').removeClass('is-bg-view');
    }
  }); //메세지 카드 체크시 노출

  function messageCheck() {
    var messageCheckInput = $(this).prev('input[type="checkbox"]');
    var activeClass = $(this).closest('.order-product__item').find('.order-product__message');
    messageCheckInput.change(function () {
      if (messageCheckInput.is(":checked") == true) {
        activeClass.addClass('is-active');
      } else {
        activeClass.removeClass('is-active');
      }
    });
  }

  $(document).on('click', '.js-open-message', messageCheck); //적립금 전액 체크

  function useTotalCheck() {
    var useTotalCheckInput = $(this).prev('input[type="checkbox"]');
    var totalPrice = $('.coupon-info__use--total-price').text().replace(/,/g, '');
    useTotalCheckInput.change(function () {
      if (useTotalCheckInput.is(":checked") == true) {
        $('.js-full-use-text').attr('value', totalPrice);
      } else {
        $('.js-full-use-text').attr('value', '0');
      }
    });
  }

  $(document).on('click', '.js-full-use', useTotalCheck);

  function textareaKeyup() {
    if ($(this).val().length > 50) {
      alert("글자수는 50자로 이내로 제한됩니다.");
      $(this).val($(this).val().substring(0, 50));
    }
  }

  ;
  $(document).off('keyup').on('keyup', '.js-max-keyup', textareaKeyup);

  function customOption() {
    var customOption = $(this).next('.js-select-custom');
    var optionSelected = $(this).find('option:selected');

    if (optionSelected.val() == 6) {
      customOption.addClass('is-active');
    } else {
      customOption.removeClass('is-active');
    }
  }

  ;
  $(document).on('change', '.js-custom-message', customOption); //셀렉트 박스 텍스트 멀티(상품검색 팝업)

  function selectMulti() {
    var selectMultiSelected = $(this).find('option:selected');
    var idxDisabled = $(this).closest('.product-search__item').nextAll('.product-search__item').find('.js-multiselect');

    if (selectMultiSelected.val() == "") {
      $(this).removeClass('is-check');
      idxDisabled.attr("disabled", true).removeClass('is-check');
      idxDisabled.find('option:eq(0)').prop('selected', true);
    } else {
      $(this).addClass('is-check');
      idxDisabled.removeAttr('disabled');
    }
  }

  $(document).on('change', '.js-multiselect', selectMulti); //멤버쉽 스크롤 픽시드

  if ($('.js-fixed-check').length > 0) {
    $(window).scroll(function () {
      var height = $(document).scrollTop();
      var mainOuterHeight = $('.site-main').outerHeight(true);
      var lnbHeight = $('.lnb').height();
      var mainHeight = $('.site-main').height();
      var headerHeight = $('.header').height();
      var marginHeight = mainOuterHeight - mainHeight;
      var totalHeight = lnbHeight + marginHeight + headerHeight;
      var upTotalHeight = lnbHeight + marginHeight;

      if ($('.header').hasClass('type-bg')) {
        if (height > totalHeight) {
          $('.js-fixed-check').addClass('is-fixed');
          $('.header').addClass('is-bg-white');
        } else {
          $('.js-fixed-check').removeClass('is-fixed');
          $('.header').removeClass('is-bg-white');
        }
      } else {
        if (height > upTotalHeight) {
          $('.js-fixed-check').addClass('is-fixed');
          $('.header').addClass('is-bg-white');
        } else {
          $('.js-fixed-check').removeClass('is-fixed');
          $('.header').removeClass('is-bg-white');
        }
      }
    });
  } //멤버쉽 스크롤 탭


  function membershipTab() {
    var mainOuterHeight = $('.site-main').outerHeight(true);
    var lnbHeight = $('.lnb').height();
    var mainHeight = $('.site-main').height();
    var marginHeight = mainOuterHeight - mainHeight;
    var totalHeight = lnbHeight + marginHeight;
    var idx = $(this).parent('li').index();
    $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
    $('.js-basic-tab-cont').eq(idx).addClass('is-current').siblings('.js-basic-tab-cont').removeClass('is-current');

    if ($('.js-fixed-check').hasClass('is-fixed')) {
      $('html, body').animate({
        scrollTop: totalHeight
      }, 340);
    }
  }

  $(document).on('click', '.js-basic-tab-link', membershipTab); //스토어 스페셜탭으로 가져오기

  if ($('.stores-tab').length > 0) {
    var url_param = $(location).attr('href').split("?");
    var param = url_param[1];

    if (param) {
      if (param.indexOf('tabNo=2') != -1) {
        $('.stores-tab__item').removeClass('is-current').eq(2).addClass('is-current');
        $('.stores-tab__info').removeClass('is-current').eq(2).addClass('is-current');
      }
    }
  }
  /* 2021-12-29 wn.kim : jsp에서 제어
      //네이버 팝업
      if($('.product-detail').length > 0) {
          var naver_param = $(location).attr('href').split("?");
          var param = (naver_param[1]);
          if(param){
              if (param.indexOf('PRD_MST_CD') != -1 ) {
                  $('html').addClass('is-hidden');
                  $('#naverPop').addClass('is-active');
              }
          }
      }
  */


  $(document).ready(function () {
    /*********
     * main section full
     * :: style
     */
    // var mainFullArray = ['main-banner','main-new','main-banner2','main-best'];
    // mainFullArray.forEach(function(ele,i){
    //     $('.'+ele).addClass('sectionFull')
    //               .attr('aria-moveId','sectionFull-move'+(i+1));
    // })
    // //full bg-color
    // if( $('.section-body>div').hasClass('sectionFull') ){
    //     $('.section-body').css({background:'#fff'});
    //     $('.section-body>div').css({background:'#fff'})
    // }else return false;

    /*********
     * main section full
     * :: paging animate
     * https://scrollmagic.io/examples/advanced/section_wipes_manual.html
     */
    // // init
    // var controller = new ScrollMagic.Controller({
    // 	globalSceneOptions: {
    // 		triggerHook: 'onLeave',
    //         // duration: '200%'
    // 	}
    // });
    // var slides = document.querySelectorAll(".sectionFull");
    // for (var i=0; i<slides.length; i++) {
    // 	new ScrollMagic.Scene({
    // 			triggerElement: slides[i]
    // 		})
    // 		.setPin(slides[i], {pushFollowers: false}) //
    // 		.addTo(controller);
    // }

    /*********************/
  });
}); //입고알림 버튼클릭시

function stoNtsAsk() {
  alert('입고 알림을 \n신청하시겠습니까?');
} //카트 제품 삭제 버튼클릭시


function basketDelete() {
  alert('삭제하시겠습니까?');
}
/**
 * ScrollMagic: Opacity
 */


if ($('.motion-up').length > 0) {
  var controller = new ScrollMagic.Controller();
  $('.motion-up').each(function () {
    var Opacity = new ScrollMagic.Scene({
      triggerElement: this.children[0],
      triggerHook: 0.9
    }).reverse(false).setClassToggle(this, 'motion-up--active').addTo(controller);
  });
}
/*collabo 리스트 클릭 시 텍스트 호버효과*/


var collaboElemAll = document.querySelectorAll('.collabo-list__link');
Array.prototype.forEach.call(collaboElemAll, function (collaboElem) {
  collaboElem.addEventListener('click', function (e) {
    e.preventDefault();
    var collaboName = this.getAttribute('data-name');
    body.classList.add('is-stop');
    setTimeout(function () {
      body.classList.add('is-stop');
    }, 300);
    collaboPopup.classList.add('is-active');
    setPopup(collaboName);
  });
  collaboElem.addEventListener('mouseenter', function (e) {
    this.parentNode.classList.add('is-hover');
  });
  collaboElem.addEventListener('mouseleave', function (e) {
    this.parentNode.classList.remove('is-hover');
  });
}); //loading

window.onload = function () {
  $('.loading').hide();
}; // 프로젝트페이지 - 주소복사 기능


function CopyUrlToClipboard(e) {
  e.preventDefault();
  var obShareUrl = document.getElementById("ShareUrl");
  obShareUrl.select();
  document.execCommand("copy");
  obShareUrl.blur();
}

var copyBtn = document.querySelector('.js-url-copy');

if (copyBtn) {
  copyBtn.addEventListener('click', CopyUrlToClipboard);
} // --------------------------
// [2021-01-25] 
// mobile 디바이스 브라우저 네비게이션 바 계산


$('.page-main').each(function () {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}); // // 디바이스별 풀사이즈 조정
// var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
// var agt = navigator.userAgent.toLowerCase();
// var mobileType = ['android','iphone'];
// if( mobile &&  agt.indexOf(mobileType[1]) > -1 ){
// }else{
//     //안드로이드 일 경우
//     // window.addEventListener('touchmove', function(){
//     //     var vh = window.innerHeight * 0.01 //window.innerHeight/100;
//     //     document.documentElement.style.setProperty('--vh', vh+'px');
//     // });
//     window.addEventListener('resize', function(){
//         var vh = window.innerHeight * 0.01;
//         document.documentElement.style.setProperty('--vh', vh+'px');
//     });
// }
// --------------------------
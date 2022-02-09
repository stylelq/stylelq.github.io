"use strict";

//loading
window.onload = function () {
  $('.loading').hide();
};

jQuery(function () {
  $(document).ready(function () {
    var searchOpen = 'false'; //스크롤 시 헤더 배경 바뀜

    $(window).on('load scroll', function () {
      if ($(window).scrollTop() > 0) {
        $('.header').addClass('is-bg-white');
      } else {
        $('.header').removeClass('is-bg-white');
      }
    });
    $('.gnb-1depth__item').on('mouseenter', function () {
      var depth = $(this).attr('data-depth');

      if (depth != 1) {
        $('.dim').addClass('is-active');
        $('.gnb').addClass('is-active');
      }

      $(this).addClass('is-active');
      $('.header').addClass('is-active');
    }).on('mouseleave', function () {
      var depth = $(this).attr('data-depth');
      $(this).removeClass('is-active');

      if (searchOpen != "true") {
        $('.header').removeClass('is-active');

        if (depth != 1) {
          $('.dim').removeClass('is-active');
          $('.gnb').removeClass('is-active');
        }
      }
    });
    /*
    //Header Search
    */
    //헤더 검색박스 레이어 열고닫기

    var headSearchStatus = false;

    function jsOpenSearchLayer() {
      if (!headSearchStatus) {
        headSearchStatus = true;
        $('.search').addClass('is-active');
        $('.type-search').addClass('is-active');
      } else {
        headSearchStatus = false;
        $('.search').removeClass('is-active');
        $('.type-search').removeClass('is-active');
      }
    }

    $('.js-search-open').on('click', jsOpenSearchLayer); //--[플로팅버튼] ----------------
    //우측 하단 카트(cart-fix)

    if ($('.cart-fix').length > 0) {
      var height = $(document).scrollTop(),
          headHeight = $('.header').scrollTop(),
          winH = $(window).height(),
          footY = $('.footer').offset().top;
      $(window).scroll(function () {
        height = $(document).scrollTop();
        headHeight = $('.header').scrollTop();
        winH = $(window).height();
        footY = $('.footer').offset().top;

        if (height > headHeight) {
          $('.cart-fix').addClass('is-view');
        } else {
          $('.cart-fix').removeClass('is-view');
        } // 푸터가 보일경우 버튼 위치값 조정


        if (height - (footY - winH) > 0) {
          $('.cart-fix').css({
            bottom: height - (footY - winH) + 50
          });
        }
      }); //히스토리 백, 또는 위치에서 새로고침 시 위치값 조정

      if (height - (footY - winH) > 0) {
        $('.cart-fix').css({
          bottom: height - (footY - winH) + 50
        });
      }
    } //스크롤탑 버튼


    function scrollTopBtn() {
      $('html, body').animate({
        scrollTop: '0'
      }, 340);
    }

    $(document).on('click', '.js-scrollTop', scrollTopBtn); //--END[플로팅버튼]----------------
  }); //------------ // header
  //--[Scroll]-------------------------
  // 제품상세 option fix scroll

  if ($('.detail').length > 0) {
    var positionAbsolute = function positionAbsolute(num) {
      stypeOpt.position = 'absolute';
      stypeOpt.top = num;
    };

    var positionFixed = function positionFixed(num) {
      stypeOpt.position = 'fixed';
      stypeOpt.top = num;
    };

    var sc, winH, divH;
    var stypeOpt = {};
    $(window).on('scroll', function () {
      sc = $(document).scrollTop();
      winH = $(window).height();
      divH = $('.detail-tab__cont').height();

      if (sc >= 900) {
        $('.detail-tab').addClass('fixed');

        if (divH < winH) {
          if (sc - divH > 470) {
            positionAbsolute(divH + 240);
            $('.detail-tab').removeClass('fixed');
          } else {
            positionFixed($('.header').height() + 20);
          }
        } else {
          if (sc - divH > 0) {
            positionAbsolute(divH + 240);
            $('.detail-tab').removeClass('fixed');
          } else {
            positionFixed($('.header').height() + 20);
          }
        }
      } else {
        $('.detail-tab').removeClass('fixed');
        positionFixed('inherit');
      }

      if (sc == 0) {
        $('.detail-tab__item').removeClass('is-current');
        $('.detail-tab__item').eq(0).addClass('is-current');
        $('.detail-tab__info').eq(0).addClass('is-current');
      }

      $('.product-option-fix').css(stypeOpt);
      console.group('================');
      console.log('scY : ', sc);
      console.groupEnd();
      return;
    });
  } //--END[Scroll]----------------------------- 
  //--[탭] ----------------------
  //basic


  function basicTab() {
    var item = '[class $= __item]',
        //li
    tab = '[class $= -tab__fix]'; //ul

    $(this).closest(tab).children().removeClass('is-current');
    $(this).parent(item).addClass('is-current');
  }

  $(document).on('click', '.js-basic-tab-link', basicTab); //제품 상세 탭

  function detailTab() {
    var item = '[class $= __item]',
        //li
    tab = '[class $= -tab__fix]',
        //ul
    contents = $('.detail-tab__info'),
        //tab content
    idx = $(this).parent().index();
    $(this).closest(tab).children().removeClass('is-current');
    $(this).parent(item).addClass('is-current');
    contents.removeClass('is-current');
    contents.eq(idx).addClass('is-current'); // 오른쪽 옵션값 고정시키기

    $('.detail-tab').addClass('fixed');
    $('html').animate({
      scrollTop: contents.eq(idx).offset().top - $('.header').height()
    });
    contents.eq(idx).css({
      minHeight: 600
    });
    $('.product-option-fix').css({
      position: 'fixed',
      top: $('.header').height() + 20
    });
  }

  $(document).on('click', '.js-tab-link', detailTab); //--END[탭] ----------------------
  //--[dropdown::아코디언] ----------------------
  //qna 더보기(아코디언)

  function qnaMore() {
    var parent = $(this).closest('.qna-item');

    if (parent.hasClass('is-view')) {
      parent.removeClass('is-view');
    } else {
      parent.addClass('is-view');
    }

    return false;
  }

  $(document).on('click', '.js-qna-more', qnaMore); //--END[dropdown::아코디언] ----------------------
  //--[select] -------------------
  //custom select

  function customSelect() {
    // sorting btn dropDown
    if ($(this).hasClass('is-active')) {
      $(this).removeClass('is-active');
      $(this).next().stop().slideUp();
    } else {
      $(this).addClass('is-active');
      $(this).next().stop().slideDown();
    } // select option view


    function selectView() {
      var link = '[class $= __link]',
          value = $(this).find(link).text(),
          select = $(this).parent(),
          selBoxLabel = select.siblings('.filter-custom__selected');
      $('.filter-custom__option').removeClass('is-current');
      $(this).addClass('is-current'); // selected 

      $(this).parent().siblings('.hidden-input').val(value);
      selBoxLabel.find('.selected_text').text(value);
      selBoxLabel.removeClass('is-active');
      select.stop().slideUp();
      return false;
    }

    $(document).on('click', '.filter-custom__option', selectView);
    return false;
  }

  $(document).on('click', '.filter-custom__selected', customSelect); //--END[select]--------------------------
  // 리스트 - 장바구니,좋아요 버튼 :: productHoverButton

  function productItem() {
    if ($(this).closest('.type-like').length > 0) {
      if ($(this).hasClass('is-active')) {
        $(this).removeClass('is-active');
      } else {
        $(this).addClass('is-active');
        alert('like!!');
      }
    }

    if ($(this).closest('.type-basket').length > 0) {
      alert('장바구니');
    }

    return false;
  }

  $(document).on('click', '.product-icon__link', productItem); //like it

  var likeClick;

  function likeButtonStyle() {
    if (!likeClick) {
      likeClick = true;
      $('.fix-button').addClass('is-on');
    } else {
      likeClick = false;
      $('.fix-button').removeClass('is-on');
    }
  }

  $(document).on('click', '[class $= __link--like]', likeButtonStyle); //--[swiper slider] -------------------

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
  } //연관제품 슬라이드


  if ($('.recommended-slide').length > 0) {
    var recommendeSlide = new Swiper('.recommended-slide__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 3,
      slidesPerGroup: 3,
      navigation: {
        nextEl: ".detail-thumb--next",
        prevEl: ".detail-thumb--prev"
      },
      pagination: {
        el: ".recommended-slide__pagination",
        type: "fraction"
      }
    });
  } //--END[swiper slider]-----------------------------

}); //jQuery
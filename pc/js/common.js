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

    var status;

    function jsOpenSearchLayer() {
      if (!status) {
        $('.search').addClass('is-active');
        $('.type-search').addClass('is-active');
        status = true;
      } else {
        $('.search').removeClass('is-active');
        $('.type-search').removeClass('is-active');
        status = false;
      }
    }

    $('.js-search-open').on('click', jsOpenSearchLayer);
  }); //--[플로팅버튼] ----------------
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
  //--[탭] ----------------------
  //basic

  function basicTab() {
    var item = '[class $= __item]',
        //li
    tab = '[class $= -tab__fix]'; //ul

    $(this).closest(tab).children().removeClass('is-current');
    $(this).parent().addClass('is-current');
  }

  $(document).on('click', '.js-basic-tab-link', basicTab); //--[select] -------------------
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

  $(document).on('click', '.product-icon__link', productItem);
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
  $(document).on('click', '.terms__depth2-item label', allCheckItem); //기본 아코디언

  function accordionMore() {
    var parent = $(this).parent('li');

    if (parent.hasClass('is-active')) {
      parent.removeClass('is-active');
    } else {
      parent.addClass('is-active').siblings('li').removeClass('is-active');
    }

    return false;
  }

  $(document).on('click', '.js-accordion', accordionMore); //팝업열기(공통)

  function openPopup() {
    var el = '';

    if (this.tagName === 'BUTTON') {
      el = this.dataset.popup;
    }

    if (this.tagName === "A") {
      el = $(this).attr('href').replace('#', '');
    }

    if ($('.popup.is-active').length <= 1) {
      $('.dim-join').addClass('is-active');
    } else {
      $('.popup').removeClass('is-active');
      $('.dim-join').removeClass('is-active');
    }

    $('#' + el).addClass('is-active');
    $('.popup__body').scrollTop(0); // 전체 팝업 body scroll 없앰

    $('html').addClass('is-hidden'); // 예외 modal-pop

    var typeModal = ['small-popup', 'button-popup', 'modal-pop'];
    var popId = $('#' + el);
    typeModal.forEach(function (name) {
      if (popId.hasClass(name)) {
        $('html').removeClass('is-hidden');
        $('.popup__body').scrollTop(0);
      }

      return false;
    });
    return false;
  }

  $(document).on('click', '.js-popup-open', openPopup);
}); //jQuery
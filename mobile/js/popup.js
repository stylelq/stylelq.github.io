"use strict";

jQuery(function () {
  //팝업열기(공통)
  function openPopup() {
    var el = '';

    if (this.tagName === 'BUTTON') {
      el = this.dataset.popup;
    }

    if (this.tagName === "A") {
      el = $(this).attr('href').replace('#', '');
    }

    if ($('.popup.is-active').length <= 1) {} else {
      $('.popup').removeClass('is-active');
    }

    $('#' + el).addClass('is-active');
    $('.popup__body').scrollTop(0); // mobile 디바이스 하단 네비게이션 버튼 바

    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    window.addEventListener('resize', function () {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    });
    window.addEventListener('touchmove', function () {
      var vh = window.innerHeight * 0.01; //window.innerHeight/100;

      document.documentElement.style.setProperty('--vh', vh + 'px');
    }); // 전체 팝업 body scroll 없앰

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

  $(document).on('click', '.js-popup-open', openPopup); //Panzoom 참고사이트 = https://github.com/inuyaksa/jquery.panzoom
  //zoom option

  var zoomOption = {
    bounds: {
      top: 150,
      right: 50,
      bottom: 50,
      left: 250
    },
    // bounds:true,
    boundsPadding: 0.4,
    // boundsDisabledForZoom: true,
    maxZoom: 2,
    minZoom: 0.5,
    $reset: $(".popup-slider__button, .slide-popup__close, .js-popup-close") //제품 팝업 확대축소(플러그인 panzoom)

  };

  function productZoom() {
    var area = document.querySelectorAll('.js-product-zoom');
    var instance = "";

    for (var i = 0; i < area.length; i++) {
      var item = area.item(i);
      instance = panzoom(item, zoomOption);
    }
  } //확대축소(플러그인 panzoom):reset-슬라이드 이동시, 닫기시


  function resetPanZoom() {
    var area = document.querySelectorAll('.js-product-zoom');
    var instance = "";

    for (var i = 0; i < area.length; i++) {
      var item = area.item(i); // instance  = panzoom(item).zoomAbs( 0, 0, 1 );

      instance = panzoom(item, zoomOption);
    }
  } //확대축소(플러그인 panzoom):play


  if ($('.product-zoom').length > 0) {
    productZoom();
  } //팝업에 사용되는 슬라이드(확대축소팝업, 360도 회전 팝업)


  if ($('.popup-slider').length > 0) {
    var zoomSlide = new Swiper('.popup-slider__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      allowTouchMove: true,
      slidesPerView: 1,
      navigation: {
        nextEl: ".popup-slider__button--next",
        prevEl: ".popup-slider__button--prev"
      },
      on: {
        slideChange: function slideChange() {
          //확대축소 reset
          resetPanZoom();
        }
      }
    });
  } //팝업닫기(공통)


  function closePopup() {
    if ($('.popup.is-active').length <= 1) {
      $('.popup, .small-popup, .slide-popup, .button-popup').removeClass('is-active');
      $('html').removeClass('is-hidden');
    } else {
      $(this).closest('.popup').removeClass('is-active');
    }

    if ($(this).hasClass('slide-popup__close')) {
      resetPanZoom();
    }
  }

  $(document).on('click', '.js-popup-close', closePopup); //팝업닫기(메인)

  function closemainPopup() {
    if ($('.notice-popup').length <= 1) {
      $('#mainPopup').css('display', 'none');
    }
  }

  $(document).on('click', '.js-popup-close', closemainPopup); //배송지 정보 탭

  function shippingTab() {
    var idx = $(this).parent('li').index();
    var shippingIdx = $('.shipping-tab__item:nth-child(4)');
    $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
    $('.js-pop-tab-cont').eq(idx).addClass('is-current').siblings('.js-pop-tab-cont').removeClass('is-current');
    $('html, body').animate({
      scrollTop: $('.popup__body').offset().top
    }, 340);

    if (shippingIdx.hasClass('is-current')) {
      $('#shippingPop .popup-confirm__link').text('확인');
    } else {
      $('#shippingPop .popup-confirm__link').text('선택 주소 사용');
    }
  }

  $(document).on('click', '.js-pop-tab-link', shippingTab); //---- [임시-퍼블용] 마이페이지::상품리뷰 이미지보기 ------
  // 상품리뷰 이미지 팝업 오픈

  function reviewImgOpen(id) {
    $('.popup').attr('id', id);

    if ($('.popup.is-active').length <= 1) {} else {
      $('.popup').removeClass('is-active');
    }

    $('#' + id).addClass('is-active');
    $('html').addClass('is-hidden');
  } // 클릭한 리스트의 포토 개수에 따른 slide생성


  function reviewImgSlideDraw(ele) {
    var item = ele.closest('.review-list__photo--list'),
        slideWrap = $('.swiper-wrapper'),
        slide = '',
        imgSrc = [];

    for (var i = 0, len = item.find('li').length; i < len; i++) {
      imgSrc.push(item.find('li').eq(i).find('img').attr('src'));
      slide += '<div class="swiper-slide"><img src="' + imgSrc[i] + '"></div>';
    }

    slideWrap.html(slide);
  } // 상품리뷰 이미지 팝업 콘텐츠 뷰


  function reviewImgView() {
    var id = $(this).attr('href').replace('#', '');
    var idx = $(this).parent('li').index();
    reviewImgOpen(id);
    reviewImgSlideDraw($(this));
    var slide = new Swiper('.reviewImages__view .swiper-container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      initialSlide: idx,
      pagination: {
        el: ".detail-thumb__pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".detail-thumb--next",
        prevEl: ".detail-thumb--prev"
      }
    });
  }

  $(document).on('click', '.js-imgView-open', reviewImgView); //--------------------------------
  // 필터 팝업 active event

  function inputActive() {
    $('.popup-checkform__item').removeClass('is-active');
    $(this).parent().addClass('is-active');
  }

  $(document).on('input click touchstart', '.list-radio', inputActive); //------[스테이징 기준] ---------------------------
  // - Ajax데이터바인딩 버튼 예외처리
  // - 아래 버튼들은 add/remove class 이벤트가 없어 추가된것.
  //
  // ps. 버튼을 고정시키지 않고 스크롤시 딸려 올라오게 처리가 되었으나, 
  //     디바이스별로 (하단/상단/주소 바 등) 높이가 상이하고 질질끄는형식의 터치가 이루어졌을때 
  //     dim이 없는 풀팝업일 경우 아래 깔린 부모DOM객체가 보여져 부모 스크롤 hidden 처리로 방식을 바꿧으나(html 'is-hidden'클래스추가),
  //     AJAX에서 데이터 바인딩시 succes후 is-hidden 클래스 삭제를 추가해야하는 번거러움이 생김.
  //        ㄴ 닫기버튼, 취소나 확인 버튼 누르고 나왔을때 body가 스크롤 안되는 부분때문
  //     현재 버튼을 fixed처리 하고, .popup-body 기준 높이값을 적게 처리하여 굳이 html태그에 is-hidden 처리를 하지 않아도 될듯함.

  $(document).on('click', function (e) {
    // [개발기준작업] 주문서-배송지정보, 1:1문의-주문검색 팝업
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.tagName === 'DIV') {
      if ($('.popup.page-delivery').hasClass('is-active') || $('#inquiryOrder').length > 0) {
        $('html').addClass('is-hidden');
      }

      if (e.target.className === 'popup__close') {
        $('html').removeClass('is-hidden');
      }
    }

    if (e.target.parentNode.parentNode.classList.contains('js-order-open')) {
      $(this).closest('.popup').removeClass('is-active');
      $('html').removeClass('is-hidden');
    }
  }); // is-hidden :: remove - ajax success 이후 처리되도록

  function viewHtmlClassRemove() {
    setTimeout(function () {
      $('html').removeClass('is-hidden');
    }, 50);
  } // popup 닫기 -> 이용약관, 개인정보처리방침, 1:1문의쪽 주문검색 취소&확인버튼 


  var popupId = ['privacyPop', 'provisionPop', 'shippingPop', 'inquiryOrderPop', 'fileList0'];
  $(document).on('click', '[class $= __footer] [class $= __link], [class $= -close], [class $= __close]', function () {
    for (var i = 0, len = popupId.length; i < len; i++) {
      if (this.closest('#' + popupId[i])) {
        $('.popup, .small-popup, .slide-popup, .button-popup').removeClass('is-active');
        viewHtmlClassRemove(); // if( popupId[i] === 'inquiryOrderPop' || popupId[i] === 'shippingPop' ){
        //     viewHtmlClassRemove();
        // }
      } // 첨부이미지파일 :: 미리보기 삭제버튼


      if (this.closest('#' + popupId[4])) {
        viewHtmlClassRemove();
      }
    }
  }); //-------------------------------------------
});
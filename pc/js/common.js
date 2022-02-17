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

    $('.js-search-open').on('click', jsOpenSearchLayer); // 헤더 검색박스 필터 버튼

    function searchFilterButton() {
      var item = '.main-search__item';
      $(item).removeClass('is-active');
      $(this).addClass('is-active');
      $('.main-search__top').hide(); // 버튼클릭시 검색결과 텍스트 숨기기

      console.log($(this).find('a').text());
      return false;
    }

    $(document).on('click', '.main-search__item', searchFilterButton);
  }); //header

  /*------------------
  * [플로팅버튼]
  ------------------*/
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
    });
  } //스크롤탑 버튼


  function scrollTopBtn() {
    $('html, body').animate({
      scrollTop: '0'
    }, 340);
  }

  $(document).on('click', '.js-scrollTop', scrollTopBtn); //--END[플로팅버튼]----------------

  /*---------------------------
   * [Scroll]
   ---------------------------*/

  var $sc, $winH, $divH;
  var $styleOpt = {};

  function positionAbsolute(num) {
    $styleOpt.position = 'absolute';
    $styleOpt.top = num;
  }

  function positionFixed(num) {
    $styleOpt.position = 'fixed';
    $styleOpt.top = num;
  } // 상품 상세 option fix scroll


  if ($('.detail').length > 0) {
    $(window).on('scroll', function () {
      $sc = $(document).scrollTop();
      $winH = $(window).height();
      $divH = $('.detail-tab__cont').height();

      if ($sc >= $winH) {
        //스크롤 할때
        // 레이아웃 왼쪽 탭 fixed
        $('.detail-tab').addClass('fixed');

        if ($divH < $winH) {
          //상세콘텐츠 높이 < 윈도우창 높이
          if ($sc - $divH > 470) {
            //윈도우창보다 작은 콘텐츠
            positionAbsolute($divH + 240);
            $('.detail-tab').removeClass('fixed');
          } else {
            //스크롤 햇을때
            positionFixed($('.header').height() + 20);
          }
        } else {
          //상세콘텐츠 높이 > 윈도우창 높이
          if ($sc - $divH > 0) {
            //윈도우 끝쪽에 다닳았을때
            positionAbsolute($divH + 240);
            $('.detail-tab').removeClass('fixed');
          } else {
            positionFixed($('.header').height() + 20);
          }
        }
      } else {
        $('.detail-tab').removeClass('fixed');
        positionFixed(''); //default css
      } // 스크롤 0일때 초기화


      if ($sc == 0) {
        $('.detail-tab__item').removeClass('is-current');
        $('.detail-tab__item').eq(0).addClass('is-current');
        $('.detail-tab__info').eq(0).addClass('is-current');
      }

      $('.product-option-fix').css($styleOpt);
      console.group('================');
      console.log('scY : ', $sc);
      console.groupEnd();
      return;
    });
  } // 주문서 배송지 option fix scroll


  if ($('.payment').length > 0) {
    $(window).on('scroll', function () {
      $sc = $(document).scrollTop();
      $winH = $(window).height();
      $divH = $('.payment-left').height();

      if ($sc >= $winH) {
        positionAbsolute($divH - 400);
      } else {
        positionFixed($('.header').height() + 20);
      }

      if ($sc < 100) {
        positionFixed(''); //default css
      }

      $('.payment-right').css($styleOpt);
      return;
    });
  } //--END[Scroll]----------------

  /*---------------------------
  * [탭]
  ---------------------------*/
  //basic


  function basicTab() {
    var item = '[class $= __item]',
        //li
    tab = '[class $= -tab__fix]'; //ul

    $(this).closest(tab).children().removeClass('is-current');
    $(this).parent().addClass('is-current');
  }

  $(document).on('click', '.js-basic-tab-link', basicTab); //상품 상세 탭

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
    contents.eq(idx).addClass('is-current'); //왼쪽 탭 고정시키기 

    $('html').animate({
      scrollTop: 920
    });
    $('.detail-tab').addClass('fixed');
    contents.eq(idx).css({
      minHeight: 600
    }); //오른쪽 옵션값 고정시키기

    $('.product-option-fix').css({
      position: 'fixed',
      top: $('.header').height() + 20
    });
  }

  $(document).on('click', '.js-tab-link', detailTab); //주문서 배송지 탭

  function basicTab() {
    var item = '[class $= __item]',
        //li
    tab = '[class $= -tab__fix]',
        //ul
    contents = $('.payment-section-tab__info'),
        //tab content
    idx = $(this).parent().index();
    $(this).closest(tab).children().removeClass('is-current');
    $(this).parent(item).addClass('is-current');
    contents.removeClass('is-current');
    contents.eq(idx).addClass('is-current');
  }

  $(document).on('click', '.js-add-tab-link', basicTab); //결제탭

  function paymentTab() {
    var el = $(this).attr('href').replace("#", "");
    $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
    $('.payment-tool__list--item').removeClass('is-current');
    $('#' + el).addClass('is-current');
    return false;
  }

  $(document).on('click', '.js-payment-open', paymentTab); //--END[탭] ----------------------

  /*---------------------
  * [select] :: custom 
  ---------------------*/
  // select dropdown

  function selectViewDropDown(selected) {
    var ele = selected;

    if ($(ele).hasClass('is-active')) {
      $(ele).removeClass('is-active');
      $(ele).next().stop().slideUp();
    } else {
      $(ele).addClass('is-active');
      $(ele).next().stop().slideDown();
    }
  } // option view 


  function selectView(option) {
    var optName = option;
    $(optName).removeClass('is-current');
    $(this).addClass('is-current');

    function selectedTextChange(e) {
      var link = e.target,
          value = link.innerText,
          select = link.parentNode.parentNode;

      if (link.parentNode.className === optName.replace('.', '')) {
        //hidden input 에 value 값 넣기
        $(select).siblings('.hidden-input').val(value);
        $(select).siblings().find('.selected_text').text(value); // selected Text변경 하고 옵션ul 닫기

        $(select).siblings().removeClass('is-active');
        $(select).stop().slideUp();
      }

      return false;
    }

    $(document).on('click', optName, selectedTextChange);
    return false;
  } // 리스트 소팅버튼


  function customSelect() {
    selectViewDropDown(this);
    selectView('.filter-custom__option');
    return false;
  }

  $(document).on('click', '.filter-custom__selected', customSelect); // 장바구니FREESIZE

  function cartCustomSelect() {
    selectViewDropDown(this);
    selectView('.selBox-custom__option');
    return false;
  }

  $(document).on('click', '.selBox-custom__selected', cartCustomSelect); //--END[select]--------------------------
  // 좋아요/장바구니 넣기

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

  $(document).on('click', '.product-icon__link', productItem); // 좋아요버튼 active style

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

  $(document).on('click', '[class $= __link--like]', likeButtonStyle); //상세 컬러 선택

  function colorCheck() {
    var item = '.color-list__item';
    $(item).removeClass('is-current');
    $(this).parent(item).addClass('is-current');
    return false;
  }

  $(document).on('click', '.color-list__title', colorCheck);
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
  $(document).on('click', '.terms__depth2-item label', allCheckItem); //장바구니 checkbox checked ALL

  function checkBoxChkAll() {
    var chkBox = $('[name=' + this.name + ']');

    function chked(sta) {
      for (var i = 0, len = chkBox.length; i < len; i++) {
        chkBox[i].checked = sta;
      }
    }

    return this.checked ? chked(true) : chked(false);
  }

  $(document).on('click', '.js-table-checkAll', checkBoxChkAll);
  /*------------------------
  * [dropdown::아코디언]
  ------------------------*/
  //기본 아코디언

  function accordionMore() {
    var parent = $(this).parent('li');

    if (parent.hasClass('is-active')) {
      parent.removeClass('is-active');
    } else {
      parent.addClass('is-active').siblings('li').removeClass('is-active');
    }

    return false;
  }

  $(document).on('click', '.js-accordion', accordionMore); //qna 더보기

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

  /*---------------------
    * [swiper slider] 
    ---------------------*/

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


  if ($('.recommended').length > 0) {
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
      slidesPerView: 3,
      centeredSlides: true,
      rewind: true,
      loop: false,
      autoplay: {
        delay: 0
        /*disableOnInteraction: false,*/

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
        /*init:function(){
            $('.collection-more__wrapper').css({transitionTimingFunction:'linear'})
        },*/
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
  } //--END[swiper slider]-----------------------------

}); //jQuery
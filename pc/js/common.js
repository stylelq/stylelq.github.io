"use strict"; //loading

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

window.onload = function () {
  $('.loading').hide();
};

jQuery(function () {
  var mouseEnterCheck = false; //GNB 마우스 오버 체크

  $(document).ready(function () {
    var searchOpen = 'false'; //스크롤 시 헤더 배경 바뀜

    $(window).on('load scroll', function () {
      if ($(window).scrollTop() > 0) {
        $('body').removeClass('is-white');
        $('body').removeClass('is-black');
        $('body').addClass('is-white');
        $('.header').addClass('is-bg-white');
      } else {
        if ($('.main-banner').length > 0 && $('.main-banner__item').length > 1) {
          if ($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')) {
            $('body').removeClass('is-black');
            $('body').addClass('is-white');
          } else {
            $('body').removeClass('is-white');
            $('body').addClass('is-black');
          }

          $('.header').removeClass('is-bg-white');
        }
      }

      if ($('.main-banner').length > 0 && $('.main-banner__item').length > 1) {
        pagingOptionChange();
      }
    });
    /* 마우스 오버 이벤트 제어 */

    /*var header_mouse_over = false;
    var gnb = document.getElementsByClassName('gnb');
    gnb.addEventListener('mouseover', (event) => {
        header_mouse_over = true;
    });
    gnb.addEventListener('mouseout', (event) => {
        header_mouse_over = false;
    });
     if (header_mouse_over === false) {
        if($('body').addClass('is-black')){
            $('body').removeClass('is-black');
            $('body').addClass('is-white');
        }
    }*/

    $('.gnb-1depth__item').on('mouseenter', function () {
      var depth = $(this).attr('data-depth');
      mouseEnterCheck = true;

      if ($('body').hasClass('is-black')) {
        $('body').removeClass('is-black');
        $('body').addClass('is-white');
      }

      if (depth != 1) {
        $('.dim').addClass('is-active');
        $('.gnb').addClass('is-active');
      }

      $(this).addClass('is-active');
      $('.header').addClass('is-active');
    }).on('mouseleave', function () {
      var depth = $(this).attr('data-depth');
      $(this).removeClass('is-active');
      mouseEnterCheck = false;

      if (searchOpen != "true") {
        $('.header').removeClass('is-active');

        if (depth != 1) {
          $('.dim').removeClass('is-active');
          $('.gnb').removeClass('is-active');
        }
        /*if($('body').hasClass('is-black')){
            $('body').addClass('is-black');
        }*/

      }

      if ($('.main-banner').length) {
        if ($('.header').hasClass('is-bg-white')) {
          $('body').removeClass('is-black');
          $('body').addClass('is-white');
        } else {
          if ($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')) {
            $('body').removeClass('is-black');
            $('body').addClass('is-white');
          } else {
            $('body').removeClass('is-white');
            $('body').addClass('is-black');
          }
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
        $('body').removeClass('is-white');
        $('body').removeClass('is-black');
        $('body').addClass('is-white');
        $('.header').addClass('is-bg-white');
        status = true;
      } else {
        $('.search').removeClass('is-active');
        $('.type-search').removeClass('is-active');

        if ($(window).scrollTop() > 0) {
          $('body').removeClass('is-black');
          $('body').addClass('is-white');
        } else {
          $('.header').removeClass('is-bg-white');

          if ($('.main-banner').length > 0 && $('.main-banner__item').length > 1) {
            if ($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')) {
              $('body').removeClass('is-black');
              $('body').addClass('is-white');
            } else {
              $('body').removeClass('is-white');
              $('body').addClass('is-black');
            }
          } else {
            $('body').removeClass('is-black');
            $('body').addClass('is-white');
          }
        }

        status = false;
      }
    }

    $('.js-search-open').on('click', jsOpenSearchLayer); // 헤더 검색박스 필터 버튼

    function searchFilterButton() {
      var item = '.main-search__item';
      $(item).removeClass('is-active');
      $(this).addClass('is-active');
      $('.main-search__top').hide(); // 버튼클릭시 검색결과 텍스트 숨기기

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
  // 프로모션 - 스크롤 시 패럴랙스 효과


  if ($('.parallax-wrap').length > 0) {
    $(window).scroll(function () {
      var scroll = $(this).scrollTop(); //var pinkScroll = -scroll/3

      var yellowScroll = -scroll / 1; //      $('.parallax-01').css({
      //        'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
      //      });
      //      $('.parallax-02').css({
      //        'transform': 'translate3d(0,' + yellowScroll + 'px,0)'
      //      }); //$('.parallax-02').css({'transform' : 'matrix3d(0,'+ yellowScroll +'px,0)'})
    });
  }

  function scrollTopBtn() {
    $('html, body').animate({
      scrollTop: '0'
    }, 340);
  }

  $(document).on('click', '.js-scrollTop', scrollTopBtn); //--END[플로팅버튼]----------------

  /*---------------------------
   * [Scroll]
   ---------------------------*/

  var $sc, $winH, $divH, $docH, $prHeight, $tot;
  var scHeight;
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
            /*if ($divH > 960) {
                $('.detail-tab').removeClass('fixed');
            }*/
          } else {
            positionFixed($('.header').height() + 10);
          }
        }

        $('.detail-height').addClass('is-summary');
      } else {
        $('.detail-tab').removeClass('fixed');
        positionFixed(''); //default css

        $('.detail-height').removeClass('is-summary');
      } // 스크롤 0일때 초기화

      /*
      if ($sc == 0) {
          $('.detail-tab__item').removeClass('is-current');
          $('.detail-tab__item').eq(0).addClass('is-current');
          $('.detail-tab__info').eq(0).addClass('is-current');
      }*/


      $('.product-option-fix').css($styleOpt);
      return;
    });
  } // 주문서 배송지 option fix scroll


  if ($('.payment').length > 0) {
    $(window).on('scroll', function () {
      $sc = $(document).scrollTop();
      $docH = $(document).height();
      $winH = $(window).height();
      $divH = $('.payment-left').height();
      $prHeight = $('.payment-right').height() + 50;
      scHeight = $('.payment').prop('scrollHeight');
      $tot = scHeight - $prHeight;

      if ($sc < 100) {
        positionFixed(''); //default css
      } else {
        if ($sc >= $tot) {
          positionAbsolute($divH - 200);
        } else {
          positionFixed($divH);
          positionFixed($('.header').height() + 20);
        }
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
    contents = $('[class *= -tab__info]'),
        //tab content
    idx = $(this).parent().index();
    $(this).closest(tab).children().removeClass('is-current');
    $(this).parent(item).addClass('is-current');
    contents.removeClass('is-current');
    contents.eq(idx).addClass('is-current'); //왼쪽 탭 고정시키기

    $('html, body').animate({
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
    contents = $('[class *= -tab__info]'),
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

  $(document).on('click', '.js-payment-open', paymentTab); // 고객센터 > 멤버쉽 탭

  function membershipTab() {
    var item = '[class $= __item]',
        //li
    tab = '[class $= -tab__fix]',
        //ul
    contents = $('[class *= -tab__info]'),
        //tab content
    idx = $(this).parent().index();
    $(this).closest(tab).children().removeClass('is-current');
    $(this).parent(item).addClass('is-current');
    contents.removeClass('is-current');
    contents.eq(idx).addClass('is-current');
    return false;
  }

  $(document).on('click', '.js-membership-tab', membershipTab); //스토어 탭

  function storesTab() {
    var item = '[class $= __item]',
        //li
    tab = '[class $= -tab__fix]',
        //ul
    contents = $('[class *= -tab__info]'),
        //tab content
    idx = $(this).parent().index();
    $(this).closest(tab).children().removeClass('is-current');
    $(this).parent(item).addClass('is-current');
    contents.removeClass('is-current');
    contents.eq(idx).addClass('is-current');
    return false;
  }

  $(document).on('click', '.js-stores-tab', storesTab); //--END[탭] ----------------------

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
          select = link.parentNode.parentNode; //ul

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
  } //$(document).on('click','.product-icon__link',productItem);
  // 좋아요버튼 active style


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
    location.href = $(this).attr('href');
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

  $(document).on('input', '.js-table-checkAll', checkBoxChkAll);
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

  $(document).on('click', '.js-faq-more', faqMore); //마이페이지 :: qna 더보기(아코디언)

  function myQnaMore() {
    var parent = $(this).closest('.myQna-wrap__item');

    if (parent.hasClass('is-active')) {
      parent.removeClass('is-active');
    } else {
      $('.myQna-wrap__item').removeClass('is-active');
      parent.addClass('is-active');
    }
  }

  $(document).on('click', '.js-myQna-more', myQnaMore); //--END[dropdown::아코디언] ----------------------

  /*---------------------
    * [swiper slider]
    ---------------------*/
  //상품상세

  if ($('.detail-thumb').length > 0) {
    var slideButtonClassName = function slideButtonClassName(ele) {
      $('.detail-thumb--prev, .detail-thumb--next').removeClass('swiper-button-disabled');

      if (ele.activeIndex === 0) {
        $('.detail-thumb--prev').addClass('swiper-button-disabled');
      }

      if (ele.activeIndex === ele.imagesLoaded - 1) {
        $('.detail-thumb--next').addClass('swiper-button-disabled');
      }

      console.group('-----------');
      console.log('ee : ', ele);
      console.groupEnd();
    };

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
      },
      on: {
        slideChange: function slideChange() {
          slideButtonClassName(this);
        },
        click: function click() {
          slideButtonClassName(this);
        }
      }
    });
  } //연관제품 슬라이드
  // 프로모션 - 스크롤 시 패럴랙스 효과


  if ($('.parallax-wrap').length > 0) {
    $(window).scroll(function () {
      $('.parallax-img').removeClass('animate__animated');
      $('.parallax-img').removeClass('animate__fadeInDown'); //스크롤 이벤트

      parallaxMove();
    });
  } // 말풍선 클릭 시 이벤트
  /////////////////////


  function parallaxMove() {
    var parallax01 = document.querySelector('.parallax-01');
    var parallax02 = document.querySelector('.parallax-02');
    var parallax03 = document.querySelector('.parallax-03');
    var parallax04 = document.querySelector('.parallax-04');
    var parallax05 = document.querySelector('.parallax-05');
    var parallax06 = document.querySelector('.parallax-06');
    var parallax07 = document.querySelector('.parallax-07');
    var parallax08 = document.querySelector('.parallax-08');
    var parallax09 = document.querySelector('.parallax-09');
    var parallax10 = document.querySelector('.parallax-10');

    var init = function init(targetObject, matrix1, matrix2) {
      console.log("### window.scrollY : " + window.scrollY);
      var scrollY = window.scrollY;
      var matrix = multiply(matrix1, matrix2);
      window.addEventListener('scroll', function () {
        updateScroll(targetObject, matrix);
      });
    };

    var scrollY = window.scrollY;
    var calcScrollY = parseInt(scrollY / 2) - 25; //	var targetList = [ parallax01, parallax02, parallax03, parallax04, parallax05, parallax06, parallax07, parallax08, parallax09, parallax10 ];

    var targetList = [parallax01, parallax05, parallax03, parallax02, parallax09, parallax04, parallax07, parallax06, parallax08, parallax10];

    for (var i = 0; i < targetList.length; i++) {
      var gap = i * 30;
      var matrix1 = translateY(-600 - gap);
      var matrix2 = identity();

      if (calcScrollY >= gap) {
        init(targetList[i], matrix1, matrix2);
      }
    }

    if (scrollY <= 0) {
      for (var i = 0; i < targetList.length; i++) {
        var matrix1 = translateY(0);
        var matrix2 = identity();
        init(targetList[i], matrix1, matrix2);
      }
    }
  }

  function updateScroll(target, matrix) {
    var scrollPos = window.scrollY;
    var progress = scrollPos / 700;

    var m = _toConsumableArray(matrix);

    m[0] = progress * (matrix[0] - 1) + 1;
    m[1] = progress * matrix[1];
    m[2] = progress * matrix[2];
    m[3] = progress * matrix[3];
    m[4] = progress * matrix[4];
    m[5] = progress * (matrix[5] - 1) + 1;
    m[6] = progress * matrix[6];
    m[7] = progress * matrix[7];
    m[8] = progress * matrix[8];
    m[9] = progress * matrix[9];
    m[10] = progress * (matrix[10] - 1) + 1;
    m[11] = progress * matrix[11];
    m[12] = progress * (matrix[12] / 100) * 100;
    m[13] = progress * (matrix[13] / 100) * 100;
    m[14] = progress * (matrix[14] / 100) * 100;
    m[15] = progress * (matrix[15] - 1) + 1;
    setTransform(target, toString(m));
  }

  function setTransform(target, transform) {
    target.style.transform = transform;
    target.style.WebkitTransform = transform;
  }

  function translateY(distance) {
    var matrix = identity();
    matrix[13] = distance;
    return matrix;
  }

  function toString(source) {
    return "matrix3d(".concat(format(source).join(', '), ")");
  }

  function format(source) {
    if (source.length === 16) {
      return source;
    }
  }

  function identity() {
    var matrix = [];

    for (var i = 0; i < 16; i++) {
      i % 5 == 0 ? matrix.push(1) : matrix.push(0);
    }

    return matrix;
  }

  function multiply(m, x) {
    var fm = format(m);
    var fx = format(x);
    var product = [];

    for (var i = 0; i < 4; i++) {
      var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]];

      for (var j = 0; j < 4; j++) {
        var k = j * 4;
        var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]];
        var result = row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];
        product[i + k] = result;
      }
    }

    return product;
  } /////////////////////


  function bubbleEvent() {
    var bubbleItem = $(this);
    setTimeout(function () {
      bubbleItem.fadeOut(500);
      bubbleItem.fadeIn(3000);
    }, 300);
  }

  $(document).on('mouseover', '.js-click-bubble', bubbleEvent); //말풍선 클릭이벤트

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
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.promotion-slide-paginationSecond',
        clickable: true
      },
      navigation: {
        nextEl: ".model-next-btn",
        prevEl: ".model-prev-btn"
      }
    });
  } //스토어 스페셜 슬라이드


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
  } // project - about 매장슬라이드


  if ($('.js-find-slide').length > 0) {
    var findSlide = new Swiper('.js-find-slide', {
      loop: true,
      speed: 500,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.find-slide-pagination',
        clickable: true
      }
    });
    findSlide.on('slideChange', function () {
      var num = findSlide.realIndex + 1;
      var findStoreElem = document.querySelectorAll('.find-store__item');
      Array.prototype.forEach.call(findStoreElem, function (findElem) {
        findElem.classList.remove('is-active');
      });
      document.querySelector(".find-store__item[data-num='" + num + "']").classList.add('is-active');
    });
  } // 스크롤매직 모션사용


  if ($('.motion-up').length > 0) {
    var controller = new ScrollMagic.Controller();
    $('.motion-up').each(function () {
      var Opacity = new ScrollMagic.Scene({
        triggerElement: this.children[0],
        triggerHook: 0.9
      }).reverse(false).setClassToggle(this, 'motion-up--active').addTo(controller);
    });
  }

  if ($('.js-findIntroduce1-slide').length > 0) {
    var findIntroduceSlide1 = new Swiper('.js-findIntroduce1-slide', {
      loop: true,
      speed: 500,
      pagination: {
        el: '.findIntroduce-slide__dot',
        clickable: true
      }
    });
  }

  if ($('.js-findIntroduce2-slide').length > 0) {
    var findIntroduceSlide2 = new Swiper('.js-findIntroduce2-slide', {
      loop: true,
      speed: 500,
      pagination: {
        el: '.findIntroduce-slide__dot2',
        clickable: true
      }
    });
  } // 프로젝트페이지 - 주소복사 기능


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
  } // 로그인 후 - 상단메뉴클릭 시 레이어 노출


  $('.js-mypage').on('click', function (e) {
    e.preventDefault();

    if ($('.header-mypage').hasClass('is-active')) {
      $('.header-mypage').removeClass('is-active');
    } else {
      $('.header-mypage').addClass('is-active');
    }
  });

  function pagingOptionChange() {
    if (!mouseEnterCheck) {
      if ($('.header').hasClass('is-bg-white')) {
        $('body').removeClass('is-black');
        $('body').addClass('is-white');
      } else {
        if ($('.main-banner__item[data-bg="white"]').hasClass('swiper-slide-active')) {
          $('body').removeClass('is-black');
          $('body').addClass('is-white');
        } else {
          $('body').removeClass('is-white');
          $('body').addClass('is-black');
        }
      }
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
    var mainSlide = new Swiper('.main-banner__container', {
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
      navigation: {
        nextEl: ".main-banner--next",
        prevEl: ".main-banner--prev"
      },
      on: {
        init: function init() {
          pagingOptionChange();
          $('.main-banner__progressbar').removeClass("animate");
          $('.main-banner__progressbar').removeClass("active");
          $('.main-banner__progressbar').eq(0).addClass("animate");
          $('.main-banner__progressbar').eq(0).addClass("active");
        },
        slideChange: function slideChange() {
          pagingOptionChange();
        },
        slideChangeTransitionStart: function slideChangeTransitionStart() {
          $('.main-banner__progressbar').removeClass("animate");
          $('.main-banner__progressbar').removeClass("active");
          $('.main-banner__progressbar').eq(0).addClass("active");
          pagingOptionChange();
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          $('.main-banner__progressbar').eq(0).addClass("animate");
          pagingOptionChange();
        },
        beforeTransitionStart: function beforeTransitionStart() {
          pagingOptionChange();
        }
      }
    });
  } //--END[swiper slider]-----------------------------


  if ($('.main-new').length > 0 && $('.main-new__item').length > 1) {
    var eventSliderTouch = false;
    var mainNewSlide = new Swiper('.main-new__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 3,
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
      navigation: {
        nextEl: ".main-new__next",
        prevEl: ".main-new__prev"
      },
      on: {
        touchMove: function touchMove() {
          eventSliderTouch = true;
        },
        touchEnd: function touchEnd() {
          if (eventSliderTouch) {
            eventSliderTouch = false;
            this.params.speed = 500;
          }
        }
        /*transitionEnd: function() {
            this.params.speed = 10000;
        },*/

      }
    });
    /*슬라이드 온클릭 시 자동슬라이드 정지*/

    $(document).on('click', mainNewSlide, function () {
      mainNewSlide.autoplay.stop(); //mainNewSlide.speed = 500;
    });
  } //메인 배너슬라이드2


  if ($('.main-banner2').length > 0 && $('.main-banner2__item').length > 1) {
    var mainBannerProgressbarOpt = {
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
        el: ".main-banner2__pagination",
        type: "fraction"
      },
      on: mainBannerProgressbarOpt
    };
    var mainSlide = new Swiper('.main-banner2__container', mainBannerOption);
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
  } //main collection


  if ($('.main-collection').length > 0 && $('.main-collection__item').length > 1) {
    var eventSliderTouch = false;
    var mainCollectionSlide = new Swiper('.main-collection__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 3,
      centeredSlides: true,
      speed: 10000,
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: true
      },
      pagination: {
        el: ".main-collection__pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".main-collection__next",
        prevEl: ".main-collection__prev"
      },
      on: {
        touchMove: function touchMove() {
          eventSliderTouch = true;
        },
        touchEnd: function touchEnd() {
          if (eventSliderTouch) {
            eventSliderTouch = false;
            this.params.speed = 500;
          }
        }
        /*transitionEnd: function() {
            this.params.speed = 10000;
        },*/

      }
    });
    /*슬라이드 온클릭 시 자동슬라이드 정지*/

    $(document).on('click', mainCollectionSlide, function () {
      mainCollectionSlide.autoplay.stop();
    });
  } //메인배너4 슬라이드


  if ($('.main-banner4').length > 0 && $('.main-banner4__item').length > 1) {
    var bottomSlide = new Swiper('.main-banner4__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 'auto',
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".main-banner4__pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".main-banner4__next",
        prevEl: ".main-banner4__prev"
      },
      on: {
        init: function init() {
          var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
          var bg = slide.data("bg");

          if ($('.main-banner4__item').find('.swiper-slide-active').data('bg') === 'white') {
            $('.main-banner4__pagination').removeClass('is-black');
            $('.main-banner4__pagination').addClass('is-white');
          } else {
            $('.main-banner4__pagination').removeClass('is-white');
            $('.main-banner4__pagination').addClass('is-black');
          }

          $('.main-banner4__progressbar').removeClass("animate");
          $('.main-banner4__progressbar').removeClass("active");
          $('.main-banner4__progressbar').eq(0).addClass("animate");
          $('.main-banner4__progressbar').eq(0).addClass("active");
        },
        slideChangeTransitionStart: function slideChangeTransitionStart() {
          $('.main-banner4__progressbar').removeClass("animate");
          $('.main-banner4__progressbar').removeClass("active");
          $('.main-banner4__progressbar').eq(0).addClass("active");
        },
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          $('.main-banner4__progressbar').eq(0).addClass("animate");
        },
        beforeTransitionStart: function beforeTransitionStart() {
          var slide = $(this.$wrapperEl[0]).find(".swiper-slide-active");
          var bg = slide.data("bg");

          if ($('.main-banner4__item').find('.swiper-slide-active').data('bg') === 'white') {
            $('.main-banner4__pagination').removeClass('is-black');
            $('.main-banner4__pagination').addClass('is-white');
          } else {
            $('.main-banner4__pagination').removeClass('is-white');
            $('.main-banner4__pagination').addClass('is-black');
          }
        }
      }
    });
    /*슬라이드 온클릭 시 자동슬라이드 정지*/

    $(document).on('click', mainSlide, function () {
      mainSlide.autoplay.stop();
    });
  } //--END[swiper slider]-----------------------------

}); //jQuery
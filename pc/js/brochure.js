"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

(function () {
  window.Brochure = window.Brochure || {};
  var select = {
    section: '.brochure',
    layerPopup: '.popup'
  };

  var Brochure = /*#__PURE__*/function () {
    function Brochure(element) {
      _classCallCheck(this, Brochure);

      this.el = {
        section: element
      };
      this.swiperName = {
        productSwiper: '#product-swiper'
      };
      Brochure.instances.set(element, this);
      this.init();
    }

    _createClass(Brochure, [{
      key: "init",
      value: function init() {
        this.setElements();
        this.tabEvent();
        this.changeImages();
        this.swiperEvent();
        this.motionEvents();
      }
    }, {
      key: "reInit",
      value: function reInit() {}
    }, {
      key: "setElements",
      value: function setElements() {
        this.el.visualVideoBox = this.el.section.querySelector('.visual__video-box');
        this.el.visualVideo = this.el.section.querySelector('.visual__video');
        this.el.visualDescBox = this.el.section.querySelector('.visual__desc-box');
        this.el.visualProduct = this.el.section.querySelector('.visual__product');
        this.el.visualLinkWrap = this.el.section.querySelector('.visual__product-link-wrap');
        this.el.visualBtnWrap = this.el.section.querySelector('.visual__btn-wrap');
        this.el.visualLink = this.el.section.querySelector('.visual__link');
        this.el.tabBtn = this.el.section.querySelectorAll('.product__btn');
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {}
    }, {
      key: "tabEvent",
      value: function tabEvent() {
        var _this = this;

        this.el.tabBtn.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var tabBtnData = btn.parentNode.getAttribute('data-tab-menu');
            _this.el.visualVideoBox.style.display = 'none';

            _this.el.visualDescBox.classList.remove('is-active');

            _this.el.visualDescBox.style.display = 'none';
            _this.el.visualProduct.style.display = 'block';
            _this.el.visualLinkWrap.style.display = 'block';
            _this.el.visualBtnWrap.style.display = 'block';

            _this.el.visualVideo.pause();

            btn.parentNode.classList.add('is-active');

            _this.el.tabBtn.forEach(function (otherBtn) {
              if (btn !== otherBtn) {
                otherBtn.parentNode.classList.remove('is-active');
              }
            });

            _this.el.tabCont = btn.closest('[data-tab]').querySelectorAll('[data-tab-content]');

            _this.el.tabCont.forEach(function (el) {
              var tabContData = el.getAttribute('data-tab-content');

              if (tabBtnData === tabContData) {
                el.classList.add('is-active');
              } else {
                el.classList.remove('is-active');
              }
            });
          });
        });
      }
    }, {
      key: "changeImages",
      value: function changeImages() {
        var _this2 = this;

        var detailImg = document.querySelectorAll('.product-detail__img > img');
        this.el.tabBtn.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var productData = btn.getAttribute('data-product');
            _this2.el.visualLink.href = "https://www.stylelq.com/fr/product/productView.do?PRD_MST_CD=".concat(productData);
            detailImg.forEach(function (el, index) {
              var productIndex = String(index + 1).padStart(2, '0');
              el.src = "https://cdn.louisclub.com/static/fr/img/brochure/monogram/".concat(productData, "/img_product_detail_").concat(productIndex, ".jpg");
            }); // 제품 디테일

            var bagInfo_01 = '르퐁 쇼퍼백';
            var bagInfo_02 = '르퐁 백백';
            var bagInfo_03 = '르퐁 호보백';
            var bagInfo_04 = '르퐁 토트백';
            var materialInfo_01 = '소가죽, PVC 가죽';
            var itemDesc_01 = '숄더백 및 트래블백으로 착용 가능';
            var itemDesc_02 = '백백 및 트래블백으로 착용 가능';
            var itemDesc_03 = '숄더백 및 크로스백으로 착용 가능';
            var itemDesc_04 = '토트백 및 크로스백으로 착용 가능';
            var point_01 = '내부 지퍼칸 1개';
            var point_02 = '내부 오픈칸 1개';
            var point_03 = '탈부착 파우치 1개';
            var point_04 = '탈부착 스트랩 1개';
            var point_05 = '탈부착 스트랩 2개';
            var popDetailText = {
              LLHS1MG01FA5BE0191: [bagInfo_01, materialInfo_01, itemDesc_01, '33 x 27 x 14 cm', "".concat(point_01, "<br>").concat(point_02, "<br>").concat(point_03)],
              LLHS1MG02FB2BE0191: [bagInfo_02, materialInfo_01, itemDesc_02, '22 x 23.5 x 11 cm', "".concat(point_02)],
              LLHS1MG03FA0BE0191: [bagInfo_03, materialInfo_01, itemDesc_03, '27.5 x 26 x 9 cm', "".concat(point_02, "<br>").concat(point_05)],
              LLHS1MG04FA0BE0191: [bagInfo_03, materialInfo_01, itemDesc_03, '25 x 19 x 8 cm', "".concat(point_02, "<br>").concat(point_05)],
              LLHS1MG05FA0BE0191: [bagInfo_03, materialInfo_01, itemDesc_03, '22 x 13 x 6.5 cm', "".concat(point_02, "<br>").concat(point_05)],
              LLHS1MG06FA4BE0191: [bagInfo_04, materialInfo_01, itemDesc_04, '25 x 27.5 x 12 cm', "".concat(point_01, "<br>").concat(point_02, "<br>").concat(point_04)],
              LLHS1MG07FA4BE0191: [bagInfo_04, materialInfo_01, itemDesc_04, '20 x 22 x 9 cm', "".concat(point_01, "<br>").concat(point_02, "<br>").concat(point_04)]
            };
            var text = popDetailText[productData];
            var popDetailInfo = document.querySelector('.popup__content .product-detail__info-list');
            var popInfoItem = document.querySelectorAll('.product-detail__info-list .product-detail__info-item');
            popInfoItem.forEach(function (el, index) {
              if (text[index]) {
                el.innerHTML = text[index];
              } else {
                el.innerHTML = '';
              }
            }); // popInfoItem 추가

            for (var i = popInfoItem.length; i < text.length; i++) {
              var addInfoItem = document.createElement('li');
              addInfoItem.innerHTML = text[i];
              addInfoItem.classList.add('product-detail__info-item');
              popDetailInfo.appendChild(addInfoItem);
            } // popInfoItem 삭제


            for (var _i = popInfoItem.length; _i > text.length; _i--) {
              popDetailInfo.removeChild(popInfoItem[_i - 1]);
            }
          });
        });
      }
    }, {
      key: "swiperEvent",
      value: function swiperEvent() {
        var productSwiper = new Swiper(this.swiperName.productSwiper, {
          slidesPerView: 'auto',
          slidesPerGroup: 4,
          loop: false,
          watchOverflow: true,
          freeMode: false,
          pagination: {
            el: '.product__nav',
            clickable: false,
            type: 'bullets',
            // 버튼 모양 결정 "bullets", "fraction"
            renderBullet: function renderBullet(index, className) {
              // className이 기본값이 들어가게 필수 설정
              return '<span class="' + className + '">' + '<span class="blind">' + (index + 1) + '</span>' + '</span>';
            } // renderFraction: function (currentClass, totalClass) { // type이 fraction일 때 사용
            //     return '<span class="' + currentClass + '"></span>' +
            //         '<span class="' + totalClass + '"></span>';
            // }

          }
        });
      }
    }, {
      key: "motionEvents",
      value: function motionEvents() {
        var _this3 = this;

        setTimeout(function () {
          _this3.el.visualVideo.play();
        });
        this.el.visualVideo.addEventListener('ended', function () {
          _this3.el.visualVideo.parentNode.classList.add('is-motion');

          _this3.el.visualDescBox.classList.add('is-active');
        });
      }
    }], [{
      key: "createSelector",
      value: function createSelector(data) {
        if (typeof data === 'string') {
          return document.querySelector(data);
        }
      }
    }]);

    return Brochure;
  }();

  var Modal = /*#__PURE__*/function () {
    function Modal(element) {
      _classCallCheck(this, Modal);

      this.el = {
        section: element
      };
      this.swiperName = {
        detailSwiper: '#detail-swiper'
      };
      this.hadler = {
        closeModal: this.closeModal.bind(this)
      };
      Modal.instances.set(element, this);
      this.init();
    }

    _createClass(Modal, [{
      key: "init",
      value: function init() {
        this.setElements();
        this.bindEvents();
      }
    }, {
      key: "setElements",
      value: function setElements() {
        this.el.closeBtn = this.el.section.querySelector('.popup__btn'); // this.el.tabMenu = this.el.section.querySelector('[data-tab-menu]')
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        this.el.closeBtn.removeEventListener('click', this.hadler.closeModal);
        this.el.closeBtn.addEventListener('click', this.hadler.closeModal);
      }
    }, {
      key: "openModal",
      value: function openModal() {
        this.el.section.style.display = 'block';
        document.querySelector('body').classList.add('is-hidden');
        this.popupSwiperEvent();
      }
    }, {
      key: "closeModal",
      value: function closeModal() {
        this.el.section.style.display = 'none';
        document.querySelector('body').classList.remove('is-hidden');
      }
    }, {
      key: "popupSwiperEvent",
      value: function popupSwiperEvent() {
        var popupSwiper = new Swiper(this.swiperName.detailSwiper, {
          slidesPerView: 1,
          loop: false,
          watchOverflow: true,
          freeMode: false,
          navigation: {
            nextEl: '.product-detail__btn--next',
            prevEl: '.product-detail__btn--prev'
          }
        });
      }
    }]);

    return Modal;
  }();

  Brochure.instances = new WeakMap();
  Modal.instances = new WeakMap(); // Brochure

  var init = function init() {
    _toConsumableArray(document.querySelectorAll(select.section)).forEach(function (el) {
      if (!Brochure.instances.has(el)) {
        new Brochure(el);
      }
    });
  }; // Modal


  var initModal = function initModal() {
    _toConsumableArray(document.querySelectorAll(select.layerPopup)).forEach(function (el) {
      if (!Modal.instances.has(el)) {
        new Modal(el);
      } else {
        var instances = Modal.instances.get(el);
        instances.init();
      }
    });
  };

  var openModal = function openModal(target) {
    var el = Brochure.createSelector(target);
    var modal;

    if (Modal.instances.has(el)) {
      modal = Modal.instances.get(el);
    } else {
      modal = new Modal(el);
    }

    modal.openModal();
  };

  var closeModal = function closeModal(target) {
    var el = Brochure.createSelector(target);
    var modal;

    if (Modal.instances.has(el)) {
      modal = Modal.instances.get(el);
    } else {
      modal = new Modal(el);
    }

    modal.closeModal();
  };

  document.addEventListener('DOMContentLoaded', function () {});

  window.onload = function () {
    init();
    initModal();
  };

  window.Brochure = {
    init: init,
    initModal: initModal,
    openModal: openModal,
    closeModal: closeModal
  };
})();
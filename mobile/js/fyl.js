"use strict";

jQuery(function () {
  $(document).ready(function () {
    // 영상재생 및 정지

    /*function videoPlay(){
        $('jsPlayVideo').pause();
    }
    $(document).on('click', '.jsPlayButton', videoPlay);*/
    // opacity 이벤트
    $(window).on('scroll', function () {
      var Delay = 300;
      /*for (var i = 0; i < Delay; i++){
          $('.splitted').animate({opacity:'1'});
      }*/

      $('.splitted1').animate({
        opacity: '1'
      }, Delay, function () {
        $('.splitted2').animate({
          opacity: '1'
        }, Delay, function () {
          $('.splitted3').animate({
            opacity: '1'
          }, Delay, function () {
            $('.splitted4').animate({
              opacity: '1'
            }, Delay, function () {
              $('.splitted5').animate({
                opacity: '1'
              }, Delay, function () {
                $('.splitted6').animate({
                  opacity: '1'
                }, Delay, function () {
                  $('.splitted7').animate({
                    opacity: '1'
                  }, Delay, function () {
                    $('.splitted8').animate({
                      opacity: '1'
                    }, Delay, function () {
                      $('.splitted9').animate({
                        opacity: '1'
                      }, Delay, function () {
                        $('.splitted10').animate({
                          opacity: '1'
                        }, Delay, function () {
                          $('.splitted11').animate({
                            opacity: '1'
                          }, Delay, function () {
                            $('.splitted12').animate({
                              opacity: '1'
                            }, Delay, function () {
                              $('.splitted13').animate({
                                opacity: '1'
                              }, Delay, function () {
                                $('.splitted14').animate({
                                  opacity: '1'
                                }, Delay, function () {
                                  $('.splitted15').animate({
                                    opacity: '1'
                                  }, Delay, function () {
                                    $('.splitted16').animate({
                                      opacity: '1'
                                    }, Delay, function () {
                                      $('.splitted17').animate({
                                        opacity: '1'
                                      }, Delay);
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
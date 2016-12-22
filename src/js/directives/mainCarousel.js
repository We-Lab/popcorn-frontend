

var angular = require('angular');

angular
  .module('PopcornListApp')
  .directive('mainCarousel', function() {
    return {
      'restrict' : 'EA',
      'templateUrl': '/views/mainCarousel.html',
      'controller': 'carouselController',
      'link': function(scope, element, attrs) {
        scope.repeatComplete = function() {

          function mainCarousel(){
          var $widget = $('#main-carousel');
          var $tabpanel = $('#main-carousel article');

          // indicator template추가
          var $tablist = $('<ol role="tablist">');
          var template_indicators =[
            '<li role="presentation">',
            '<a href=# role="tab">',
            '<span class="readable-hidden"></span>',
            '</a>',
            '</li>'
          ].join('');

          $.each($tabpanel, function(idx){
            var $panel = $tabpanel.eq(idx);
            var $tab = $(template_indicators);
                var label = $panel.attr('data-label');

                $tab.find('span').text(label||$panel.find(':header:eq(0)').text()||'슬라이드'+(idx+1));
                $tab.attr('title', label||$panel.find(':header:eq(0)').text()||'슬라이드'+(idx+1));
                $tab.appendTo($tablist);
          });

          $widget.prepend($tablist);

          $widget.attr({
            'class' : 'ui-carousel',
            'role' : 'region'
          });

          $tablist.addClass('ui-carousel-indicators');

          var $tabs = $tablist.find('[role="tab"]');
          $.each($tabs, function(idx){
            var $tab = $tabs.eq(idx);
            var num = readingZeroNum(idx);

            var slide_id = 'ui-carousel-slide--' + num;
            $tab.attr({
              'id' : 'ui-carousel-tab-' + num,
              'class' : 'ui-carousel-tab st-indigator',
              'aria-controls' : slide_id,
              'aria-selected' : false,
              'tabindex' : -1
            });

            var $panel = $tabpanel.eq(idx);
            $panel.attr({
              'class' : 'ui-carousel-tabpanel',
              'id' : slide_id,
              'role' : 'tabpanel',
              'aria-lebelledby' : 'ui-carousel-tab' + num,
              'aria-hidden' : true
            });
          });

          // 슬라이드를 감싸는 영역을 동적으로 생성
          $tabpanel.wrapAll('<div class="ui-carousel-tabpanel-wrapper">');

          $.each(['prev', 'next'], function(idx, feature){
            $('<button type="button" class="ui-carousel-button st-arrow-lightgray m-hidden t-hidden ui-carousel-button-'+feature+'">').html('<span class="readable-hidden"></span>').appendTo($widget);
          });

          //wrapper 의 width값 조절
          var screen_width = global.innerWidth;
          $tabpanel.parent().width(screen_width* $tabpanel.length);


          // 이벤트 핸들러
          $.each($tabs, function(idx){
            var $tab = $tabs.eq(idx);
            $tab.on('click', $.proxy(activeSlide, $tab));
          });

          function activeSlide(e){
            e.preventDefault();
            var index = getIndex.call(this);
            // console.log(index);
            //선택상태
            changeStateSelect.call(this);
            //감춤상태
            changeStateHidden.call(this);


            $tabpanel.parent().stop().animate({
              'left': $tabpanel.outerWidth()* index * -1
            },500, 'easeOutSine');

            updateButtonText(index);
          }

          // 선택된 탭의 부모 형제의 자식중 role속성이 tab인것응ㄹ 찾아 aria상태 변경

          function changeStateSelect(){
            this.parent().siblings().find('[role="tab"]').attr({
              'aria-selected' : false,
              'tabindex' : -1
            }).removeClass('st-indigator-active');

            this.attr({
              'aria-selected' : true,
              'tabindex' : 0
            }).addClass('st-indigator-active');
          }

          // 감춤상태
          function changeStateHidden(){
            var $panel = $tabpanel.filter('#' + this.attr('aria-controls'));

            $panel.siblings(['aria-selected']).attr({
              'aria-hidden' : true
            }).find('a').attr('tabindex', -1);
            $panel.attr({
              'aria-hidden' : false
            }).find('a').removeAttr('tabindex');
          }


          // 선택된 탭의 aria-controls 속성 값에서 인덱스 정보를 뽑아 반환
          function getIndex(){

            return Number(this.attr('aria-controls').split('--')[1]) - 1;
          }

          // 전달된 id인자값에 따라 활성화할 탭 필터링
          function activeTab(id){
            var $filter, type = $.type(id);

            if(type === 'number'){
              $filter = $tabs.eq(id -1);
            }
            else if( type === 'string'){
              $filter = $tabs.filter(id);
            }
            else{
              return console.error('숫자나 문자값이 아닙니다');
            }
            $filter.trigger('click');
          }

          activeTab(1);


          //----------------------------------------------------------------
          //  키보드 방향키로 indigator작동
          //-----------------------------------------------------------------
          $tabs.on('keydown', activeKeyboardNavigation);

          function activeKeyboardNavigation(e){
              var key = e.keyCode;

              var $tab = $tabs.filter('.st-indigator-active');
              var index = getIndex.call($tab) +1;
              var length = $tabs.length;

              if(key === 37 || key === 38){
                index = --index > 0 ? index : length;
              }
              else if( key === 39 || key === 40){
                index = ++index <= length ? index : 1;
              }
              else{ return; }

              activeTab(index);

              $tabs.filter('.st-indigator-active').focus();
          }

          ///----------------------------------------------------------------
          //  arrow-button으로 carousel 작동
          //-----------------------------------------------------------------
          var $buttons = $('.ui-carousel-button');
          $buttons.on('click', activeTabWidthButton);

          function activeTabWidthButton(){
            var $tab = $tabs.filter('.st-indigator-active');
            var index = getIndex.call($tab) + 1;
            var isClickPrevBtn = this.getAttribute('class').indexOf('prev') > -1;
            var length = $tabs.length;

            if(isClickPrevBtn){
              index = --index > 0 ? index : length;
            }
            else{
              index = ++index <= length ? index : 1;
            }
            activeTab(index);
          }

          function updateButtonText(idx){
            var $tab = $tabs.eq(idx - 1);
            var index = getIndex.call($tab);
            var $prevBtn = $('.ui-carousel-button-prev');
            var $nextBtn = $('.ui-carousel-button-next');
            var prevText = $tabs.eq(index - 1).find('span').text();
            var nextText = $tabs.eq(index + 1 === 3 ? 0 : index + 1).find('span').text();

            $prevBtn.find('span').text(prevText);
            $prevBtn.attr('title', prevText);
            $nextBtn.find('span').text(nextText);
            $nextBtn.attr('title', nextText);
          }


          // 헬퍼 함수
          /**
          * @function readingZeroNum * @param {number} idx
          * @return {string | number} */
          function readingZeroNum(idx) {
            var num=idx+1;
            return 10 > num ? '0' +num : num;
          }

       };

       mainCarousel();

      
          var $dim = $('.video-dim-background');
          var $video_button_td = $('.video-play');
          var $video_button_m = $('.video-play-m');
          var $video_pop_close = $('.video-pop-close');

          $video_button_td.on('click',function(){
             $dim.fadeIn();
          })

          $video_pop_close.on('click',function(){
             $dim.fadeOut();
          });

          $video_button_m.on('click',function(){
             $dim.fadeIn();
          })

          $video_pop_close.on('click',function(){
             $dim.fadeOut();
          });

          var stealcuts = $('.ui-carousel-tabpanel >img');

          // console.log(stealcuts);
          $.each(stealcuts,function(idx){
            var stealcut_imgs = stealcuts.attr('data-ng-src');
            // console.log(stealcut_imgs);
          });

         

        } // end
      }
    }
});

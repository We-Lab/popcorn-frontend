(function(window, $){
'use strict';

setTimeout(function(){

var $widget = $('#recommend-movie');
var $tabpanel = $widget.children();


var $tablist = $('<ol role="tablist">');
var template_indicators =[
  '<li role="presentation">',
  '<a href=# role="tab">',
  '<span class="readable-hidden"></span>',
  '<img>',
  '</a>',
  '</li>'
].join('');

$.each($tabpanel, function(idx){
  var $panel = $tabpanel.eq(idx);
  var $panel_img = $panel.children();
  var $tab = $(template_indicators);
  var label = $panel.attr('data-label'); 
  var img_label = $panel_img.attr('src'),
        img_alt = $panel_img.attr('alt');
       
      $tab.find('span').text(label||$panel.find(':header:eq(0)').text()||'슬라이드'+(idx+1));
      $tab.find('img').attr('src', img_label);
      $tab.find('img').attr('alt', img_alt);
      $tab.attr('title', label||$panel.find(':header:eq(0)').text()||'슬라이드'+(idx+1));
      $tab.appendTo($tablist);

      $panel.wrap('<div class="recommend-tabpanel-wrapper-small">');
});

$widget.prepend($tablist);


$widget.attr({
  'class' : 'recommend-carousel',
  'role' : 'region'
});

$tablist.addClass('recommend-indicators');

var $tabs = $tablist.find('[role="tab"]');
$.each($tabs, function(idx){
  var $tab = $tabs.eq(idx);
  var num = readingZeroNum(idx);

  var slide_id = 'ui-carousel-slide--' + num;
  $tab.attr({
    'id' : 'recommend-tab-' + num,
    'class' : 'recommend-tab',
    'aria-controls' : slide_id,
    'aria-selected' : false,
    'tabindex' : -1
  });

  var $panel = $tabpanel.eq(idx);
  $panel.attr({
    'class' : 'recommend-tabpanel',
    'id' : slide_id,
    'role' : 'tabpanel',
    'aria-lebelledby' : 'recommend-tab-' + num,
    'aria-hidden' : true
  });
});

var $tabpanel_parent = $tabpanel.parent();
// 슬라이드를 감싸는 영역, indicator를 감싸는 영역 동적으로 생성
// $tabpanel.wrapAll('<div class="recommend-tabpanel-wrapper">');
$tabpanel_parent.wrapAll('<div class="recommend-tabpanel-wrapper">');
$tablist.wrapAll('<div class="recommend-tablist-wrapper">');
// $.each($tabpanel, function(idx){
//   var $panel = $tabpanel.eq(idx);
//   var $panel_img = $panel.children();
//  $panel_img.wrap('<div class="recommend-panel-div">');
// });
var $tabpanel_wrapper = $('.recommend-tabpanel-wrapper');

//버튼 생성
$.each(['prev', 'next'], function(idx, feature){
  $('<button type="button" class="ui-carousel-button st-arrow-blue ui-carousel-button-'+feature+'">').html('<span class="readable-hidden"></span>').appendTo($widget);
});
// var $tablist_button = $tabpanel_wrapper.find(':button');
// $tablist_button.wrapAll('<div class="tablist-button-wrapper">');

//wrapper 의 width값 조절
var screen_width = global.innerWidth;
$tabpanel_parent.parent().width(screen_width* $tabpanel.length);
// $tablist.parent().width(screen_width);
// 
// $tabpanel_wrapper.fadeIn();

// 이벤트 핸들러
$.each($tabs, function(idx){
  var $tab = $tabs.eq(idx);
  $tab.on('click', $.proxy(activeSlide, $tab));
  // $.proxy(activeSlide, $tab);
});


function activeSlide(e){
  e.preventDefault();
  var index = getIndex.call(this);
  // //선택상태
  changeStateSelect.call(this);
  //감춤상태
  changeStateHidden.call(this);
 

  // $tabpanel.parent().fadeIn();
  // 
   $tabpanel_parent.parent().stop().animate({
    'left': $tabpanel_parent.outerWidth()* index * -1
  },500, 'easeOutSine');
    // $tabpanel.parent().css('display','block');

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


///----------------------------------------------------------------
//  arrow-button으로 carousel 작동
//-----------------------------------------------------------------

var $buttons = $('.ui-carousel-button');
$buttons.on('click', activeTabWidthButton);

function activeTabWidthButton(id){
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
  var nextText = $tabs.eq(index + 1 === 5 ? 0 : index + 1).find('span').text();

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
},800);
})(this, jQuery);


// (function(global, $){
// setTimeout(function(){

//   $recomment_choice_tablinks_finish = $('.recommend-choice-tablinks-finish');
//  $recommend_movie_random6 =$('#recommend-movie');

//  $recomment_choice_tablinks_finish.on('click',function(){
//        console.log('click');
//        if($recommend_movie_random6.is(':hidden')){
//         $recommend_movie_random6.slideDown('fast');
//        }
//        else{
//          $recommend_movie_random6.slideUp('fast');
//        }

//  });

// },800);
// })(this, jQuery);



(function(global, $){
'use strict';

setTimeout(function(){

$('.recommend-tabpanel-wrapper-small').on('click',function(){
        $(this).find('.recommend-tabpanel').addClass('flipped').mouseleave(function(){
            $(this).removeClass('flipped');
        });
        return false;
  });


},800);

})(this, jQuery);
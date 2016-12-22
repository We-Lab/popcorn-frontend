

 (function(window, $){

setTimeout(function(){
  // $(function() {
    var movie_info_still = document.querySelector('.movie-still');

    var movie_info_stillControlButtons = movie_info_still.querySelectorAll('button');
    var movie_info_stillView = movie_info_still.querySelector('.movie-still-view');


  var changeStillView = function(e) {
    var movie_info_stillImg = this.querySelector('img');
    var movie_info_view = movie_info_stillView.querySelector('img');
    var movie_info_src = movie_info_stillImg.getAttribute('src');
    var movie_info_alt = movie_info_stillImg.getAttribute('alt');

    // e.preventDefault();
    movie_info_view.setAttribute('src', movie_info_src);
    movie_info_view.setAttribute('alt', movie_info_alt);

  };

  for ( var i = 0, l = movie_info_stillControlButtons.length; i < l; i++ ) {
    movie_info_stillControlButtons[i].onclick = changeStillView;
  }


  $('.movie-comment-add-button').click(function() {
    if($(this).siblings('.movie-comment-rating-group').is(':hidden')) {
      $(this).siblings('.movie-comment-rating-group').slideDown('fast');
    } else {
      $(this).siblings('.movie-comment-rating-group').slideUp('fast');
    }
  });

  // $('.movie-comment-submit-button').click(function() {
  //   $(this).closest('.movie-comment-rating-group').slideUp('fast');
  // });



  $('.movie-dialogue-add-button').click(function() {
    if($(this).siblings('.movie-dialogue-select-group').is(':hidden')) {
      $(this).siblings('.movie-dialogue-select-group').slideDown('fast');
    } else {
      $(this).siblings('.movie-dialogue-select-group').slideUp('fast');
    }
  });

  $('.movie-dialogue-submit-button').click(function() {
    $(this).closest('.movie-dialogue-select-group').slideUp('fast');
  });



},800);
})(this, jQuery);



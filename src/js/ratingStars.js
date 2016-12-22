(function(window, $){

  setTimeout(function(){
  // $(function() {
    var movie_grades = document.querySelectorAll('.movie-grade');
    var stars_ratings = document.querySelectorAll('.stars-rating');

    var movie_grades_numbers = [];

    for ( var i = 0, l = movie_grades.length; i < l; i++ ) {
      var movie_grades_number = Number(movie_grades[i].childNodes[0].nodeValue);
      movie_grades_numbers.push(movie_grades_number);

      // console.log(movie_grades_number);

      if ( 0 <= movie_grades_number && movie_grades_number < 0.5 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars0-0.svg');
      } else if ( 0.5 <= movie_grades_number && movie_grades_number < 1 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars0-5.svg');
      } else if ( 1 <= movie_grades_number && movie_grades_number < 1.5 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars1-0.svg');
      } else if ( 1.5 <= movie_grades_number && movie_grades_number < 2 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars1-5.svg');
      } else if ( 2 <= movie_grades_number && movie_grades_number < 2.5 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars2-0.svg');
      } else if ( 2.5 <= movie_grades_number && movie_grades_number < 3 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars2-5.svg');
      } else if ( 3 <= movie_grades_number && movie_grades_number < 3.5 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars3-0.svg');
      } else if ( 3.5 <= movie_grades_number && movie_grades_number < 4 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars3-5.svg');
      } else if ( 4 <= movie_grades_number && movie_grades_number < 4.5 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars4-0.svg');
      } else if ( 4.5 <= movie_grades_number && movie_grades_number < 5 ) {
        stars_ratings[i].setAttribute('src', '../images/stars/stars4-5.svg');
      } else {
        stars_ratings[i].setAttribute('src', '../images/stars/stars5-0.svg');
      }
    }

    // console.log(movie_grades);
    // console.log(movie_grades_numbers);
    // console.log(stars_ratings);
  // });




  },1200);

})(this, jQuery);

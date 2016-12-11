(function(global) {
  'use strict';

  var still = document.querySelector('.movie-still');
  var stillControlButtons = still.querySelectorAll('a');
  var stillView = still.querySelector('.movie-still-view');


  var changeStillView = function(e) {
    var stillImg = this.querySelector('img');
    var view = stillView.querySelector('img');
    var src = stillImg.getAttribute('src');
    var alt = stillImg.getAttribute('alt');

    e.preventDefault();
    view.setAttribute('src', src);
    view.setAttribute('alt', alt);

  };

  for ( var i = 0, l = stillControlButtons.length; i < l; i++ ) {
    stillControlButtons[i].onclick = changeStillView;
  }
})(this);


(function(global) {
  'use strict';

  var radios = document.querySelectorAll('#star_rating input[type=radio]');
  var output = document.querySelector('#star_rating output');

  var do_something = function(stars) {
  	// An AJAX request could send the data to the server
  	output.textContent = stars;
  };

  // Iterate through all radio buttons and add a click
  // event listener to the labels
  Array.prototype.forEach.call(radios, function(el, i){
  	var label = el.nextSibling.nextSibling;
  	label.addEventListener("click", function(event){
  		do_something(label.querySelector('span').textContent);
  	});
  });

  // If the form gets submitted, do_something
  document.querySelector('#star_rating').addEventListener('submit', function(event){
  	do_something(document.querySelector('#star_rating :checked ~ label span').textContent);
  	event.preventDefault();
  	event.stopImmediatePropagation();
  });
})(this);

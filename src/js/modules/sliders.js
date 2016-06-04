define('sliders', ['jquery', 'flickity'], function($, Flickity) {

  'use strict';
  
  var slider = function () {
    
    var flkty = new Flickity( '.js-slider', {
      
    });

  };

  var init = function () {

    slider();

  };
  
  return {
    init: init
  };

});
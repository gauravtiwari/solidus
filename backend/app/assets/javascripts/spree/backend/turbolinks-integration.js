// Require this file if you plan to use Turbolinks in the Solidus admin
// It is necessary because extensions may use JS libs that make use of
// jQuery.ready instead of Spree.ready

Spree.jQueryReady = $.fn.ready;

// override jQuery.ready to use Spree.ready even if it was not used explicitly
$.fn.ready = function (callback) {
  console.warn("Using jQuery.ready() in Solidus is deprecated. Use Spree.ready() instead. Called from: ", callback);
  Spree.ready(callback);
};

Spree.ready = function(callback) {
  var eventName;
  
  if (supportsTurbolinks())
    eventName = 'turbolinks:load';
  else if (supportsTurbo()) {
    eventName = 'turbo:load';
  }
  
  if (supportsTurbolinks() || supportsTurbo()) {
    jQuery(document).on(eventName, function() {
      callback(jQuery);
    });
  } else {
    Spree.jQueryReady(callback);
  }
};

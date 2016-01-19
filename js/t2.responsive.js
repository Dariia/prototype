"use strict";

//example:
/*$(window).on('t2-responsive-small', function() {
	$('body').css('background', 'red');
});
$(window).on('t2-responsive-medium', function() {
	$('body').css('background', 'blue');
});
$(window).on('t2-responsive-large', function() {
	$('body').css('background', 'green');
});

$(window).on('t2-responsive', function(e ,dmq) {
	if(dmq == "small") {
		$('.t2-nav-header-global').hide();		
	}
	if(dmq == "medium" || dmq == "large") {
		$('.t2-nav-header-global').show();	
	}
});*/

var dmq_size  = "unknown";

t2.responsive = function () {

    var dev = false;

	var initialize = function () {};
	
    var detect_mq = {
        live: true, // Boolean: Trigger on window resize, true or false
        threshold: 300, // Integer: Threshold time after window resize, in milliseconds
        callback: function () {
            
            // If unknown
            if (dmq_size == "unknown") {
            	if (dev) { console.log('responsive layout: unknown'); }
            	return;
            }
            // If small layout
            if (dmq_size == "small") {
	            if (dev) { console.log('responsive layout: small'); }
	            $.event.trigger('t2-responsive-small');
            }
            // If medium layout
            if (dmq_size == "medium") {
	            if (dev) { console.log('responsive layout: medium'); }
	            $.event.trigger('t2-responsive-medium');
            }
            // If large layout
            if (dmq_size == "large") {
	            if (dev) { console.log('responsive layout: large'); }
	            $.event.trigger('t2-responsive-large');
            }
            $.event.trigger('t2-responsive', dmq_size);
        }
    };	
    
    return {
	    init : initialize,
        detect_mq : detect_mq
    };
}();

/*! detectMQ.js v0.3
 * https://github.com/viljamis/detectMQ.js
 * http://viljamis.com
 *
 * Copyright (c) 2012-2013 @viljamis
 * Available under the MIT license
 */

/*jslint browser: true, sloppy: true, vars: true, plusplus: true, indent: 2 */

(function (win) {

  // Default settings
  var dmq_timeout,                      // Do not modify
    doc       = win.document,           // Do not modify
    dmq       = t2.responsive.detect_mq || {},    // Do not modify
    live      = dmq.live || true,       // Boolean: Trigger on window resize, true or false
    threshold = dmq.threshold || 300,   // Integer: Threshold time before triggering (200ms+ recommended), in milliseconds
    callback  = dmq.callback || {},     // Do not modify
    //dmq_size  = "small",

    // Get style
    getStyle = function (el, pseudo, cssprop) {
      return win.getComputedStyle(el, pseudo)[cssprop];
    },

    // Get value
    getValue = function () {
      var dmq_contentValue = getStyle(doc.body, ":after", "content");

      // Return to avoid errors
      if (dmq_contentValue === null) {
        return;
      }

      // Replace single and double quotes
      dmq_size = dmq_contentValue.replace(/['"]/g, "");

      // Init callback
      callback();
    };

  // Add event listeners, W3C event model
  if (doc.addEventListener && typeof (window.getComputedStyle) !== "undefined") {

    // On load
    win.addEventListener("load", getValue, false);
    if (live === true) {

      // On resize
      win.addEventListener("resize", function () {
        clearTimeout(dmq_timeout);
        dmq_timeout = setTimeout(getValue, threshold);
      }, false);

    }

  }

}(this));
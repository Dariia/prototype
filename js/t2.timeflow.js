t2.timeflow = function () {
	var dev = false,
		initialize,
		action;

	initialize = function () {
        var isIE = false || !!document.documentMode,
        	isFirefox = typeof InstallTrigger !== 'undefined';

        if (isIE || isFirefox) {
        	action();
        }
	};

	action = function () {
        jQuery('.t2-timeflow').each(function (i, elm) {
        	jQuery(elm).find('.t2-item').each(function (i, elm) {
        		var container = jQuery(elm),
        			containerIndex = i,
        			previousContainer = jQuery(elm).prev();

        		// 1) Position right side wrappers
                jQuery(elm).find('.columns').has('.t2-wrapper').each(function (i, elm) {
                    var el = jQuery(elm);

                    if (el.hasClass('medium-push-12')) {
                        el.removeClass('medium-push-12');
                        el.removeClass('large-push-12');
                    }
                });

                // 2) Position steps
        		jQuery(elm).find('.columns').has('.t2-step').each(function (i, elm) {
        			var el = jQuery(elm),
        				parentEl = jQuery(elm).parent(),
        				stepEl = jQuery(elm).find('.t2-step');

        			if (el.hasClass('medium-pull-12')) {
        				el.prependTo(parentEl);

        			} else {
        				if (previousContainer.hasClass('t2-timeflow-right')) {
        					stepEl.css('top', '-45px');
        				}
        			}
        		});


        	});
        });
	};

	return {
		init: initialize
	};
}();
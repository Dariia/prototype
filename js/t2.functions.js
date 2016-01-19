t2.functions = function () {

    var dev = false;

    /* binds */
    var bind = {
        /* subtree modified */
        subtreeModified: function (el, func, once, resetTime) {
            if (dev) { console.log('t2.functions.bind.subtreeModified'); }
            var el = el || document;                            //el : element that shall be watched
            var isFunc = typeof func === 'function' || false;   //isFunc : check if function that shall be triggered is a function
            var delay = delay || false;                         //delay : add delay for firing action/supplied script.
            var tf = 0;                                         //times fired, counter.
            var delayTime = delayTime || 500;                   //delaytime in ms
            if (dev) { console.log('subtreeModified: el: ' + el + ', func: ' + func + ', isFunc: ' + isFunc + ', delay: ' + delay + ', delay time: ' + delayTime); }

            //action
            var action = function () {
                if (dev) { console.log('subtreeModified: action'); }
                if (isFunc) {
                    (func)(); //run function.
                    return;
                }
                if (dev) { console.log('subtreeModified: supplied function, is not seen as a function!'); }
            };

            //event delay timer
            var eventDelayTimer = function () {
                setTimeout(function () {
                    if (dev) { console.log('subtreeModified: delay'); }
                    tf = 0;
                    action();
                }, delayTime);
            };

            //bind event.
            jQuery(el).bind("DOMSubtreeModified", function (event) { //mutationObserver, a better choice?
                if (dev) { console.log('subtreeModified: event triggered'); }
                event.stopImmediatePropagation();
                if (!delay) {
                    action();
                    return;
                }
                else if (delay && ts === 0) {
                    tf = 1;
                    eventDelayTimer();
                    return;
                }
            });
        }
    };

    return {
        bind: bind
    };
}();
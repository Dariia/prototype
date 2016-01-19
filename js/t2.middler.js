/* t2-middler:
	looks for html attribute: data-t2-middler,
	finds child element: data-t2-middler-watch and calculates the difference in height and adds the difference divided by two as margin-top on the child element.
	
	functions: 
	- initialize
*/
"use strict";

t2.middler = function () {

    var dev = false;

    /* initialize */
    var initialize = function () {
        if (dev) { console.log('middler.init'); }
        middlerize();
        $(window).on('resize.fndtn.equalizer', function (e) {
            middlerize();
        });
    };
    
     /* middlerize */
    var middlerize = function (instance) {
        if (dev) { console.log('middler.middlerizing'); }
        var middlerInstance = $('[data-t2-middler]');
        middlerInstance.each(function () {
            
            var currentInstance = $(this);
            
            var childs = currentInstance.find('[data-t2-middler-watch]');
            childs.css("margin-top","0");
            
            
            var parentHeight = currentInstance.outerHeight(true);
            console.log('parent height '+parentHeight);
            
            
            childs.each(function(){
            	var child = $(this);
	            var childHeight = child.css("margin-top","0").outerHeight(true);
	            console.log('child height '+childHeight);
				var differens = Math.floor((parentHeight - childHeight)/2);
				child.css("margin-top", differens+"px");
            });
            
        });
    };
    
    return {
        init: initialize
    };
}();



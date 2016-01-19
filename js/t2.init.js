"use strict";
$(function () {
    /* run equalize */
    t2.equalize.init();
  
    /* run responsive */
    t2.responsive.init();

    $(document).foundation();

    $(window).on('t2-responsive', function (e, dmq) {
        document.cookie = 'resolution=' + dmq + '; path=/';
    });

    $(window).load(function () {
        t2_init();
    });
});

function t2_init() {
    new FastClick(document.body);


    if ($('[data-t2-equalize]').find("img").length > 0 ){
        t2.equalize.init();
    }

}
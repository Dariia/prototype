;jQuery.widget('tele2.loaderWidget', {

    _init: function () {
        this.loader = jQuery('<span class="loader"></span>');
        this.element.css('position','relative');
        this.element.append(this.loader);
    },
    show: function(){
        this.loader.show();
    },
    hide:function(){
        this.loader.hide();
    }
});

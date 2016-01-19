;jQuery.widget('tele2.viewMoreWidget', {
    button: null,
    block: null,
    options: {
        buttonSelector: '[data-role=viewmore-button]',
        blockSelector: '[data-role=viewmore-block]',
        isInitiallyVisible: false,
        lineItemsCount:2
    },
    _create: function () {
        this.button = this.element.find(this.options.buttonSelector);
    },
    _init:function(){
        this.block = this.element.find(this.options.blockSelector);
        this.blockItemsCount = this.block.children().length;
        this.lineItemsCount = parseInt(this.options.lineItemsCount);
        this.blockLineHeight = this.block.children(':first').outerHeight();
        this.blockFullHeight = Math.ceil(this.block.children().length / this.lineItemsCount ) * (this.blockLineHeight + 20);

        if (this.blockItemsCount > this.lineItemsCount) {
            this.block.height(this.blockLineHeight);
            this.block.css('overflow','hidden');
            this.button.show();
        }
        this._unbind();
        this._bind();
    },

    _bind: function () {
        this._on(this.button, {
            click: 'toggleHeight',
            touchend:'toggleHeight'
        })
    },
    _unbind:function(){
        this._off(this.button, 'click touchend');
    },
    toggleHeight: function (e) {
        var $this = this;
        e.stopPropagation();
        e.preventDefault();
        if(!$this.block.hasClass('opened')){
            $this.block.animate({height:$this.blockFullHeight},400);
            $this.button.find('.t2-magento-link').text('Visa mindre -');
        } else {

            $this.block.animate({height:$this.blockLineHeight},400);
            $this.button.find('.t2-magento-link').text('Visa fler +');
        }
        $(document.body).trigger("sticky_kit:recalc");
        $this.block.toggleClass('opened');
    }
});

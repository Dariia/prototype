;jQuery.widget('tele2.slideDownWidget', {
    button: null,
    block: null,
    options: {
        buttonSelector: '[data-role=slide-button]',
        blockSelector: '[data-role=slide-block]',
        isInitiallyVisible: false
    },

    _create: function () {
        this.button = this.element.find(this.options.buttonSelector);
        this.block = this.element.find(this.options.blockSelector);
        if (!this.options.isInitiallyVisible) {
            this.block.hide();
        }
        this._bind();
    },

    _bind: function () {
        this._on(this.button, {
            click: 'toggleSlide'
        })
    },

    toggleSlide: function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.block.slideToggle();
    },

    hideBlock: function () {
        this.block.slideUp();
    }
});

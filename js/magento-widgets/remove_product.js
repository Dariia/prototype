;jQuery.widget('tele2.removeProductWidget', {
    removeIconButton: null,
    removeButtonBlock: null,
    removeButtonYes: null,
    removeButtonNo: null,
    options: {
        removeIcon: '[data-role=remove-product-icon]',
        removeButtonsBlock: '[data-role=remove-product-buttons]',
        removeButtonYes:'[data-role=product-remove-yes]',
        removeButtonNo:'[data-role=product-remove-no]'
    },
    _create: function () {
        this.removeIconButton = this.element.find(this.options.removeIcon);
        this.removeButtonBlock = this.element.find(this.options.removeButtonsBlock);
        this.removeButtonYes = this.removeButtonBlock.find(this.options.removeButtonYes);
        this.removeButtonNo = this.removeButtonBlock.find(this.options.removeButtonNo);

        this._bind();
    },

    _bind: function () {
        this._on(this.removeIconButton, {
            click: 'showRemoveButtons',
            touchend:'showRemoveButtons'
        });
        this._on(this.removeButtonNo, {
            click: 'showRemoveIcon',
            touchend: 'showRemoveIcon'
        });
    },
    showRemoveButtons: function () {
        this.element.addClass('to-remove');
    },
    showRemoveIcon:function(){
        this.element.removeClass('to-remove');
    }
});

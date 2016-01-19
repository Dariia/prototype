;jQuery.widget('tele2.accordionWidget', {
    slideParent: null,
    slideItem: null,
    cloaseButton:null,
    showOneItem:false,
    options: {
        slideItem: '[data-role=accordion-slide-item]',
        slideParent: '[data-role=accordion-slide-parent]',
        closeButton:'[data-role=accordion-close-button]',
        accordionTypeOuter:'accordion-type-outer'
    },
    _create: function () {
        this.slideItem = this.element.find(this.options.slideItem);
        this.slideParent = this.element.find(this.options.slideParent);
        this.closeButton = this.element.find(this.options.closeButton);
        this.accordionTypeOuter = this.element.data(this.options.accordionTypeOuter) || false;
        this._bind();
    },

    _bind: function () {
        this._on(this.slideParent, {
            click: 'slideItems',
            touchend:'slideItems'
        });
        this._on(this.closeButton,{
            click: 'hideItem',
            touchend:'hideItem'
        });
    },
    slideItems: function (e) {
        e.stopPropagation();
        e.preventDefault();
        var $this = this,
            parent =$(e.target);

        if(this.accordionTypeOuter){
            $(parent).siblings().removeClass('active');
            var slideItem = this.element.find($this.options.slideItem).eq(parent.index());
            slideItem.siblings($this.options.slideItem).hide().end().slideToggle();
        } else {
            parent.next($this.options.slideItem).slideToggle();
        }

        parent.toggleClass('active');
    },
    hideItem: function(e){
        var $this = this,
            block = $(e.target).parent($this.options.slideItem);
        block.slideUp().prev($this.options.slideParent).removeClass('active');
    }
});

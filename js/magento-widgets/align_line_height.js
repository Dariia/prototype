;jQuery.widget('tele2.alignLineHeightWidget', {
    lineItem: null,
    alignElem: null,
    heightArr:null,
    maxElemHeight: null,
    options: {
        plusHeight:0,
        growingElem:'li',
        promoTip:false,
        promoTipElem:'li'
    },
    _init: function () {
        this.lineItem = this.element.find(this.options.growingElem);
        this.growingElem = '.' + this.options.growingElem;
        this.itemHeightArr = [];
        this.promoHeightArr = [];

        this.alignHeight();
    },
    maxHeightCount:function(items, arr){
        items.each(function(){
            var itemHeight = $(this).outerHeight(true);
            arr.push(parseFloat(itemHeight));
        });
        return Math.max.apply( Math, arr );
    },
    alignHeight:function(){
        var $this = this;
        var maxElemHeight = $this.maxHeightCount(this.lineItem, $this.itemHeightArr);

        this.lineItem.each(function(){
            $(this).css('height', maxElemHeight);
        });

        if(this.options.promoTip){ this.promoTipAlignHeight()}
    },
    promoTipAlignHeight: function(){
        var $this = this,
            items =  this.element.find('.t2-magento-item-promo-tip'),
            maxElemHeight = $this.maxHeightCount(items,$this.promoHeightArr);

        this.element.find(this.options.promoTipElem).each(function(){
            var item = $(this).find('.t2-magento-item-promo-tip'),
                itemHeight;
            if(item.length > 0){
                itemHeight = item.outerHeight(true)
            } else {
                itemHeight = 0;
            }
            var heightDifference = maxElemHeight - (itemHeight) ;
            $(this).css('padding-bottom', heightDifference);
        });
    }
});

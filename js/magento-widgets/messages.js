;jQuery(function ($) {
    jQuery.widget('tele2.messagesWidget', {
         options:{
             types:'message,error,correct',
             input: false,
             messageType: 'message',
             messageLook:'',
             messageHtml: ''
         },
        _init: function () {
            this.message = jQuery('<div class="t2-magento-item-promo-tip"><div class="t2-magento-item-promo-tip-content"></div><div class="t2-magento-arrow t2-magento-arrow-up"></div></div>');
            this.addMessageType();
            this.addMessageContent();
            this.element.append(this.message);
        },
        addMessageType:function(){
            this.message.removeClass(this.options.types);
            this.message.addClass(this.options.messageType);
            this.message.addClass(this.options.messageLook);
        },
        addMessageContent:function(){
            this.message.find('.t2-magento-item-promo-tip-content').html(this.options.messageHtml);
        },
        show: function(){
            if(this.options.messageLook == 'inline-message'){
                this.message.css('display','inline-block');
            } else{
                this.message.show();
            }
            if(this.options.input){
                this.options.input.addClass(this.options.messageType);
            }
        },
        hide:function(){
            this.message.hide();
            if(this.options.input){
                this.options.input.removeClass(this.options.messageType);
            }
        }
    });
}(jQuery));

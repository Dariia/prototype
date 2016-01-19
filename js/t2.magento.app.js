function blockItemsHorizontalAligning(block, maxOnLine){
    var itemsCount = block.find('.t2-magento-bordered-block').length;
    if(itemsCount > maxOnLine) { itemsCount = maxOnLine;}
    switch(itemsCount) {
        case 2:
            block.addClass('two-items');
            break;
        case maxOnLine:
            block.addClass('max-items');
            break;
        default:
            break;
    }
}

    $(document).ready(function () {
        // selects styling - all pages
        $('.t2-magento-select select').each(function(){
            $(this).customSelect({customClass:'t2-magento-selector'});
        });
        // checkboxes styling
        $('.t2-magento-checkbox').on('click', function(){
            $(this).toggleClass('checked');
        });
        // radio buttons styling
        $('.t2-magento-radio ').on('click', function(){
            $(this).addClass('checked').siblings().removeClass('checked');
        });
        // product page stiker
        $("[data-role=t2-magento-prices-line]").stick_in_parent();


        // Product page slider init (because we do this when, preselect color on product page)
        $('.t2-magento-product-slider-list').bxSlider({
            pager:false,
            nextText:'',
            prevText:'',
            infiniteLoop: false,
            hideControlOnEnd:true
        });


        // product page subscription blocks
        if($('.t2-magento-product-subscriptions').length > 0){
            blockItemsHorizontalAligning($('.t2-magento-product-subscriptions'), 4);
        }
        if($('[data-role=t2-magento-product-installment]').length > 0){
                    $('[data-role=t2-magento-product-installment]').viewMoreWidget({ lineItemsCount:4 });
                    $(document.body).trigger("sticky_kit:recalc");
                }
        if($('[data-role=t2-magento-product-upsells]').length > 0){
            $('[data-role=t2-magento-product-upsells]').viewMoreWidget({ lineItemsCount:4 });
            $('[data-role=t2-magento-product-upsells]').loaderWidget();

            $(document.body).trigger("sticky_kit:recalc");
        }

        // on resize of the window - need to look once more
        jQuery( window ).on( "orientationchange", function() {
            $(document.body).trigger("sticky_kit:recalc");
            if($('.t2-magento-product-installment').length > 0){
                $('[data-role=t2-magento-product-installment]').viewMoreWidget({ lineItemsCount:4 });

            }
            if($('[data-role=t2-magento-product-upsells]').length > 0){
                $('[data-role=t2-magento-product-upsells]').viewMoreWidget({ lineItemsCount:4 });
            }
        });

        //  Product page summary table
        if($('[data-role=t2-magento-product-summary-table]').length>0){
            $('[data-role=t2-magento-product-summary-table]').find('tbody td').each(function(){
                if ($.trim($(this).text()) !== ''){
                    $(this).addClass('t2-background-color-green-' + $(this).index());
                }
            })
        }

        //  General - info icons
        $('[data-role=t2-magento-info-icon]').on('click',function(){
            $(this).toggleClass('opened');
        });

        //  General - add to basket buttons
        $('[data-role=add-to-basket-button]').on('click',function(e){
            e.preventDefault();
            $(this).toggleClass('active');
        });
        $('[data-role=summary-product]').removeProductWidget();
        $('[data-role=accordion]').accordionWidget();

        if($('.t2-magento-lisling-page').length > 0){
            $('.t2-magento-lisling-page').alignLineHeightWidget({
                    growingElem:'.t2-magento-listing-desc',
                    promoTip:true,
                    promoTipElem:'.t2-magento-product-listing li'
            });
            $('.t2-magento-product-listing').parent('div').viewMoreWidget({ lineItemsCount:4 });
        }
        if($('.t2-magento-listing-columns-related').length > 0){
            $('.t2-magento-listing-columns-related').alignLineHeightWidget({
                    growingElem:'.t2-magento-listing-columns-related-desc'
            });
        }

        if($('.t2-magento-complex-listing-prices .t2-magento-complex-listing-prices-blocks').length > 0){
            $('.t2-magento-complex-listing-prices .t2-magento-complex-listing-prices-blocks').alignLineHeightWidget({
                    growingElem:'.t2-magento-bordered-block'
            });
        }
        if($('.t2-magento-product-subscription-variants ul').length > 0){
            $('.t2-magento-product-subscription-variants ul').alignLineHeightWidget({
                    growingElem:'li',
                    promoTip:true
            });
        }
        if($('.t2-magento-product-subscriptions ul').length > 0){
            $('.t2-magento-product-subscriptions ul').alignLineHeightWidget({
                    growingElem:'.t2-magento-bordered-block',
                    promoTip:true
            });
        }
        // For Adding Messages
        $('[data-configurator-sms]').messagesWidget({
            input: jQuery('input#sms-code'),
            messageType:'error',
            messageHtml:'<strong class="message-name">Personnumret eller mobilnumret stammer inte</strong><ul><li class="message-text">Just nu får du hörlurar pa köpet</li></ul>'
        });
        $('[data-configurator-sms]').messagesWidget("show");


        // For Iline Messages
        $('[data-payment-heading]').messagesWidget({
            messageLook:'inline-message',
            messageType:'error',
            messageHtml:'Du måste välja något av alternativen nedan för att gå vidare.'
        });
        $('[data-payment-heading]').messagesWidget("show");


        // Checkout SSN correct message
        $('.t2-magento-cart-step-person .row').messagesWidget({
            messageType:'correct',
            messageHtml:'Leverans till folkbokföringsadress:<strong>Thomas Farnstom</strong>'
        });
        $('.t2-magento-cart-step-person .row').messagesWidget("show");

        // Checkout Phone Error message

        $('.t2-magento-cart-step-person .columns:eq(2)').messagesWidget({
            input: jQuery('input#phone'),
            messageType:'error',
            messageHtml:'<ul><li class="message-text">Mobilnumret är ej korrect i fylld. Vänligen fyll i det igen.</li></ul>'
        });
        $('.t2-magento-cart-step-person .columns:eq(2)').messagesWidget("show");


        $('[data-role=scroll-to-summary]').click(function(){
            $('html, body').animate({
            scrollTop: $(".t2-magento-product-summary").offset().top
            }, 1000);
        });

        // fix for opacity in Ie 8
        if( $.browser.msie ) {
            $('.t2-magento-checkbox input').css('opacity','0');
            $('.t2-magento-radio input').css('opacity','0');
        }

});


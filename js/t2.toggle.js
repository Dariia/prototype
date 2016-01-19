t2.toggle = function () {

    var dev = true;

    var initialize = function () { };

    //action: element 
    var action = function (el) {
        var element = el;
        if (utils.isActive(element)) {
            utils.close(element);
        }
        else {
            utils.open(element);
        }
    };

    var utils = {
        toggleActiveMarker: 't2-toggle-active',
        //isActive
        isActive: function (element) {
            if (element.attr(this.toggleActiveMarker) != undefined) {
                if (dev) { console.log('toggle isActive: true'); }
                return true;
            }
            if (dev) { console.log('toggle isActive: false'); }
            return false;
        },
        //open
        open: function (element) {
            if (dev) { console.log('toggle: open element'); }
            element.attr(this.toggleActiveMarker, '').slideToggle(400, function () {
                element.css('background', 'blue');
                if (dev) { console.log('toggle open: complete'); }
            });
        },
        //close
        close: function (element) {
            if (dev) { console.log('toggle: close element'); }
            element.removeAttr(this.toggleActiveMarker).slideToggle(400, function () {
                element.css('background', 'red');
                if (dev) { console.log('toggle close: complete'); }
            });
        }
    };

    return {
        init: initialize,
        action: action,
        utils: utils
    };
}();
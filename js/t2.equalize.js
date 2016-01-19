/* t2-equalize:
	looks for html attribute: data-t2-equalize,
	height changes is made on child-elements with attibute data-t2-equalize-watch.
	if default changes is to be overridden use JSON like: data-t2-equalize='{"stacked":true}'.
	if you want to create multiple sets of equalizer comparisons inside the same "wrapper", add a matching set-number to: data-t2-equalize-watch='{"set":1}'
	
	functions: 
	- initialize
	- createEq
    - singleInstance
    - MultiInstance
	utilities:
	- getSettings
    - hasChildSets
    - getChildSets
	- getChildren
	- getHeight
	- getMaxHeight
	- setHeight
	- releaseHeight
	- removeHeight
	- isStacked
*/
"use strict";

t2.equalize = function () {

    var dev = false;

    /* initialize */
    var initialize = function () {
        if (dev) { console.log('equalize.init'); }
        var equalizeInstance = $('[data-t2-equalize]');
        if (equalizeInstance.length > 0) {
            equalizeInstance = $('[data-t2-equalize]');
            equalizeInstance.each(function () {
                if (dev) { console.log('equalize.item.begin'); }
                var currentInstance = $(this);
                createEq(currentInstance);
                $(window).on('t2-responsive', function (e) {
                    utils.releaseHeight(utils.getChildren(currentInstance));
                    createEq(currentInstance);
                });
                if (dev) { console.log('equalize.item.end'); }
            });
            if (dev) { console.log('equalize.done'); }
        }
    };

    /* create equalizer */
    var createEq = function (instance) {
        if (dev) { console.log('equalize.create'); }
        var currInstance = $(instance);
        if (utils.hasChildSets(currInstance)) {
            return multiInstance(currInstance);
        }
        return singleInstance(currInstance);
    };

    /* single instance, only one child-group of affected elements */
    var singleInstance = function (instance) {
        if (dev) { console.log('equalize.singleInstance'); }
        var currInstance = $(instance);
        var children = utils.getChildren(currInstance);
        var settings = utils.getSettings(currInstance);
        if (children && (settings.stacked || !utils.isStacked(children))) {
            utils.releaseHeight(children);
            var height = utils.getHeight(children);
            var maxHeight = utils.getMaxHeight(height);
            utils.setHeight(children, maxHeight);
        }
    };

    /* multi-instance, multiple child-groups/sets of affected elements, separate height */
    var multiInstance = function (instance) {
        if (dev) { console.log('equalize.multipleInstance'); }
        var currInstance = $(instance);
        var settings = utils.getSettings(currInstance);
        var childSets = utils.getChildSets(currInstance);
        for (var i in childSets) {
            if (dev) { console.log('equalize.set [' + i + '] begin'); }
            var children = childSets[i];
            utils.releaseHeight(children);
            var height = utils.getHeight(children);
            var maxHeight = utils.getMaxHeight(height);
            utils.setHeight(children, maxHeight);
            if (dev) { console.log('equalize.set [' + i + '] end'); }
        }
    };

    /* utilities for equalizer. */
    var utils = {

        /* get settings */
        getSettings: function (instance) {
            //define settings
            var settings = {
                stacked: false,
                stackedOnMobile: false
            };
            //if empty attribute, default settings is used.
            if (instance.attr('data-t2-equalize') == '') {
                if (dev) { console.log('equalize.utils.getSettings - default settings'); }
                return settings;
            }
            //get json-settings from html attribute, and define new settings if defined.
            var elJSON = $.parseJSON(instance.attr('data-t2-equalize'));
            var customSettings = {
                stacked: elJSON.stacked || settings.stacked,
                stackedOnMobile: elJSON.stackedOnMobile || settings.stackedOnMobile
            };
            if (dev) { console.log('equalize.utils.getSettings - custom settings'); }
            return customSettings;
        },

        /* has child sets */
        hasChildSets: function (instance) {
            //if attribute has value set in it, run child sets..
            if (instance.find("[data-t2-equalize-watch*='set']").length > 0) {
                if (dev) { console.log('equalize.utils.hasChildSets - true'); }
                return true;
            }
            return false;
        },

        /* get  */
        getChildSets: function (instance) {
            var childSets = {},
				targets = instance.find('[data-t2-equalize-watch]');
            //go trough all targets.
            targets.each(function () {
                var currentTarget = $(this),
					setIdentifier = $.parseJSON(currentTarget.attr('data-t2-equalize-watch')).set;
                //create a new array inside the childSets obj for each childSetIdentifier
                if (typeof childSets[setIdentifier] === 'undefined') {
                    childSets[setIdentifier] = [];
                }
                //add children to each set/arr where they belong.
                childSets[setIdentifier].push(currentTarget);
            });
            return childSets;
        },

        /* get children */
        getChildren: function (instance) {
            if (instance.find('[data-t2-equalize-watch]').length == 0) {
                return false;
            }
            var children = [];
            instance.find('[data-t2-equalize-watch]').each(function () {
                children.push($(this));
            });
            if (dev) { console.log('equalize.utils.getChildren: ' + children.length); }
            return children;
        },

        /* get height */
        getHeight: function (items) {
            var height = items.map(function (item) {
                return $(item).height();
            });
            return height;
        },

        /* get max height */
        getMaxHeight: function (items) {
            return Math.max.apply(null, items);
        },

        /* set height */
        setHeight: function (items, height) {
            items.map(function (item) {
                $(item).height(height);
            });
        },

        /* release height */
        releaseHeight: function (items) {
            items.map(function (item) {
                $(item).css('height', 'auto');
            });
        },

        /* remove height */
        removeHeight: function (items) {
            items.map(function (item) {
                $(item).css('height', '');
            });
        },

        /* check if elements is stacked */
        isStacked: function (items) {
            if (items) {
                if (($(items[0]).offset().top - $(items[items.length - 1]).offset().top) != 0) {
                    if (dev) { console.log('equalize.utils.isStacked: true'); }
                    return true;
                }
                if (dev) { console.log('equalize.utils.isStacked: false'); }
                return false;
            }
        }

    };
    return {
        init: initialize,
        create: createEq
    };
}();
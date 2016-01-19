$(document).foundation();
if (window.addEventListener) {
    window.addEventListener('load', function() {
        new FastClick(document.body);
    }, false)
} else if (window.attachEvent) {
 window.attachEvent('onload', function() {
         //new FastClick(document.body);
     }, false);
}



var opts = {
  lines: 13, // The number of lines to draw
  length: 4, // The length of each line
  width: 2, // The line thickness
  radius: 4, // The radius of the inner circle
  corners: 0, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#888', // #rgb or #rrggbb or array of colors
  speed: 1.5, // Rounds per second
  trail: 50, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: true, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  left: 'auto'
};
//var target = document.getElementById('foo');
//var spinner = new Spinner(opts).spin(target);
var spinner = new Spinner(opts).spin();


$(function () {
    $('form.addSpinner').submit(function (e) {
        //$('.addSpinner', this).addClass('loadingSpinner');
        $('.addSpinner', this).wrap("<span class='loadingSpinner'></span>").parent().append(spinner.el);
    });
});
//addClass('loadingSpinner');//.appendChild(spinner.el);
//$('.spinner').appendChild(spinner.el);


document.addEventListener('DOMContentLoaded', function () {
  //BackgroundCheck.init({
  //  targets: '.cycle-prev'
  //});
});

$(document).ready(function(){
	
	$(".t2-nav-mobilemenu .parent, .t2-nav-submenu .t2-nav-nestedlist > .parent").on("click",function(){
			var currentElement = $(this);
			if(!currentElement.hasClass("expanded")){
				currentElement.toggleClass("expanded").parent().find("> ul").slideToggle(160);
			}else{
				currentElement.parent().find("> ul").slideToggle(160,function(){
					//currentElement.toggleClass("expanded");
				});
				currentElement.toggleClass("expanded");
			}
	});
	$(".t2-nav-submenu ul li .parent span").on("click",function(){
			var currentElement = $(this).parent();
			if(!currentElement.hasClass("expanded")){
				currentElement.toggleClass("expanded").parent().find("> ul").slideToggle(160);
			}else{
				currentElement.parent().find("> ul").slideToggle(160,function(){
					//currentElement.toggleClass("expanded");
				});
				currentElement.toggleClass("expanded");
			}
	});
	
	


	$(".t2-nav-links a").on("click", function(){
		$(this).toggleClass("expanded");
		$(".t2-nav-header-menu-area").toggle();
		//fisk($(".t2-nav-header-menu-area"));
	});
	
	

	
	$(".t2-faq-item a").on("click",function(event){
		event.preventDefault();
		$(this).parent().parent().toggleClass("expanded").find(".t2-faq-answer").slideToggle(160);
		
	});
	//.t2-nav-header-menu-area, 
	$(".t2-nav-mobilemenu, .t2-nav-submenus, .t2-faq-item:not(.expanded) .t2-faq-answer").hide().find(".parent").parent().find("> ul").hide();
	$(".t2-nav-submenu").find(".parent").parent().find("> ul").hide();
	
	
	
	
	$("body").find("[data-branch-trigger]").next("[data-branch-receiver]").hide();
	$("body [data-branch-trigger]").on("click", function(){
		if($(this).hasClass("expanded")){
			$(this).removeClass("expanded").next("[data-branch-receiver]").removeClass("expanded").slideUp(160);
		}
		else{
		$(this).closest(".t2-tabs").find(".expanded").removeClass("expanded").next("[data-branch-receiver]").slideUp(160);
		$(this).addClass("expanded").next("[data-branch-receiver]").addClass("expanded").slideDown(160);
		}
	});
});

	$(function(){
		   
  	$(document).on("click",'.youTubeVideo', function(){
        $("html,body").animate({scrollTop: 0}, 800);
 		var vidtitle = $(this).parents('.videoThum').next('.videoInfo').find('h2').text();
		$('.tb-video-container .iframe h2').text(vidtitle);
		var winWidth = $(window).width();
        var winHeight = $(window).height();
        var centerDiv = $('.tb-video-popup');
        var left = winWidth / 2 - ((parseInt(centerDiv.css("width"))) / 2);
        var top = winHeight / 2 - ((parseInt(centerDiv.css("height"))) / 2);
        centerDiv.css({'top': '5%'});
    		$('.youtube').show();
		  $('.tb-video-popup.youtube, .tb-video-pop-overlay-bg').show();
		 
 		var ind = $(this).parents('.videoThum').addClass('aaa').parents('.guideBox').siblings().find('.videoThum').removeClass('aaa');	
		var linkSrc = $(this).parents('.videoThum').find('a').attr('rel');
		 $('.youtube .video-container').find('iframe').attr('src', linkSrc);
	});	
	
	$('.close, .tb-video-pop-overlay-bg').click(function(){
		$('.youtube .video-container').find('iframe').attr('src', '');							
		$('.tb-video-popup.youtube, .tb-video-pop-overlay-bg').hide();
	});	
	});
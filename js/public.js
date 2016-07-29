// JavaScript Document code by cchen
//这些真的是我自己写的好嘛，只是感觉英文注释逼格高一些！
$(document).ready(function(){
	//open navigation
    openNav = function(){
			$('body').toggleClass('open-nav');
			$('#menu-pull').removeClass('pull-right');
			$('.menu-list li').removeClass('show');
		}
	//Secondary navigation
	
	$('.menu-list').delegate('li','click',function(){
			var num = $(this).attr("hxt");
			var _pullBox = $('#menu-pull');
			var _pullright = $('#menu-pull ul[hxt='+num+']');
			
			$(this).addClass('show').siblings().removeClass('show');
			_pullBox.addClass('pull-right');
			_pullright.addClass('showit');
			_pullright.siblings('ul').removeClass('showit');
			//
			console.log("num:" + num);
		})
	$('nav').click(function(e){
			var e = e || window.event;
			var elem = e.target || e.srcElement;
			while (elem) {
				  if (elem.id && (elem.id=='menu-list' || elem.id=='menu-pull') ) {
					return;
				  }
				  elem = elem.parentNode;
				}
			openNav();
		});

	//返回顶部
	$('#sctop').click(function(){$('html,body').animate({scrollTop: '0px'}, 500);});
});


// JavaScript Document code by cchen
//这些真的是我自己写的好嘛，只是感觉英文注释逼格高一些！
$(document).ready(function(){
	
	//change animate
	$('img').one("webkitAnimationEnd oanimationend animationend",function(){
			$(this).removeClass("animate_01").addClass("animate_02");
		});
	//$('.scopes-child').hover(function(){$(this).addClass('hover');},function(){$(this).removeClass('hover');});
	//移动平台取消入场动画
	function IsPC(){  
			var userAgentInfo = navigator.userAgent;  
			var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
			var flag = true;  
			for (var v = 0; v < Agents.length; v++) {  
			   if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
			}  
			return flag;  
		} 
		var y=IsPC();
		$(function(){
			if(y){
				//pc端，窗口宽度小于920取消进场动画
				if($(window).width()<920){
					$("#pro,#news,#scopes,#about").removeClass("Admission");
				}
			}else{
				//移动端取消入场动画
				$("#pro,#news,#scopes,#about").removeClass("Admission");
			}	
		})
		
		//进场动画,920以上分辨率依次触发
		// main1ScrollTop();
		// $(window).scroll(function(){main1ScrollTop()});	
		// function main1ScrollTop(){
		// 	var window_h = $(window).height();
		// 	var t_top = $("#pro").offset().top;
		// 	var t_top2 = $("#news").offset().top;
		// 	var t_top3 = $("#scopes").offset().top;
		// 	var t_top4 = $("#about").offset().top;
		// 	var offsetTop = $(window).scrollTop();
		// 	to_h = t_top - offsetTop;
		// 	to_h2 = t_top2 - offsetTop;
		// 	to_h3 = t_top3 - offsetTop;
		// 	to_h4 = t_top4 - offsetTop;
			
		// 	if(window_h >= to_h){
		// 		$("#pro").removeClass("Admission");
		// 	}
		// 	if(window_h >= to_h2){
		// 		$("#news").removeClass("Admission");
		// 	}
		// 	if(window_h >= to_h3){
		// 		$("#scopes").removeClass("Admission");
		// 	}
		// 	if(window_h >= to_h4){
		// 		$("#about").removeClass("Admission");
		// 	}
		// }
});

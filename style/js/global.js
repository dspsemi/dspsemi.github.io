//初始化字体
$(function(){webSize()});

$(window).resize(function(){
	webSize();
	});


$(document).ready(
function()
{
 /* $("#newslist dt").click(
  function()
  {  
    $("#newslist dl").removeClass("current");
    $(this).parent().addClass("current");
  }
  );*/
  
  	var Opbtn = document.getElementById('nav_btn');
	var	box  = document.querySelector('body');

		Opbtn.addEventListener('click',function(){
			var	boxClass = box.classList.contains("opennav");

			if(boxClass){
				box.className='';
				
			}else{
				box.className='opennav';
				
			}
			// console.log(boxClass);
		});
}
);



//设置网页字体大小()
function webSize(){
		var winWidth = $(window).width();
		var fontSiz  = (260<=winWidth && winWidth<=640)?(winWidth/640*20):'20';
		var topHight = $('#logo').height();
		//console.log(fontSiz);
		$('html').css('font-size',fontSiz + 'px');
		$('article').css('padding-top',topHight+'px');
	}

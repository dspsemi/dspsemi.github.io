define(function(){
    var progressCount = 0;
    var mainLoopPrevCount = 0;
    var $self = {
        progress:function(){
            var progress = $(".subMenu"+GlobalData.mainLoopCount+" .submenu_progress");
            var duration = parseInt(progressCount/30);
            var percent = (progressCount/30)/(GlobalData.mainLoopDuration/1000);
            var resizePer = $(window).width()/1260;
            var lineW = (resizePer < 1)?resizePer*312:312;

            if(duration == 0){
                $(".subMenu>a>.submenu_desc>div").removeClass("active");
                $(".subMenu"+GlobalData.mainLoopCount+">a>.submenu_desc>div").addClass("active");
            }

            if(duration == GlobalData.mainLoopDuration/1000) {
                TweenMax.to(progress, 0.5, {x:lineW, width:0, ease:Cubic.easeOut});
                if(GlobalData.mainLoopCount == 3) GlobalData.mainLoopCount = 0;
                else GlobalData.mainLoopCount++;

                $self.change(GlobalData.mainLoopCount);
                progressCount = 0;
                mainLoopPrevCount = GlobalData.mainLoopCount;
                $(".subMenu>a>.submenu_desc>div").removeClass("active");
            }

            TweenMax.to(progress, 0, {x:0, width:percent*lineW});
            progressCount++;
        },
        change:function(idx){
            var bgGroupLi = $(".bg_group li");
            var prevLi = bgGroupLi.eq(mainLoopPrevCount);
            var currentLi = bgGroupLi.eq(idx);
            bgGroupLi.css("z-index", 0);
            prevLi.css("z-index", 1);
            currentLi.css("z-index", 2);
            CustomTw.to(currentLi, 0, {scale:1.3, alpha:0});
            CustomTw.to(currentLi, 0.7, {delay:1, scale:1, alpha:1});

            EventDispatcher.dispatchEvent(Events.MAIN_CIRCLE_SCALE_CHANGE);
        },
        reset:function(){
            var progress = $(".subMenu .submenu_progress");

            GlobalData.mainLoopCount = 0;
            progressCount = 0;
            mainLoopPrevCount = 0;

            TweenMax.to(progress, 0, {x:0, width:0});
        },
        bgReset:function(){
            var bgGroupLi = $(".bg_group li");
            var prevLi = bgGroupLi.eq(1);
            var currentLi = bgGroupLi.eq(0);

            bgGroupLi.css("z-index", 0);
            prevLi.css("z-index", 1);
            currentLi.css("z-index", 2);
        }
    }

    return $self;
})
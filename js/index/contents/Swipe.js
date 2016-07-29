define(function(){
    var touchSTX = 0, touchENT = 0;

    var $self = {
        init:function(){
            $self.addEvent();
        },
        addEvent:function(){
            /*document.addEventListener( 'touchstart', $self.onStagetouchstart, false );
            document.addEventListener( 'touchend', $self.onStagetouchend, false );
            document.addEventListener( 'touchmove', $self.onStagetouchmove, false );*/
            $(document).swipe({
                swipe:function(e, direction){
                    //alert("!!!!!"+direction);
                    if(direction == "up") EventDispatcher.dispatchEvent(Events.MAIN_TOUCH_SWIPE, false);
                    else EventDispatcher.dispatchEvent(Events.MAIN_TOUCH_SWIPE, true);
                }
            })
        }/*,
        onStagetouchstart:function(e){
            touchSTX = e.touches[0].pageY;
        },
        onStagetouchend:function(e){
            if(touchENT == 0) return;
            //alert("touchSTX::"+touchSTX+",touchENT::"+touchENT);
            //if(touchSTX > touchENT && Math.abs(touchSTX - touchENT) > 200) EventDispatcher.dispatchEvent(Events.MAIN_TOUCH_SWIPE, false);
            //else if(touchSTX < touchENT && Math.abs(touchENT - touchSTX) > 200) EventDispatcher.dispatchEvent(Events.MAIN_TOUCH_SWIPE, true);
        },
        onStagetouchmove:function(e){
            touchENT = e.touches[0].pageY;
        }*/
    }

    return $self;
})
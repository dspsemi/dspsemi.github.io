define(["contents/motion/MainImageChange"], function(_imageChange){
    var $circleObj;
    var CIRCLE_LEN = 7;
    var loopObjArr = [];
    var mainLoopTimer = null;
    var MainImageChange = _imageChange;

    var $self = {
        initPosition:function(){
            $circleObj = $(".main_contents>.circle>li");

            for(var i = 0; i < CIRCLE_LEN; ++i){
                var twObj = $($circleObj).eq(i);
                CustomTw.to(twObj, 0, {scale:3, alpha:0});
            }

            $self.initAddEvent();
        },
        initAddEvent:function(){
            EventDispatcher.addEvent(this, Events.MAIN_CIRCLE_LOOP_START, $self.loopStart);
            EventDispatcher.addEvent(this, Events.MAIN_CIRCLE_LOOP_STOP, $self.loopStop);
            EventDispatcher.addEvent(this, Events.MAIN_CIRCLE_SCALE_CHANGE, $self.scaleMotion);

            EventDispatcher.addEvent(this, Events.MAIN_MOTION_START, $self.onMainMotionStart);
            EventDispatcher.addEvent(this, Events.MAIN_MOTION_STOP, $self.onMainMotionStop);
        },
        inMotion:function(){
            for (var i = 0; i < CIRCLE_LEN; ++i) {
                var twObj = $($circleObj).eq(i);;
                var gap = 20;
                var plus = (i%2 == 0)?-1:1;
                var posx = parseInt(Math.random()*gap)*plus;
                var posy = parseInt(Math.random()*gap)*plus;

                loopObjArr[i] = new CircleLoopMotion(twObj, i*0.1, i);

                if(isUnderIE8) CustomTw.to(twObj, 0, {scale: 1, x: posx, y: posy, alpha:1})
                else CustomTw.to(twObj, 2, {delay: i * 0.1, scale: 1, x: posx, y: posy, alpha:1, ease:Expo.easeOut})
            }
        },
        loopStart:function(isNotRest){
            if(isUnderIE8) return;
            clearInterval(mainLoopTimer);
            $self.loopMotion();
            if(!isNotRest) MainImageChange.bgReset();
            mainLoopTimer = setInterval($self.loopMotion, 1000/30);
        },
        loopStop:function(isNotRest){
            clearInterval(mainLoopTimer);

            TweenMax.killDelayedCallsTo($self.loopStart);
            if(!isNotRest) MainImageChange.reset();
        },
        loopMotion:function(){
            for (var i = 0; i < CIRCLE_LEN; ++i) {
                var loopObj = loopObjArr[i];
                loopObj.render(i);
            }

            MainImageChange.progress();
        },
        scaleMotion:function(){
            $self.loopStop(true);
            for(var i = 3; i >= 0; --i){
                var twObj = $($circleObj).eq(i);
                var goScale = i*0.2+1+0.1;
                TweenMax.to(twObj, 1, {delay:i*0.1, scale:goScale, ease:Cubic.easeInOut});
                TweenMax.to(twObj, 0.8, {delay:i*0.1+0.8, scale:1, ease:Cubic.easeOut});
            }
            TweenMax.delayedCall(1.5, $self.loopStart, [true]);
        },
        onMainMotionStart:function(){
            if(GlobalData.currentPage == 1) $self.loopStart(true);
        },
        onMainMotionStop:function(){
            if(GlobalData.currentPage == 1) {
                $self.loopStop(true);
                TweenMax.killDelayedCallsTo($self.loopStart);
            }
        }
    }

    var CircleLoopMotion = function(obj, delay, idx){
        var obj = obj;
        var delay = delay;
        var idx = idx;
        var posxGap = (idx < 3)?20:40;
        var posyGap = 20;
        var angle = 0;
        var speed = parseInt(Math.random()*2) + 2;

        this.render = function(i){
            var posx = 0;
            var posy = 0;
            if(i%2 == 0) posx = Math.sin(angle*Math.PI/180)*posxGap;
            else posy = Math.cos(angle*Math.PI/180)*posyGap;

            TweenMax.to(obj, 0, {delay:delay, x:posx, y:posy});

            angle = (angle + speed);
        }
    }

    return $self;
})
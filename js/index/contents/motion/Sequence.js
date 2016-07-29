define(function(){
    var seqArr = [];
    var animateCount = 0;

    var $self = {
        init:function(){
            if(GetBrowser == "8") return;
            for(var i = 0; i < 4; ++i){
                var imgUrlArr = [resourcePath+"/main/images/seq/explosives/explosives_",
                    resourcePath+"/main/images/seq/defense/defense_",
                    resourcePath+"/main/images/seq/trade/trade_"]

                var dataArr = [{name:"explosives", totalLen:0, loop:0}, {name:"defense", totalLen:0, loop:28}, {name:"trade", totalLen:0, loop:51}, {name:"machinery"}];
                var seqObj = new SeqLoopClass();
                dataArr[i].idx = i;
                seqObj.set(dataArr[i]);
                seqArr.push(seqObj);

                var seqLen = dataArr[i].totalLen
                for (var n = 0; n < seqLen; ++n) {
                    var idx = n;
                    if(n<10) idx = "00"+n;
                    if(n >= 10 && n < 100) idx = "0"+n;

                    var domains = imgUrlArr[i]+idx+".png";

                    $self.imgLoadComplete(domains, n, i);
                }
            }

            $self.animate();
        },
        animate:function(){
            if(GetBrowser == "9") return;
            requestAnimationFrame($self.animate);

            if(animateCount%2 == 0){
                for(var i = 0; i < 4; ++i){
                    seqArr[i].loop();
                }
            }

            animateCount++;
        },
        imgLoadComplete:function(domains, n, i){
            var img = new Image();
            img.onload = function(){
                seqArr[i].seqImageArr[n] = img;

                if(n == 0) seqArr[i].drawSequence(0);
            }
            img.src = domains;

        },
        play:function(next){
            if(next == 1) return;
            seqArr[next-2].play();
        },
        stop:function(prev){
            if(prev == 1) return;
            seqArr[prev-2].stop();
        }
    }

    return $self;
})


var SeqLoopClass = function(){
    var seqData = "";
    var seqCount = 0;
    var ctx;
    var self = this;
    var isLooping = false;
    var isCheckUnderIE9 = false;

    this.timer = null;
    this.seqImageArr = [];

    this.set = function(data){
        seqData = data;

        var idx = seqData.idx+2;
        if(idx != 5){
            var canvas = document.getElementById("seq_canvas"+idx);
            ctx = canvas.getContext("2d");
        }

        if(GetBrowser == "9") isCheckUnderIE9 = true;
        else isCheckUnderIE9 = false;
    }

    this.play = function(){
        seqCount = 0;

        if(isCheckUnderIE9){
            clearInterval(this.timer);
            this.timer = setInterval(this.loop, 1000/30);
        }

        isLooping = true;
    }

    this.loop = function(){
        if(!isLooping) return;
        var idx = seqData.idx+2;

        if(seqCount == seqData.totalLen) {
            if(seqData.loop != 0) seqCount = seqData.loop;
            else seqCount = 0;
        }

        if(idx == 5){
            TweenMax.to($("#section"+idx+">.section_box>.seq_circle>img"), 0, {rotation:seqCount});
        }else{
            self.drawSequence(seqCount);
        }

        seqCount++;
    }

    this.stop = function(){
        if(isCheckUnderIE9) clearInterval(this.timer);
        isLooping = false;

        var idx = seqData.idx+2;
        if(idx == 5){
            TweenMax.to($("#section"+idx+">.section_box>.seq_circle>img"), 0, {rotation:0});
        }else{
            this.drawSequence(0);
        }
    }

    this.drawSequence = function(idx){
        // ctx.clearRect(0, 0, 700, 700);
        // ctx.drawImage(self.seqImageArr[idx], 0, 0, 700, 700);
    }
}
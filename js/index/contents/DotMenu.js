define(function(){
    var $dotBtns = null;

    var $self = {
        init:function(){
            $dotBtns = $(".dot_menu_box>a");

            $self.addEvent();
            $self.setBtns();
            $self.activeMenu(0);
        },
        addEvent:function(){
            EventDispatcher.addEvent(this, Events.MAIN_ACTIVE_MENU, $self.activeMenu);
        },
        setBtns:function(){
            $dotBtns.click(function(){
                if(GlobalData.isMotionPlaying) return;
                if($(this).hasClass("active")) return;

                var idx = $(this).index();

                $self.activeMenu(idx);
                EventDispatcher.dispatchEvent(Events.MAIN_GO_PAGE_MOVE, idx);

                var trackingStrArr = ["Main", "Explosive", "Defense", "Trade", "Machinery"];
                Tracker.tracking("btn", "Main", "Move", trackingStrArr[idx]);
            }).mouseover(function(){
                if(is_tablet) return;
                if($(this).hasClass("active")) return;
                TweenMax.to($(this).find(".title"), 0.3, {x:0, autoAlpha:1});
            }).mouseout(function(){
                if(is_tablet) return;
                if($(this).hasClass("active")) return;
                TweenMax.to($(this).find(".title"), 0.3, {x:20, autoAlpha:0});
            })
        },
        activeMenu:function(idx){
            var icons = $dotBtns.find(".icon");
            var dots = $dotBtns.find(".dot");
            var titles = $dotBtns.find(".title");
            var currentIcon = $dotBtns.eq(idx).find(".icon");
            var currentdot = $dotBtns.eq(idx).find(".dot");
            var currenttitle = $dotBtns.eq(idx).find(".title");

            $dotBtns.removeClass("active");
            $dotBtns.eq(idx).addClass("active");

            TweenMax.to(icons, 0.3, {autoAlpha:0});
            TweenMax.to(dots, 0.3, {autoAlpha:1});
            TweenMax.to(titles, 0.3, {x:20, autoAlpha:0});

            TweenMax.to(currentIcon, 0.3, {autoAlpha:1});
            TweenMax.to(currentdot, 0.3, {autoAlpha:0});
            TweenMax.to(currenttitle, 0.3, {x:0, autoAlpha:1});
        }
    }

    return $self;
})
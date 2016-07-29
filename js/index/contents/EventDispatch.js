define(function(){
    var listeners = [];
    var isDispatchPlaying = false;
    var removeArr = [];

    var $self = {
        addEvent:function(scope, evt_name, callback){
            if(typeof listeners[evt_name] == "undefined") listeners[evt_name] = [];
            listeners[evt_name].push({s:scope, c:callback});
        },
        dispatchEvent:function(evt_name, params){
            if(typeof listeners[evt_name] != "undefined"){
                isDispatchPlaying = true;
                for(var i = 0, l = listeners[evt_name].length; i < l; ++i){
                    var s = listeners[evt_name][i].s;
                    listeners[evt_name][i].c.call(s, params);

                    if(i == l-1) isDispatchPlaying = false, $self.removeStart();
                }
            }
        },
        removeEvent:function(scope, evt_name, callback){
            if(isDispatchPlaying) removeArr.push({s:scope, e:evt_name, c:callback});
            else $self.remove(scope, evt_name, callback);
        },

        removeStart:function(){
            if(removeArr.length == 0) return;
            for(var i = 0, l = removeArr.length; i < l; ++i){
                $self.remove(removeArr[i].s, removeArr[i].e, removeArr[i].c);
            }
            removeArr = [];
        },

        remove:function(scope, evt_name, callback){
            if(typeof listeners[evt_name] != "undefined"){
                for(var i = 0, l = listeners[evt_name].length; i < l; ++i){
                    if(listeners[evt_name][i].s == scope){
                        delete listeners[evt_name][i].s;
                        delete listeners[evt_name][i].c;

                        listeners[evt_name].splice(i, 1);
                        if(callback) callback();
                        break;
                    }
                }
            }
        }
    }

    return $self;
})
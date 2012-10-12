//def
var xvy = 4/3;
var window_dom = $('window');
var world_dom = $('world');
var slides_dom = $('slide');
var unit = 30;
var duration = 800;

var the_show = new Theshow(xvy, window_dom,  world_dom, slides_dom, unit, duration);

var hashWatcher = function() {
    var timer, last;
    return {
        register: function(fn, thisObj) {
            if(typeof fn !== 'function') return;
            timer = window.setInterval(function() {
                if(location.hash !== last) {
                    last = location.hash;
                    fn.call(thisObj || window, last);
                }
            }, 100);
        },
        stop: function() {
            timer && window.clearInterval(timer);
        },
        set: function(newHash) {
            last = newHash;
            location.hash = newHash;
        }
    };
}();

function get_index(){
	var hash = window.location.hash;
	if(hash=="#NaN" || hash==""){
		window.location.hash = 1;
		return 1;
	}else{
		return parseInt(hash.substring(1));
	}
}

function forward(the_show){
	var index = get_index();
	if(++index > the_show.world.slides_num){
		index = 1;
	}
	window.location.hash = index;
}

function backward(the_show){
	var index = get_index();
	if(--index <= 0){
		index = the_show.world.slides_num;
	}
	window.location.hash = index;
}

$(function(){
	$(window).resize(function(){
		the_show.reset_size();
	});

	hashWatcher.register(function(){
		var index = get_index();
		the_show.show(index);
	});

	$('body').on('click', function(){
		forward(the_show);
	});

	
	$(document).keyup(function(event) {
		if ( event.which == 37 || event.which == 38 ) {
			backward(the_show);
		}else if ( event.which == 39 || event.which == 40 ) {
			forward(the_show);
		}
	});
});

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

function forward(the_view){
	var index = get_index();
	if(++index > the_view.world.slides.num()){
		index = 1;
	}
	window.location.hash = index;
}

function backward(the_view){
	var index = get_index();
	if(--index <= 0){
		index = the_view.world.slides.num();
	}
	window.location.hash = index;
}

//$(function(){
	var the_view = new Theview($("window"),  $("world"), $("slide"), theme);

	$(window).resize(function(){
		the_view.reset_size();
	});

	hashWatcher.register(function(){
		var index = get_index();
		$("#slide_index").text(index);
		the_view.show(index);
	});

	$("window").click(function(e){
    	forward(the_view);
	});

	$(document).keyup(function(event) {
		if ( event.which == 37 || event.which == 38 ) {
			backward(the_view);
		}else if ( event.which == 39 || event.which == 40 ) {
			forward(the_view);
		}
	});
	
	$("#full").click(function(e){
		if (screenfull.enabled) {
	        screenfull.toggle();
	    }
	});



//});

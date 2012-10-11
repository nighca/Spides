//def

var the_show = new Theshow(4/3, $('window'), $('world'), $('slide'), 30, 1000);

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

$(function(){
	$(window).resize(function(){
		the_show.reset_size();
	});

	hashWatcher.register(function(){
		var index = get_index();
		the_show.show(index);
	});

	$('body').on('click', function(){
		var index = get_index();
		if(++index > the_show.world.slides_num){
			index = 1;
		}
		window.location.hash = index;
	});
});

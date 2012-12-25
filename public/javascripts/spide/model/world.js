/*
Theworld = function(_world_dom, _slides_dom, _unit, _xvy){
	var unit = _unit;
	var xvy = _xvy;

	var world_dom = _world_dom;

	var slides_dom = _slides_dom;

	this.init = function(){
		this.width = world_dom.width();
		this.height = world_dom.height();

		var slides = [];
		slides_dom.each(function(index){
			var temp_slide = new Slide($(this), unit, xvy);
			slides[index+1] = temp_slide;
		});
		this.slides = slides;
		this.slides_num = slides.length - 1;
	};

	this.animate = function(offset_x, offset_y, zoom, rotation, duration){
		var rotate = -rotation+'deg';

		world_dom.animate({ 
			zoom: zoom,
		}, duration, function(){
			$(this).transition({ 
				x: offset_x + "px",
				y: offset_y + "px",
				rotate: rotate,
			}, duration);
		});
	};

	this.show = function(i){
		this.slides[i].show();
	};
	this.hide = function(i){
		this.slides[i].hide();		
	};

	this.init();
}
*/

function Theworld(dom, slides_dom, theme){
	this.dom = dom;
	this.config = theme.config;

	this.dom.css(theme.config.world_style);

	this.slides = function(){
		var slides = [];

		slides_dom.each(function(index){
			var temp_slide = new Slide($(this), theme);
			slides.push(temp_slide);
		});

		return {
			get : function (index) {
				return slides[index-1];
			},
			num : function () {
				return slides.length;
			}
		};
	}();
	
	theme.world_init(this);
}

Theworld.prototype.show = function(i){
	this.slides.get(i).show();
};
Theworld.prototype.hide = function(i){
	this.slides.get(i).hide();		
};
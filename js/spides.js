function get_angle(x, y){
	var tan = y / x;
	var angle = Math.atan(tan);
	var degree = angle  * (180 / Math.PI);

	if(x < 0){
		degree += 180;
	}

	if(degree < 0){
		degree += 360;
	}

	return degree;
}

Slide = function(_slide_dom, _unit, _xvy){
	var height_unit = _unit;
	var width_unit = _unit * _xvy;

	var slide_dom = _slide_dom;

	this.init = function(){
		var size = parseInt(slide_dom.attr('psize'));

		this.width = width_unit * size;
		this.height = height_unit * size;

		this.px = parseInt(slide_dom.attr('px'));
		this.py = parseInt(slide_dom.attr('py'));

		this.protation = parseInt(slide_dom.attr('protation'));
		this.ptype = slide_dom.attr('ptype');

		slide_dom.css({
			"width":this.width, 
			"height":this.height, 
			"left":this.px, 
			"top":this.py,
			"font-size":size,
			"-webkit-transform":"rotate(" + this.protation + "deg)"
		});
	};

	this.show = function(){
		slide_dom.css({"z-index":101});
		slide_dom.animate({opacity:1});
	};
	this.hide = function(){
		slide_dom.css({"z-index":1});
		slide_dom.animate({opacity:0.5});
	};

	this.init();
};



Thewindow = function(_window_dom){
	var window_dom = _window_dom;

	var padding = 0.02;

	this.reset_size = function(){
		this.width = window_dom.width();
		this.height = window_dom.height();

		this.padding_length = this.width * padding;
		//console.log(this.padding_length);

		this.width -= 2 * this.padding_length;
		this.height -= 2 * this.padding_length;
	};

	this.init = function(){
		this.reset_size();

		window_dom.css({"padding-top":this.padding_length});
	};

	this.init();
};

Theworld = function(_world_dom, _slides_dom, _unit, _xvy){
	var unit = _unit;
	var xvy = _xvy;

	var world_dom = _world_dom;

	var slides_dom = _slides_dom;

	this.init = function(){
		this.width = world_dom.width();
		this.height = world_dom.height();

		var slides = [];
		slides_dom.each(function(){
			var index = parseInt($(this).attr('index'));
			var temp_slide = new Slide($(this), unit, xvy);
			slides[index] = temp_slide;
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

Theshow = function(_xvy, _window_dom, _world_dom, _slides_dom, _unit, _duration){
	var xvy = _xvy;
	var window_dom = _window_dom;
	var world_dom = _world_dom;
	var slides_dom = _slides_dom;
	var unit = _unit;
	var duration = _duration;

	var index = 1;

	this.show = function(i){

		if(i > this.world.slides_num || i < 1){
			////console.log(i, this.world.slides_num);
			return false;
		}

		var slide = this.world.slides[i];

		var zoom = this.width / slide.width;
		var rotation = slide.protation;


		var o_x = this.world.width /2;
		var o_y = this.world.height /2;
		//console.log('o ', o_x, o_y);

		var x1 = slide.px - o_x;
		var y1 = o_y - slide.py;
		//console.log('1 ', x1, y1);

		var ro_angle = rotation % 360;
		//console.log('ro_angle ', ro_angle);

		var angle1 = get_angle(x1, y1);
		var angle2 = angle1 + ro_angle;
		//console.log('angle ', angle1, angle2);

		var radius = Math.sqrt(x1*x1 + y1*y1);
		//console.log('radius ', radius);

		var x2 = radius * Math.cos(angle2*Math.PI/180);
		var y2 = radius * Math.sin(angle2*Math.PI/180);
		//console.log('2 ', x2, y2);

		var px2 = x2 + o_x;
		var py2 = o_y - y2;
		//console.log("p2 ", px2, py2);

		var offset_x = 0, offset_y = 0;

		if(this.layout > 0){
			offset_y = (this.window.height/zoom  - slide.height) / 2;
		}else{	
			offset_x = (this.window.width/zoom - slide.width) / 2;
		}

		offset_x -= px2;
		offset_y -= py2;

		//console.log(i+'-', offset_x, offset_y, zoom, rotation, duration);

		{
			//console.log("/////////////");

			var x1 = -slide.width/2;
			var y1 = slide.height/2;
			//console.log('1 ', x1, y1);

			var ro_angle = rotation % 360;
			//console.log('ro_angle ', ro_angle);

			var angle1 = get_angle(x1, y1);
			var angle2 = angle1 + ro_angle;
			//console.log('angle ', angle1, angle2);

			var radius = Math.sqrt(x1*x1 + y1*y1);
			//console.log('radius ', radius);

			var x2 = radius * Math.cos(angle2*Math.PI/180);
			var y2 = radius * Math.sin(angle2*Math.PI/180);
			//console.log('2 ', x2, y2);

			var px2 = x2 - x1;
			var py2 = y2 - y1;
			//console.log("p2 ", px2, py2);

			offset_x += px2;
			offset_y -= py2;

			//console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\');
		}

		//console.log(i+'+', offset_x, offset_y, zoom, rotation, duration);
		this.world.animate(offset_x, offset_y, zoom, rotation, duration);

		this.world.hide(index);
		this.world.show(i);

		index = i;

		return true;
	};

	this.checkout = function(){
		if(!this.show(index + 1)){
			//console.log(index, " no more slide!");
			index = 0;
			this.show(index + 1);
		}
		return true;
	};

	this.reset_size = function(){
		this.window.reset_size();
		if(this.window.width >= this.window.height*xvy){
			this.layout = 0;//horizon
			this.height = this.window.height;
			this.width = this.height * xvy;
		}else{
			this.layout = 1;//vertical
			this.width = this.window.width;
			this.height = this.width / xvy;
		}

		this.show(index);
	};

	this.init = function(){
		this.window = new Thewindow(window_dom);
		this.world = new Theworld(world_dom, slides_dom, unit, xvy);
		this.reset_size();
	};

	this.init();
};
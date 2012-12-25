//get angle with (x,y) given ( 0-2PI)
function get_angle(x, y){
	var tan = y / x;
	var angle = Math.atan(tan);

	if(x < 0){
		angle += Math.PI;
	}

	if(angle < 0){
		angle += Math.PI*2;
	}

	return angle;
}

//func to get new position after rotation
function get_rtn_pos(x1, y1, o_x, o_y, rotation){
	var ro_angle = rotation % 360;
	ro_angle *= (Math.PI / 180);
	//console.log('ro_angle ', ro_angle);

	var angle1 = get_angle(x1, y1);
	var angle2 = angle1 + ro_angle;
	//console.log('angle ', angle1, angle2);

	var radius = Math.sqrt(x1*x1 + y1*y1);
	//console.log('radius ', radius);

	var x2 = radius * Math.cos(angle2);
	var y2 = radius * Math.sin(angle2);

	var pos = {
		'x': x2,
		'y': y2
	};
	return pos;
}

var theme = {
	"config" : {
		"xvy" : 4/3,
		"unit" : 30,
		"padding" : 0.02,
		"duration" : 800,
		"window_style":{
			padding: "2%",
		},
		"world_style":{
			width: "8000px",
			height: "6000px",
		},
		"slide_style":{
			position: "absolute",
			borderRadius: "1%",
			opacity: "0.5"
		}
	},
	"slide_init" : function (slide) {
		var config = slide.config;
		var size = parseInt(slide.dom.attr('psize'));

		slide.width = config.unit * config.xvy * size;
		slide.height = config.unit * size;

		slide.px = parseInt(slide.dom.attr('px'));
		slide.py = parseInt(slide.dom.attr('py'));

		slide.protation = parseInt(slide.dom.attr('protation'));
		slide.ptype = slide.dom.attr('ptype');

		slide.dom.css({
			"width":slide.width, 
			"height":slide.height, 
			"left":slide.px, 
			"top":slide.py,
			"font-size":size,
			"-webkit-transform":"rotate(" + slide.protation + "deg)"
		});

		slide.show = function(){
			slide.dom.css({"z-index":101});
			slide.dom.animate({opacity:1});
		};
		slide.hide = function(){
			slide.dom.css({"z-index":1});
			slide.dom.animate({opacity:0.5});
		};
	},
	"world_init" : function (world) {
		world.width = world.dom.width();
		world.height = world.dom.height();

		world.animate = function(offset_x, offset_y, zoom, rotation, duration){
			var rotate = -rotation+'deg';

			this.dom.animate({ 
				zoom: zoom,
			}, duration, function(){
				$(this).transition({ 
					x: offset_x + "px",
					y: offset_y + "px",
					rotate: rotate,
				}, duration);
			});
		};
	},
	"window_init" : function (window) {
	},
	"view_init" : function (view) {
		view.show = function(i){

			var slide = this.world.slides.get(i);

			if(!slide){
				return false;
			}

			var zoom = this.width / slide.width;
			var rotation = slide.protation;


			var o_x = this.world.width /2;
			var o_y = this.world.height /2;

			var x1 = slide.px - o_x;
			var y1 = o_y - slide.py;

			var pos = get_rtn_pos(x1, y1, o_x, o_y, rotation);

			var x2 = pos.x;
			var y2 = pos.y;

			var px2 = x2 + o_x;
			var py2 = o_y - y2;

			var offset_x = 0, offset_y = 0;

			if(this.layout > 0){
				offset_y = (this.window.height/zoom  - slide.height) / 2;
			}else{	
				offset_x = (this.window.width/zoom - slide.width) / 2;
			}

			offset_x -= px2;
			offset_y -= py2;

			{
				//get the offset caused by the slide's rotate

				var x1 = -slide.width/2;
				var y1 = slide.height/2;

				var pos = get_rtn_pos(x1, y1, o_x, o_y, rotation);

				var x2 = pos.x;
				var y2 = pos.y;

				var px2 = x2 - x1;
				var py2 = y2 - y1;

				offset_x += px2;
				offset_y -= py2;

			}

			this.world.animate(offset_x, offset_y, zoom, rotation, theme.config.duration);

			this.world.hide(this.index);
			this.world.show(i);

			this.index = i;

			return true;
		};
	}
}
/*
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

Theview = function(_xvy, _window_dom, _world_dom, _slides_dom, _unit, _duration){
	var xvy = _xvy;
	var window_dom = _window_dom;
	var world_dom = _world_dom;
	var slides_dom = _slides_dom;
	var unit = _unit;
	var duration = _duration;

	var index = 1;

	this.show = function(i){

		var slide = this.world.slides[i];

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

*/

function Theview(window_dom, world_dom, slides_dom, theme){
	this.config = theme.config;
	this.index = 1;

	this.window = new Thewindow(window_dom, slides_dom, theme);
	this.world = new Theworld(world_dom, slides_dom, theme);

	this.reset_size = function(){
		this.window.reset_size();

		var xvy = this.config.xvy;
		if(this.window.width >= this.window.height*xvy){
			this.layout = 0;//horizon
			this.height = this.window.height;
			this.width = this.height * xvy;
		}else{
			this.layout = 1;//vertical
			this.width = this.window.width;
			this.height = this.width / xvy;
		}

		this.show(this.index);
	};

	this.reset_size();
	
	theme.view_init(this);
}

Theview.prototype.show = function(i){

	this.world.hide(this.index);
	this.world.show(i);

	this.index = i;

	return true;
};

Theview.prototype.checkout = function(){
	if(!this.show(this.index + 1)){
		//console.log(this.index, " no more slide!");
		this.index = 0;
		this.show(this.index + 1);
	}
	return true;
};

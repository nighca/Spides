Slide = function(_slide_dom, _unit, _xvy){
	var height_unit = _unit;
	var width_unit = _unit * _xvy;

	var slide = slide_dom;

	this.init = function(){
		var size = parseInt(slide.attr('psize'));

		this.width = width_unit * size;
		this.height = height_unit * size;

		this.px = parseInt(slide.attr('px'));
		this.py = parseInt(slide.attr('py'));

		this.protation = parseInt(slide.attr('protation'));
		this.ptype = slide.attr('ptype');

		slide.css({"width":width, "height":height, "left":px, "top":py});
	}

	this.init();
};


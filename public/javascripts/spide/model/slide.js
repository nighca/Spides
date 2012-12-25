/*
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

*/

function Slide(dom, theme){
	this.dom = dom;
	this.config = theme.config;

	this.dom.css(theme.config.slide_style);
	
	theme.slide_init(this);
}

Slide.prototype.show = function(){
	this.dom.show();
};

Slide.prototype.hide = function(){
	this.dom.hide();
};
/*
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

		window_dom.css({"padding":this.padding_length});
	};

	this.init();
};
*/

function Thewindow(dom, theme){
	this.dom = dom;
	this.config = theme.config;

	this.dom.css(theme.config.window_style);

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

	this.reset_size = function(){
		this.width = this.dom.width();
		this.height = this.dom.height();

		this.padding_length = this.width * this.config.padding;

		this.width -= 2 * this.padding_length;
		this.height -= 2 * this.padding_length;
	};
	this.reset_size();

	theme.window_init(this);
}

Thewindow.prototype.show = function(i){
	this.slides.get(i).show();
};
Thewindow.prototype.hide = function(i){
	this.slides.get(i).hide();		
};
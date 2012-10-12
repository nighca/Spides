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

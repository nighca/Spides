function show_error(){
	if($('.error_block').text()!=""){
		$('.error_block').show().delay(4000).fadeOut('normal');
	}
}

function set_error(message){
	$('.error_block').text(message);
	show_error();
}

$(function(){
	show_error();

	$("form").submit(function() {
		var ok = true;
    	$(this).find('input').each(function(){
    		if($(this).val()=="" && $(this).attr('name')!='theKey'){
    			ok = false;
				set_error($(this).attr("name")+" can't be blank!");
    		}
    	});
      	return ok;
    });
});

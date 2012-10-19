$(function(){
	var target = $('#get_info').attr('href');
	$('input[name=id]').change(function(){
		var id = parseInt($(this).val());
		$('#get_info').attr('href', target+'/'+id).removeClass('disabled');
	});
});
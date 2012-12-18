$(function(){
	$(".delete").on("click", function(){
		console.log("!");//---------------------------

		var id=$(this).parent().parent().attr("id");
		var theKey=$(this).parent().parent().attr("theKey");

		$.ajax({
            type: "POST",
            url: "/delete",
            dataType: "json",
            data: 'isAjax=true&id=' + id + '&theKey=' + theKey,
            success: function(res) {
            	set_error(res.message);
            }
        }).done(function(res) {
        	location.reload();
		});

        return false;
	});
});
$(document).ready(function(){
var status = 'open';
var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
				showLeftPush = document.getElementById( 'showLeftPush' ),
				sidebarmenu = document.getElementById( 'collapse-sidebarmenu' ),
				body = document.body;
showLeftPush.onclick = function() {
	var icon = $("#showLeftPush").attr('class');
	classie.toggle( this, 'active' );
	classie.toggle( body, 'cbp-spmenu-push-toright' );
	classie.toggle( menuLeft, 'cbp-spmenu-open' );
	if(icon == "glyphicon glyphicon-menu-hamburger")
	{
		$("#showLeftPush").attr('class','glyphicon glyphicon-remove');
	}
	else if (icon == "glyphicon glyphicon-remove")
	{
		$("#showLeftPush").attr('class','glyphicon glyphicon-menu-hamburger');
	}
};

	sidebarmenu.onclick = function(){
		if(status == 'open')
		{
			$('#desktop-nav').css({'display':'none'});
			$('#desktop-content').removeClass('custom-col-md-21');
			$('#desktop-content').addClass('custom-col-md-23');
			$('#collapse-sidebarmenu').removeClass('glyphicon glyphicon-remove');
			$('#collapse-sidebarmenu').addClass('glyphicon glyphicon-menu-hamburger');
			status = 'close';
		}
		else if(status == 'close')
		{
			$('#desktop-nav').css({'display':''});
			$('#desktop-content').removeClass('custom-col-md-23');
			$('#desktop-content').addClass('custom-col-md-21');
			$('#collapse-sidebarmenu').removeClass('glyphicon glyphicon-menu-hamburger');
			$('#collapse-sidebarmenu').addClass('glyphicon glyphicon-remove');
			status = 'open';
		}
		
	};

});


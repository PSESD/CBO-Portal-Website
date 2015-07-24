var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
				showLeftPush = document.getElementById( 'showLeftPush' ),
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
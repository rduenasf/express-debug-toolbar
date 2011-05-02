$(document).ready( function(){
	$("#debugToolbar").hide();   
	$("#djHideToolBarButton").click(function(e){
		e.preventDefault();
		$("#djDebugToolbarHandle").show('fast');
		$("#djDebugToolbar").hide('fast');
	});                                           

	$('#djDebugPanelList li a').click(function() {
		if (!this.className) {
			return false;
		}
		current = $('#djDebug #' + this.className);
		if (current.is(':visible')) {
			$(this).parent().removeClass('active');
			// If a panel is open, close that
			if ($('.panelContent').is(':visible')) {
				$('.panelContent').hide();
				return;
			}
			if ($('#djDebugToolbar').is(':visible')) {
				djdt.hide_toolbar(true);
				return;
			}
		} else {
			$('.panelContent').hide(); // Hide any that are already open
			current.show();
			$('#djDebugToolbar li').removeClass('active');
			$(this).parent().addClass('active');
		}
		return false;
	});      

	$('#djDebug a.djDebugClose').click(function() {
		$('#djDebugToolbar li').removeClass('active');
		// If a panel is open, close that
		if ($('.panelContent').is(':visible')) {
			$('.panelContent').hide();
			return;
		}
		if ($('#djDebugToolbar').is(':visible')) {
			djdt.hide_toolbar(true);
			return;
		}

	});

	$("#djShowToolBarButton").click(function(e){
		e.preventDefault();
		$("#djDebugToolbarHandle").hide('fast');
		$("#djDebugToolbar").show('fast');
	});

});
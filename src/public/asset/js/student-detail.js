'use strict';

$(document).ready(function (e) {
    $('.item-accordion').click(function (e) {
    
        if ($(this).next('.item-data-accordion').css('display') !== 'block') {
            $('.active-accordion').slideUp('fast').removeClass('active-accordion');
            $(this).next('.item-data-accordion').addClass('active-accordion').slideDown('slow');
			$("#icon-content-header").hide();
        } else {
            $('.active-accordion').slideUp('fast').removeClass('active-accordion');
			$("#icon-content-header").show();
        }
    });

    $('.accordion-grid').isotope({
        layoutMode: 'fitColumns',
        itemSelector: '.grid-item'
    });
});
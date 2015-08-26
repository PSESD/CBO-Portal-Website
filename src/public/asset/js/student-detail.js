$(document).on( 'shown.bs.tab', '[data-toggle="tab"]', function (e) {
    
    if(e.target.dataset.target == '#transcript'){
        $('#school-history-transcript').css({'display':''});
    }
    else{
        $('#school-history-transcript').css({'display':'none'});
    }

})
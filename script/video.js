$(document).ready(function() {
   
   $('#video').live('pagebeforeshow', function(event, ui) {
        var width = $("#video").width();
        var height = Math.round(width/1.3);

        if (isMobile()) {
            $("#video-content").html(
                '<object style="height: '+height+'px; width: '+width+'px">'+
                    '<param name="movie" value="'+namespace.videoURL+'?version=3">'+
                    '<param name="allowFullScreen" value="true">'+
                    '<param name="allowScriptAccess" value="always">'+
                    '<embed src="'+namespace.videoURL+'?version=3" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="'+width+'" height="'+height+'">'+
                '</object>');
        } 
        else {
            $("#video-content").html('<iframe width="'+width+'" height="'+height+'" src="'+namespace.videoURL+'" frameborder="0" allowfullscreen></iframe>');
        }
    });

    $('#video').live('pagebeforehide', function(event, ui) {
        $("#video-content").html('');
    });
    
});
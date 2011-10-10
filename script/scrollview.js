function ResizePageContentHeight()
{
    var id = $('.ui-page-active').attr('id');
    if(id == "select-device"){
        menuScroll.destroy();
        var ww = $("#select-device").outerWidth();
        var w = 61;//$("#scroller li").eq(0).outerWidth();
        var count = $("#scroller li").length;
        $("#wrapper").width(ww-(2*17));
        if(count < ww/w){
            $("#menu_left").add("#menu_right").show().addClass("dis");
            $("#scroller").width($("#wrapper").outerWidth()+1);
        }else {
            $("#scroller").width(w*count);
        }

        menuScroll = new iScroll('wrapper', {snap: true, momentum: false, bounce: true, lockDirection:true, vScroll: false});
    }
}

$(window).bind("orientationchange", function(event) {
	ResizePageContentHeight();
});

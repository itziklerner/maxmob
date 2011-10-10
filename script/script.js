function isMobile() {
    return (
        (navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPad") != -1) ||
        (navigator.platform.indexOf("iPod") != -1) ||
        (navigator.userAgent.match(/Android/i))
    );
}

function getLink(storage) {
    var f = function() {   
        var urlLink = $(this).attr('rel');
        if (urlLink != undefined) {
           namespace[storage] = urlLink;
        }
        return true;
    }
    return f;
}
var namespace = {
        videoURL: "",
        feedURL: "",
        entryURL: "",
        feeds: {},
        productURL:"",
		prevPage: ""
    };
var mainSearchPrefix = "";

$(document).ready(function() {
    
    location.hash = '';
    $("#whats-new").find('li').find('a').live('mousedown', setFeed);
    $("#whats-new").find('li').find('a').live('touchstart', setFeed);   
    
    $("#video-list").find('li').find('a').live('mousedown', getLink('videoURL'));
    $("#video-list").find('li').find('a').live('touchstart', getLink('videoURL'));
    
    
    $('#home').live('pageshow', function(event, ui){
        searchVal = "";
        location.hash = '';
        //$("#home .maxim-header h1").html('Mobile');
    });
    
    $('#home').live('pagebeforehide', function(event, ui) {
        mainSearchPrefix = "../"
    });
    
    $("#search-input-main").live('keyup',function(event){
            var value = $("#search-input-main").val();
            $('#search-list-main').empty();
            if(value.length < 4){
                $("#search_conent-main").hide();
                $("#home-content").show();
                return
            }
            $("#search_conent-main").show();
            $("#home-content").hide();
            $.ajax({
                   type: "POST",
                   url: mainSearchPrefix+'api/search.php',
                   dataType: 'json',
                   data: {search_text:value},
                   success: function (data, textStatus){
                            $('#search-list-main').empty();
                            if(searchScroll) {
                                searchScroll.destroy();
                            }
                            var tmp = "";
                            $.each(data.list, function(key, val) {
                               tmp +='<li data-theme="w" class="ui-btn ui-btn-icon-right ui-li ui-btn-down-w ui-btn-up-w">' +
                                         '<div class="ui-btn-inner ui-li">' +
                                             '<div class="ui-btn-text">' +
                                                 "<a href='pages/select-device.view?id="+val.product_id+"' class='ui-link-inherit'>" +
                                                        val.product_name +
                                                 "</a>" +
                                             '</div>' +
                                             '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>' +
                                         '</div>' +
                                     '</li>';
                            });
                            $('#search-list-main').html(tmp);
                            $("#search-scroller-main").height($('#search-list-main li').eq(0).outerHeight()*data.list.length);
                            searchScroll = new iScroll('search-scrolllistview-main');

                   }
            });
    });
    $("#search-input-main" ).live('change',function(){
        if($(this).val() == ""){
            $("#search_conent-main").hide();
            $("#home-content").show();
            $('#search-list-main').empty();
        }
    });


    var hh = $("#home").children(".ui-header").outerHeight();
    hh = hh ? hh : 0;

    var wh = window.innerHeight;
    var oh = $("#search-form-main").outerHeight();
    $("#search-scrolllistview-main").height(wh - (hh + oh + 110));
    searchScroll = new iScroll('search-scrolllistview-main');
    
});


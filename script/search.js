$(document).ready(function() {
    $('#search').live('pageshow', function(event, ui) {
        
        $("#search-input" ).val(searchVal);
        
        $("#radio-choice-2").live('click',function(){
            $('#search-input').keyup();
        });
        
        $("#radio-choice-1").live('click',function(){
            $('#search-input').keyup();
        });
        
        $("#radio-choice-2").live('touchstart',function(){
            $('#search-input').keyup();
        });
        
        $("#radio-choice-1").live('touchstart',function(){
            $('#search-input').keyup();
        });
        
        $("#search-input" ).live('keyup',function(event){
            var value = $("#search-input").val(),
                source = '../api/search_cross_reference_auto.php',
                callback = '';
            $('#search-list').empty();
            if (value.length == 0) {
            	$('#search-list').empty();
            }
            if($("#radio-choice-2").hasClass('ui-btn-active')){
                source = '../api/search.php';
                callback = renderPart;
                if(value.length < 4){
            		return
            	}
            }
            else {
                callback = renderCross;
            	if(value.length < 3){
            		return
            	}
            }
            
            $.ajax({
            	   type: "POST",
            	   url: source,
            	   dataType: 'json',
            	   data: {search_text:value},
            	   success: callback
    	    });
        });
        $("#search-input" ).live('change',function(){
            if($(this).val() == ""){
                $('#search-list').empty();
            }
        });
        
        
        var hh = $("#search").children(".ui-header").outerHeight();
        hh = hh ? hh : 0;
        
        var wh = window.innerHeight;
        var oh = $("#search-form").outerHeight();
        $("#search-scrolllistview").height(wh - (hh + oh + 80));
        searchScroll = new iScroll('search-scrolllistview');
        
        $('#search-input').focus();
        $('#search-input').tap();
    });
    
    $('#search').live('pagebeforehide', function(event, ui) {
        searchVal = $("#search-input" ).val();
        searchScroll.destroy();
    });
    $('#search-list-view').live('pagebeforeshow', function(event, ui) {
    	var url = location.hash,
    		cross;
	    if(url.indexOf('?cross=') != -1){
	    	cross = url.substring(url.indexOf('?cross=')+7, url.lenght);
	     	$.getJSON('../api/search_cross_reference_results.php?cross='+cross, function(json){
	     		tmp= "";
	     		$.each(json.list, function(key, val){
	     			tmp +="<li class='ui-btn ui-btn-icon-right ui-li ui-btn-up-w'>" +
				                    "<div class='ui-btn-inner ui-li>" +
				                    "<div class='ui-btn-txt'>" +
				                        "<a class='ui-link-inherit' href='select-device.view?id=" + val.id + "' >" + 
											"<h3 class='ui-li-heading'>" + val.name + "</h3>" +
											"<p class='ui-li-desc'>" + val.descr + "</p>" +
										"</a>" + 
				                    "</div>" +
				                    "<span class='ui-icon ui-icon-arrow-r'></span>"+
				                "</div>" +
				            "</li>";
	     		});
	     		$("#search-list-view-items").html(tmp);
	     	});
	     	
	    }
    });
});

function renderCross(data, textStatus){
   $('#search-list').empty();
   searchScroll.destroy();
   var tmp = "";
   $.each(data.list, function(key, val) {
	   tmp +='<li data-theme="w" class="ui-btn ui-btn-icon-right ui-li ui-btn-down-w ui-btn-up-w">' +
                 '<div class="ui-btn-inner ui-li">' +
                     '<div class="ui-btn-text">' +
                         "<a href='search-list.view?cross="+val+"' class='ui-link-inherit' >" +
                         		val +
                         "</a>" +
                     '</div>' +
                     '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>' +
                 '</div>' +
             '</li>';
   });
   $('#search-list').html(tmp);
   $("#search-scroller").height($('#search-list li').eq(0).outerHeight()*data.list.length);
   searchScroll = new iScroll('search-scrolllistview');
}

function renderPart(data, textStatus){
	$('#search-list').empty();
    searchScroll.destroy();
    var tmp = "";
    $.each(data.list, function(key, val) {
       tmp +='<li data-theme="w" class="ui-btn ui-btn-icon-right ui-li ui-btn-down-w ui-btn-up-w">' +
                 '<div class="ui-btn-inner ui-li">' +
                     '<div class="ui-btn-text">' +
                         "<a href='select-device.view?id="+val.product_id+"' class='ui-link-inherit'>" +
                                val.product_name +
                         "</a>" +
                     '</div>' +
                     '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>' +
                 '</div>' +
             '</li>';
    });
    $('#search-list').html(tmp);
    $("#search-scroller").height($('#search-list li').eq(0).outerHeight()*data.list.length);
    searchScroll = new iScroll('search-scrolllistview');
}
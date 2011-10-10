var productSelector = {
    typeName: ""
}
function saveName(){
    productSelector.typeName = $(this).html();
}
var product_title = {};
$(document).ready(function() {

    $("#product-selector").find('li').find('a').live('vmousedown', getLink('productType'));

    $("#product-selector").find('li').find('a').live('vmousedown', saveName);

    $("#view-product-selector").find('li').find('a').live('vmousedown', getLink('productURL'));
    
    $('#product-selector').live('pageshow', function(event, ui) {
        $('#type-product-list').find('ul').html('');
        var url = location.hash,
        	nid = 4857;
        if(url.indexOf('?nid=') != -1){
        	nid = url.substring(url.indexOf('?nid=')+5, url.lenght);
            
            if(product_title['i'+nid]){
                $('#product-selector .maxim-header').find("h1").html(product_title['i'+nid]);
            }
            else {
                $('#product-selector .maxim-header').find("h1").html(productSelector.typeName);
                product_title['i'+nid] = productSelector.typeName;
            }
        	
        	$('#product-selector .maxim-title .ui-block-b').html('Products');
        }
        else {
        	$('#product-selector .maxim-header').find("h1").html('');
        	$('#product-selector .maxim-title .ui-block-b').html('Products');
        }
        $.mobile.showPageLoadingMsg();
        $.ajax({
                url: "../api/tree.php?node_id="+nid+"&"+Number(new Date()),
                dataType: 'json',
                async: true,
                success: function(json){
                    $.each(json.list, function(key, val) {
                            var link = "<a class='ui-link-inherit' href='product-selector.view?nid="+val.node_id+"'>"+val.name+"</a>";
                            if(val.list){
                                link = "<a class='ui-link-inherit' href='view-product-selector.view?nid="+val.node_id+"'>"+val.name+"</a>";
                            }
                            $('#type-product-list').find('ul').append(
                            "<li class='ui-btn ui-btn-icon-right ui-li ui-btn-up-w'>" +
                                "<div class='ui-btn-inner ui-li>" +
                                    "<div class='ui-btn-txt'>" +
                                        link +
                                    "</div>" +
                                    "<span class='ui-icon ui-icon-arrow-r'></span>"+
                                "</div>" +
                            "</li>"
                        );
                    });
                    $.mobile.hidePageLoadingMsg();
               }
        });
			
    });

    $('#view-product-selector').live('pageshow', function(event, ui) 
	{
        $('#view-product-selector').find('ul').html('');
		var url = location.hash,
     	nid = 0;
	    if(url.indexOf('?nid=') != -1){
	     	nid = url.substring(url.indexOf('?nid=')+5, url.lenght);
	    }
	    else {
	     	//$('.maxim-header').find("h1").html(productSelector.typeName);
	    }
        $('#view-product-selector .maxim-header').find("h1").html(productSelector.typeName);
        $.mobile.showPageLoadingMsg();
        $.ajax({
                url: "../api/tree.php?node_id="+nid+"&"+Number(new Date()), 
                dataType: 'json',
                async: true,
                success: function(json){
                    $.each(json.list, function(key, val) {
                        $('#view-product-selector').find('ul').append(
                            "<li class='ui-btn ui-btn-icon-right ui-li ui-btn-up-w'>" +
                                "<div class='ui-btn-inner ui-li>" +
                                    "<div class='ui-btn-txt'>" +
                                        "<a class='ui-link-inherit' href='select-device.view?id=" + val.id + "' rel='" + val.url + "?" + Number(new Date()) + "'>" + 
                                            "<h3 class='ui-li-heading'>" + val.name + "</h3>" +
                                         "<p class='ui-li-desc'>" + val.descr + "</p>" +
                                        "</a>" + 
                                    "</div>" +
                                    "<span class='ui-icon ui-icon-arrow-r'></span>"+
                                "</div>" +
                            "</li>"
                        );
                    }); 
                    $.mobile.hidePageLoadingMsg();
               }
        }); 
    });
    
    $('#select-device').live('pagebeforehide', function(event, ui) {
		 	$('#select-device .maxim-header').find("h1").html("");
            
            menuScroll.destroy();
            diag_scroll.destroy();
            
            $("#head-select-device").find(".ui-block-b").html("");
            $("#diag").html("");
            $("#key_f").html("");
            $('#desc').html("");
            $("#app").html("");
            $("#thelist li").die();
				
    });
    
    $("#select-device").find('li').find('a').live('vmousedown', getLink('productURL'));

    $('#select-device').live('pageshow', function(event, ui){
        var gotoLink = namespace.productURL;
        var url = location.hash,
     	id = 0;
	    if(url.indexOf('?id=') != -1){
	     	id = url.substring(url.indexOf('?id=')+4, url.lenght);
	     	//$('.maxim-header').find("h1").html(productSelector.typeName);
	    }
	    else {
	     	//$('.maxim-header').find("h1").html(productSelector.typeName);
	    }
        $.mobile.showPageLoadingMsg();
        $.ajax({
                url: '../api/device.php?qv_pk=' + id, 
                dataType: 'json',
                async: true,
                success: function(json){	
                    $('#select-device .maxim-header').find("h1").html(json.product_name);
                    //$('.fist-row').find('a').attr("href", json.pdf);
                    $("#head-select-device").find(".ui-block-b").html(json.pageName);
                    var str = "";
                    
                    if(json.description){
                        str = '<h2>Information</h2>';
                        str += '<h3>'+json.product_name+'</h3>';
                        if(json.short_description){
                            str += '<p>'+json.short_description+'</p><br/>';
                        }
                        str += json.description;
                        $('#desc').html(str);
                        $('#thelist').append('<li class="active" rel="desc"><img src="../images/information.png" align="center" /></li>');
                    }

                    if(json.features)
                    {
                        str = '<h3>Product Features</h3>';
                        str += json.features;
                        $("#key_f").html(str);
                        $('#thelist').append('<li class="" rel="key_f"><img src="../images/features.png" align="center" /></li>');
                    }
                    
                    if (json.diagram)
                    {
                        str = '<h3>Diagram</h3>';
                        str += json.diagram;
                        var ww = $("#select-device").children(".ui-header").outerWidth();
                        $("#diag_scroll").html(str);
                        var url = $('#diag img').attr('src');
                        $('#diag img').attr('src','http://www.maxim-ic.com'+url);
                        $('#thelist').append('<li class="" rel="diag"><img src="../images/diagramm.png" align="center" /></li>');
                    }

                    if(json.app.length > 0){
                        str = '<dl title="applications">'+
                                    '<h3>Applications</h3>';
                        for(key in json.app){
                           str += "<dd>"+json.app[key]+"</dd>";
                        }
                        str += "</dl>";
                        $("#app").html(str);
                        $('#thelist').append('<li class="" rel="app"><img src="../images/applications.png" align="center" /></li>');
                    }
                    //Dollar
                    $('#thelist').append('<li class="" rel=""><img src="../images/buy.png" align="center" /></li>');
                    
                    if(json.pdf){
                        $('#thelist').append('<li class=""><a href="'+json.pdf+'"><img src="../images/pdf.png" align="center" /></a></li>');
                        //$("#pdf iframe").attr("src",json.pdf);
                        //$("#pdf iframe").width($("#select-device").outerWidth());
                        //$("#pdf iframe").height($("#select-device").outerHeight());
                        
                        //$('#thelist').append('<li class=""><a target="_blank" rel="external" href="'+json.pdf+'"><img src="../images/pdf32x32.gif" align="center" /></a></li>');
                    }
                    
                    //Mail
                    $('#thelist').append('<li class="" rel=""><img src="../images/mail.png" align="center" /></li>');

                    $("#thelist li").live("tap",menu_show_item);
                    $('#thelist li').live('mousedown', menu_show_item);
                    
                    $.mobile.hidePageLoadingMsg();
                    
                    
                    $("#scroller").show();
                    var ww = $("#select-device").outerWidth();
                    var w = 61;//$("#scroller li").eq(0).outerWidth();
                    var count = $("#scroller li").length;
                    $("#wrapper").width(ww-(2*17));
                    if(count < ww/w){
                        $("#menu_left").add("#menu_right").show().addClass("dis");
                        $("#scroller").width($("#wrapper").outerWidth()+1);
                    }else {
                        $("#menu_left").add("#menu_right").show();
                        $("#scroller").width(w*count);
                    }
                    
                    menuScroll = new iScroll('wrapper', {snap: true, momentum: false, bounce: true, lockDirection:true, vScroll: false});
                    //diag_scroll = new iScroll('diag',{zoom:true});
                    diag_scroll = new iScroll('diag');
                }
        });

    });
    
});
function menu_show_item(){
    var rel = $(this).attr("rel");
    if (rel && !$("#"+rel).is(":visible")) {
        $('#thelist li').removeClass("active");
        $(this).addClass("active");
        $("#select-device .test-content > div:visible").slideUp();
        $("#"+rel).slideDown();
    }
}

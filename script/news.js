namespace.feedLinks = {
    newproduct_prs : {
        url: "http://www.maxim-ic.com/rss/newproduct_prs.xml",
        time: 0,
        title: 'New Products'
    },
    application_notes : {
        url:"http://www.maxim-ic.com/rss/application_notes.xml",
        time: 1,
        title: 'Application Notes'
    },
    business_prs : { 
        url:"http://www.maxim-ic.com/rss/business_prs.xml",
        time: 1,
        title: 'Press Releases'
    },
    datasheets : {
        url: "http://www.maxim-ic.com/rss/datasheets.xml",
        time: 1,
        title: 'Data Sheets'
    },
    design_guides : {
        url: "http://www.maxim-ic.com/rss/design_guides.xml",
        time: 1,
        title: 'Design Guides'
    },
    glossary : {
        url: "http://www.maxim-ic.com/rss/glossary.xml",
        time: 1,
        title: 'EE-Glossary'
    }
}

function str_replace_reg(haystack, needle, replacement) { 
	var r = new RegExp(needle, 'g'); 
	return haystack.replace(r, replacement); 
}

function setFeed(){
    var param = $(this).attr('rel');
    if(namespace.feedLinks[param]){
        namespace.feedURL = namespace.feedLinks[param].url;
        namespace.feedTime = namespace.feedLinks[param].time;
        namespace.feedTitle = namespace.feedLinks[param].title;
    }
    else {
        namespace.entryURL = param;
    }
}

$(document).ready(function() {
    var newsTitleFeed = "";
    
    $('#feed').live('pagebeforeshow', function(event, ui) {
        $.jGFeed(namespace.feedURL,
            function (feeds) {
                if (!feeds) {                    
                    return false;
                }

                namespace.feeds = feeds;
                newsTitleFeed = namespace.feedTitle; //str_replace_reg(feeds.title, "Maxim - ", "");
                
                var list = document.createElement('ul');
                list.className = 'ui-listview';
                list.setAttribute('data-role', 'listview');
                list.setAttribute('data-theme', 'w');

                $('#feeds-list').append(
                    "<ul class='ui-listview' data-role='listview' data-theme='w'" + 
                    "</ul>"
                );
                $('#feed .maxim-header h1').html(newsTitleFeed);
                /*for (var i = 0; i < feeds.entries.length; i++) {
                    var entry = feeds.entries[i];
                    $('#feeds-list').find('ul').append(
                        "<li class='ui-btn ui-btn-icon-right ui-li ui-btn-up-c'>" +
                            "<div class='ui-btn-inner ui-li>" +
                                "<div class='ui-btn-txt'>" +
                                    "<a class='ui-link-inherit' href='feed-entry.view' rel='" + entry.link + "'>" +
                                        "<h3 class='ui-li-heading'>" + entry.title + "</h3>" +
                                        "<p class='ui-li-desc'><strong>" + entry.publishedDate + "</strong></p>" +
                                        "<p class='ui-li-desc'>" + entry.contentSnippet + "</p>" +
                                        "<span class='ui-icon ui-icon-arrow-r'></span>" +
                                    "</a>" +
                                "</div>" +
                            "</div>" +
                        "</li>"
                    );
                }*/
                var entry = "", time = "", title = "";
                for (var i = 0; i < feeds.entries.length; i++) {
                    entry = feeds.entries[i];
                    time = "";
                    if(namespace.feedTime) {
                        time = new Date(entry.publishedDate);
                        time = time.getFullYear()+"-"+time.getMonth() + "-" + time.getDate() + ": ";
                    }
                    title = entry.title;
                    if (title.length > 85){
                        title = entry.title.substr(0, 75)+"...";
                    }
                    //alert(time);
                    $('#feeds-list').find('ul').append(
                        "<li class='ui-bar-list ui-btn ui-btn-icon-right ui-li ui-btn-up-w' data-theme='w'>" +
                            "<div class='ui-btn-inner ui-li>" +
                                "<div class='ui-btn-text'>" +
                                    "<a class='ui-link-inherit feed-link' href='feed-entry.view' rel='" + entry.link + "'>" +
                                       time + title + 
                                    "</a>" +
                                    '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>' +
                                "</div>" +
                            "</div>" +
                        "</li>"
                    );
                }

            }, -1
        );
    });

    $('#feed').live('pagebeforehide', function(event, ui) {
        $("#feeds-list").html('');
    });

    //$("#feed").find('li').find('a').live('mousedown', getLink('entryURL'));
    //$("#feed").find('li').find('a').live('touchstart', getLink('entryURL'));
    $("#feed").find('li').find('a').live('mousedown', setFeed);
    $("#feed").find('li').find('a').live('touchstart', setFeed);

    $('#feed-entry').live('pagebeforeshow', function (event, ui) {
    	$('#feed-entry .ui-content-xx .ui-block-b').html(newsTitleFeed);
        for (var i = 0; i < namespace.feeds.entries.length; i++) {
            var entry = namespace.feeds.entries[i], time = "";
            if (entry.link == namespace.entryURL) {
                time = new Date(entry.publishedDate);
                time = time.getFullYear()+"-"+time.getMonth() + "-" + time.getDate();
                $('#feed-content').append(
                	
                    "<ul class='ui-listview' data-role='listview' data-theme='z'>" +
                        "<li class='ui-li ui-li-divider ui-btn-icon-right ui-btn ui-bar-b ui-btn-down-undefined ui-btn-up-undefined'>" +
                            "<a class='header-link' href='" + entry.link + "'>" +
                                "<h3 class='ui-li-heading'>" + entry.title + "</h3>" +
                                "<p class='ui-li-desc'><strong>" + time + "</strong></p>" +
                                "<span class='ui-icon ui-icon-arrow-r'></span>" +
                            "</a>" +
                        "</li>" +
                        "<li class='ui-content' data-role='content' role='main'>" +
                            "<div class='content-primary'>" + entry.content + "</div>" +
                        "</li>" +
                    "</ul>");
                break;
            }
        }
    });
    
    $('#feed-entry').live('pagebeforehide', function(event, ui) {
        $("#feed-content").html('');
    });
    
});
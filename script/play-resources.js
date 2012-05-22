/**
 * Partially from http://diveintohtml5.org/everything.html
 *
 * But we don't want audio/* as <video>
 */
function canPlayVideo(type) {
    var v = document.createElement('video');
    return !!(v.canPlayType &&
	      v.canPlayType(type).replace(/no/, '') &&
	      !(/^audio\//.test(type)));
}

$(document).ready(function() {
    /* Iterate over all resources in HTML output */
    $('.resource').each(function() {
	var that = $(this);
	var preview = that.data('preview');
	var sources = [];
	that.find('a').each(function() {
	    var a = $(this);
	    sources.push({ href: a.attr('href'), type: a.attr('type') });
	});


	/* Check playability */
	if (sources.map(function(r) {
			    return r.type;
			}).some(canPlayVideo)) {
	    var img = that.find('img');
	    img.before('<p class="play">▶</p>');
	    var poster = img.attr('src');
	    var isPreview = false;
	    that.find("img, .play").mouseover(function() {
		img.attr('src', preview);
	    }).
	    mouseout(function() {
		img.attr('src', poster);
	    }).
	    click(function() {
		that.find(".play").remove();
		var box = $('<div class="video-js-box vim-css"></div>');
		var video = $('<video class="video-js" controls="controls" autoplay="autoplay"></video>');
		video.attr('poster', poster);
		sources.forEach(function(source) {
		    var src = $('<source></source>');
		    src.attr('src', source.href);
		    src.attr('type', source.type);
		    video.append(src);
		});
		box.append(video);
		img.replaceWith(box);
		VideoJS.setup(video);
	    });
	}
    });
    $('head').append(
	'<script src="script/video-js/video.js" type="text/javascript" charset="utf-8"></script>' +
	'<link rel="stylesheet" href="script/video-js/video-js.css" type="text/css" media="screen" title="Video JS" charset="utf-8">' +
	'<link rel="stylesheet" href="script/video-js/skins/vim.css" type="text/css" media="screen" charset="utf-8">'
    );
});

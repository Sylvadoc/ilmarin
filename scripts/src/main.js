var limiteMobile = 768;
var isMobile;

$(document).ready(function() {
	'use strict';

	// overlay navigation
	$('.menu-trigger').click(function() {
		$('.m-scene').toggleClass('overlay-open');
		$('.overlay').toggleClass('open');
		$('.menu-close').removeClass('animate');
	});
	$('.menu-close').hover(function() {
		$(this).toggleClass('animate');
	});
	$('.menu-close').click(function() {
		$(this).removeClass('animate');
		$('.m-scene').removeClass('overlay-open');
		$('.overlay').removeClass('open');
	});

	// onscroll sticky header
	$('.m-scene').scroll(function() {
		if ($(this).scrollTop() < 250 && $("html").hasClass("desktop")) {
			$('.the-header').removeClass("sticky");
			$('.to_be_fixed').removeClass("sidebar_fixed");
		}
		else if($(this).scrollTop() > 700 && $("html").hasClass("desktop")) {
			$('.to_be_fixed').addClass("sidebar_fixed");
		}
		else {
			$('.the-header').addClass("sticky");
		}
	});

	// mobil
	if ($("html").hasClass("tablet") || $("html").hasClass("mobile") || $("html").hasClass("smallscreen") || isMobile) {
		$('.the-header').addClass("sticky");
		$('.to_be_fixed').removeClass("sidebar_fixed");
	}
	$(window).on("resize", function() {
		var windowWidth = $(window).width();
		if(windowWidth <= limiteMobile) {
			isMobile = true;
			$('.the-header').addClass("sticky");
			$('.to_be_fixed').removeClass("sidebar_fixed");
		} else {
			isMobile = false;
			$('.the-header').removeClass("sticky");
			$('.to_be_fixed').addClass("sidebar_fixed");
		}
	});

	// cnil
	if (Cookies.get('cookie_cnil') === undefined) {
		$('#cnil_ok').click(function(){
			Cookies.set('cookie_cnil', 'viewed', { expires: 365 });
			$('#cnil').fadeOut();
		});
	} else {
		$('#cnil').hide();
	}

	// panel header
	$('.toggle-panel').click(function(){
		var the_panel = $(this).attr('href');
		var panels = $(".panel");
		var logo = $(".branding");
		if ($(the_panel).hasClass("show-panel")) {
			$(panels).removeClass('show-panel');
			$(logo).show();
		}
		else {
			$(panels).removeClass('show-panel');
			$(the_panel).addClass('show-panel');
			$(logo).hide();
		}
		return false;
	});

	// bloc chroniques
	$('.critiques a').hover(function() {

		var title_chronique = $(this).children('img').attr('alt');
		var author_book = $(this).next('span').html();
		var description_book = $(this).next().next('p').html();

		if (!$(this).hasClass("active")) {
			$(this).addClass('active');
		}
		else {
			$(this).removeClass('active');
		}

		// affichage des infos
		$('.desc_crit .h2_like').html(title_chronique);
		$('.desc_crit .type_item').html(author_book);
		$('.desc_crit .desc_item').html(description_book);

	});

	// tabs
	$('.tabs a').click(function(e) {

		var tab_id = $(this).attr('href');
		var all_tabs = $(this).parent().parent().next('.row_tab_all').children();
		var all_links = $(this).parent().parent().children().children();

		$(all_links).removeClass('active');
		$(this).addClass('active');

		$(all_tabs).removeClass('open');
		$(tab_id).addClass('open');

		e.preventDefault();
	});

	// clickable div
	$('.clickable').click(function() {
		window.location = $(this).find("a").attr("href");
	});

	// flip forms
	$('#form-sign-in input, .why-account').click(function() {
		$('#cards').addClass('flipped');
	});
	$('.allready-an-account').click(function() {
		$('#cards').removeClass('flipped');
	});

	// Anathema
	var weather = ['sunny','cloudy','rainy','snowy','rainbow','starry','stormy'];
	var cities = ['Minas Tirith','Fendeval','Hobbiteville','Minas Morgul','Camorr','Ankh-Morpork','Tar Valon','Port-Réal','Castelcerf','Poudlard','Wielstadt','Edoras','Luthadel','Lorgol','Dros Delnoch','Ymrrir','Sunnydale','Konoha','Benden','Riva'];
	function getCity() {
		return cities[Math.floor(Math.random() * cities.length)];
	}
	function getWeather() {
		return weather[Math.floor(Math.random() * weather.length)];
	}
	var the_weather = getWeather();
	$('#footer').attr('data-weather',the_weather);
	$('#weather').addClass(the_weather);
	$('#weather_city > strong').html(getCity());

	// Timeline
	if ($('.tl1').length) {
		$('.tl1').timeline({
			openTriggerClass : '.read_more',
			startItem : '13/07/2012',
			closeText : 'x',
			ajaxFailMessage: 'Echec de mise à jour ajax'
		});
	}

	// select
	if ($('.preview').length) {
		$('#le_cycle').select2();
	}
	if ($('#les_auteurs').length) {
		$('#les_auteurs').select2();
	}

	// truncate text or not
	if ($('#news_general').length) {
		var mediaQuery = Modernizr.mq('(max-width: 1281px)');
		var mediaQueryBis = Modernizr.mq('(max-width: 1025px)');
		if (mediaQuery) {
			$('.truncate').succinct({
				size: 120
			});
		}
		if (mediaQueryBis) {
			$('.truncateBis').succinct({
				size: 160
			});
		}
	}

});

$(window).load(function() {

	// masonry list
	if ($('.liste_ouvrage').length) {
		var $container = $('#masonry_last');
		var $container_02 = $('#masonry_lists');
		// initialize
		$container.masonry({
			itemSelector: '.columns'
		});
		$container_02.masonry({
			itemSelector: '.columns'
		});
	}

});

// Kill hover on mobile
if ('createTouch' in document) {
	try {
		var ignore = /:hover/;
		for (var i = 0; i < document.styleSheets.length; i++) {
			var sheet = document.styleSheets[i];
			if (!sheet.cssRules) {
				continue;
			}
			for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
				var rule = sheet.cssRules[j];
				if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
					sheet.deleteRule(j);
				}
			}
		}
	}
	catch(e) {
	}
}
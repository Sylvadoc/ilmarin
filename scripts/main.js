$(document).ready(function() {
	'use strict';

	// overlay navigation
	$('.menu-trigger').click(function() {
		$('.m-scene').toggleClass('overlay-open');
		$('.overlay').toggleClass('open');
		setTimeout(function() {
            $('.menu-close').addClass('animate');
        }, 1000);
	});
	$('.menu-close').click(function() {
		$(this).removeClass('animate');
		$('.m-scene').removeClass('overlay-open');
		$('.overlay').removeClass('open');
	});

	// onscroll sticky header
	$('.m-scene').scroll(function() {
		if ($(this).scrollTop() < 150 && $("html").hasClass("desktop")) {
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

	// mobile
	if ($("html").hasClass("tablet") || $("html").hasClass("mobile") || $("html").hasClass("smallscreen")) {
		$('.the-header').addClass("sticky");
		$('.to_be_fixed').removeClass("sidebar_fixed");
	}

	// cnil
	if ($.cookie('cookie_cnil') === undefined) {
		$('#mp-pusher').append('<div id="cnil"><p>En poursuivant votre navigation sur le site, vous acceptez l\'utilisation de cookies. <a href="/cookies">En savoir plus</a>. <button id="cnil_ok">j\'accepte</button></p></div>');
		$('#cnil_ok').click(function(e){
			$.cookie('cookie_cnil', 'viewed');
			$('#cnil').fadeOut();
		});
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
	$('.critiques a').hover(function(e) {

		var title_chronique = $(this).children('img').attr('alt');
		var author_book = $(this).next('span').html();
		var description_book = $(this).next().next('p').html();

		if (!$(this).hasClass("active")) {
			$(this).addClass('active');
		}
		else {
			$(this).removeClass('active');
		}

		//affichage des infos
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
	$('.clickable').click(function(e) {
		window.location = $(this).find("a").attr("href");
	});

	// Anathema
	var weather = ['sunny','cloudy','rainy','snowy','rainbow','starry','stormy'];
	var cities = ['Minas Tirith','Fendeval','Hobbiteville','Minas Morgul','Camorr','Ankh-Morpork','Tar Valon','Port-Réal','Castelcerf','Poudlard','Wielstadt','Edoras','Luthadel','Lorgol','Dros Delnoch','Ymrrir','Sunnydale','Konoha'];
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
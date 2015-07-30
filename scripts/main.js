// variables d'environnement
var mobileLimit = 768;
var isMobile = false;

$(document).ready(function() {
	'use strict';

	// onscroll sticky header
	$('.m-scene').scroll(function() {
		if ($(this).scrollTop() < 300 && $("html").hasClass("desktop")) {
			$('header').removeClass("sticky");
			$('.to_be_fixed').removeClass("sidebar_fixed");
		}
		else if($(this).scrollTop() > 700 && $("html").hasClass("desktop")) {
			$('.to_be_fixed').addClass("sidebar_fixed");
		}
		else {
			$('header').addClass("sticky");
		}
	});

	// mobile
	if ($("html").hasClass("tablet") || $("html").hasClass("mobile") || $("html").hasClass("smallscreen")) {
		$('header').addClass("sticky");
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

	// modal windows
	$('.launch_modal').click(function(){
		var the_modal = $(this).attr('href');
		if (!$(''+the_modal+'').hasClass("modal_open")) {
			$(''+the_modal+'').addClass('modal_open');
		}
		else {
			$(''+the_modal+'').removeClass('modal_open');
		}
		return false;
	});
	$('.modal_close').click(function(){
		$(this).parent().parent('.modal').removeClass('modal_open');
	});
	$('.modal_overlay').click(function(){
		$('.modal').removeClass('modal_open');
	});

	// satellites toggle
	$('.network > a').click(function(){
		$(this).toggleClass('open-copernic');
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

	// masonry list
	if ($('#last_50').length) {
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
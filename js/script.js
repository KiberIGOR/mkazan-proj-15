$(function () {

	let
	// lazyArr = [].slice.call(document.querySelectorAll('.lazy')),
	// lazyArr = [].slice.call(querySelectorAllLive(document, '.lazy')),
	active = false,
	threshold = 200
	;

	const lazyLoad = function(e) {
		if (active === false) {
			active = true;
			let lazyArr = [].slice.call(document.querySelectorAll('.lazy'));

			setTimeout(function() {
				lazyArr.forEach(function(lazyObj) {
					if ((lazyObj.getBoundingClientRect().top <= window.innerHeight + threshold && lazyObj.getBoundingClientRect().bottom >= -threshold) && getComputedStyle(lazyObj).display !== 'none') {

						if ( lazyObj.dataset.src ) {
							let
							img = new Image(),
							src = lazyObj.dataset.src
							;
							img.src = src;
							img.onload = function() {
								if (!! lazyObj.parent) {
									lazyObj.parent.replaceChild(img, lazyObj);
								} else {
									lazyObj.src = src;
								}
							}
							lazyObj.removeAttribute('data-src');
						}

						if ( lazyObj.dataset.srcset ) {
							lazyObj.srcset = lazyObj.dataset.srcset;
							lazyObj.removeAttribute('data-srcset');
						}

						lazyObj.classList.remove('lazy');
						lazyObj.classList.add('lazy-loaded');

						lazyArr = lazyArr.filter(function(obj) {
							return obj !== lazyObj;
						});

						if (lazyArr.length === 0) {
							document.removeEventListener('scroll', lazyLoad);
							window.removeEventListener('resize', lazyLoad);
							window.removeEventListener('orientationchange', lazyLoad);
						}
					}
				});

				active = false;
			}, 1);
		}
	};

	function querySelectorAllLive(element, selector) {
		var result = Array.prototype.slice.call(element.querySelectorAll(selector));

		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				[].forEach.call(mutation.addedNodes, function(node) {
					if (node.nodeType === Node.ELEMENT_NODE && node.matches(selector)) {
						result.push(node);
					}
				});
			});
		});

		observer.observe(element, { childList: true, subtree: true });

		return result;
	}

	lazyLoad();

	document.addEventListener('scroll', lazyLoad);
	window.addEventListener('resize', lazyLoad);
	window.addEventListener('orientationchange', lazyLoad);

});

$(function () {
	/* Inits */
	initBodyScroll();
	initScroll();

	/* Functions */
	function initScroll() {
		if (!$('.scroll').length) return;
	
		$(document).on('click scroll.init', '.scroll', function (event) {
		  event.preventDefault();
		  $.fancybox.close();
	
		  var
			hrefId = $(this).attr('href') || $(this).data('href'),
			posTop = $(hrefId).offset().top;
		  $('html, body').animate({ scrollTop: posTop }, 1500);
		});
	}

	function initBodyScroll() {
		$(document)
		.on('scroll init.scroll', function () {
			var
			scroll_top = $(this).scrollTop(),
			/*window_height = $(window).height(),*/
			header_height = $('#header').height()
			;

			$('body').toggleClass('page-scrolled', scroll_top > header_height);

		})
		.trigger('init.scroll');
	}

	$(window).scroll(function(){
		if ($(window).scrollTop() >= 50) {
			$('.header').addClass('page-scrolled');
		}
		else {
			$('.header').removeClass('page-scrolled');
		}
	});

});
/* FAQ */

initFAQ();

    function initFAQ() {
      accordeon(document.querySelectorAll('.questions__item'));

      function accordeon(items) {
    
        if ( items.length === 0) { return };
    
        for ( let item of items ) {
    
        if ( item.querySelector('.questions__item-bottom').innerHTML ) {
    
          item.addEventListener('click', function() {
    
          this.classList.toggle('active');
          
          this.classList.contains('active') ?
          this.lastElementChild.style.height = 
          this.lastElementChild.scrollHeight + 'px' :
          this.lastElementChild.style.height = '0px';
          })
        }
        }
      }
    
  
};


/*Marquee skroling bar*/
innitMarquee();
function innitMarquee() {
	let a;

	if (document.body.clientWidth > 767) { a = 75 }
	else if (document.body.clientWidth > 320) { a = 30 };

	$('.marquee').marquee({
		duration: 20000,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		startVisible: true,
		speed: a
	});
}


/*Спикеры убирание data-more-hidden*/
$('[data-more-button]').on('init.more click', function (event) {
	var
		$container = $('[data-more-options]', $(this).parent()),
		options = {},
		visible = 0,
		window_width = $(window).width(),
		$items
		;

	options = $container.data('more-options');

	if (event.type == 'init') {
		visible = window_width > 767 ? options.init_desktop : options.init_mobile;

		/*if ( window_width > 767 && window_width < 1200 && visible % 2 == 0 ) {
		visible--;
		}*/
	}
	else {
		visible = window_width > 767 ? options.show_desktop : options.show_mobile;
	}

	$items = $(options.target + '[data-more-hidden]', $container);
	$items.slice(0, visible).removeAttr('data-more-hidden');

	$('html, body')
		.animate({ scrollTop: '+=1' }, 0)
		.animate({ scrollTop: '-=1' }, 0)
		;

	if ($items.length - visible <= 0) {
		$(this).addClass('d-none');
	}

})
	.trigger('init.more');


let $advantage_slider = $('.advantages__block'),
	settingsAdvantage = {
		mobileFirst: true,
		dots: true,
		arrows: true,
		infinite: false,

		centerMode: true,
		slidesToShow: 1.545,
		slidesToScroll: 1,
		centerPadding: '2rem',
		responsive: [
			{
				breakpoint: 767,
				settings: {

					variableWidth: true,
					centerMode: false,

					centerPadding: '0'
				}
			}
		]
	}

$advantage_slider.slick(settingsAdvantage);

$(window).on('resize', function () {
	if (!$advantage_slider.hasClass('slick-initialized')) {
		return $advantage_slider.slick(settingsAdvantage);
	}
});

let $stage_slider = $('.stages__block'),
	settingsStage = {
		mobileFirst: true,
		dots: true,
		arrows: true,
		infinite: false,

		centerMode: true,
		slidesToShow: 1.01,
		slidesToScroll: 1,
		centerPadding: '2rem',
		responsive: [
			{
				breakpoint: 767,
				settings: "unslick"
			}
		]

	}


$stage_slider.slick(settingsStage);

$(window).on('resize', function () {
	if (!$stage_slider.hasClass('slick-initialized')) {
		return $stage_slider.slick(settingsStage);
	}
});

$(function () {
    /* Inits */
    //initlazy();
    //backgraundmenu
    function initBodyScroll() {
        $(document)
            .on('scroll init.scroll', function () {
                var
                    scroll_top = $(this).scrollTop(),
                    /*window_height = $(window).height(),*/
                    header_height = $('#header').height()
                    ;

                $('body').toggleClass('page-scrolled', scroll_top > header_height);

            })
            .trigger('init.scroll');
    }


    /* Слайдеры */

    // let $advantage_slider = $('.organizator__block'),
    //     settingsAdvantage = {
    //         mobileFirst: true,
    //         dots: false,
    //         arrows: false,
    //         infinite: false,
    //         centerMode: true,
    //         slidesToShow: 1.545,
    //         slidesToScroll: 1,
    //         rows: 2,
    //         centerPadding: '10px',
    //         responsive: [
    //             {
    //                 breakpoint: 767,
    //                 settings: "unslick"
    //             }
    //         ]

    //     }


    // $advantage_slider.slick(settingsAdvantage);

    // $(window).on('resize', function () {
    //     if (!$advantage_slider.hasClass('slick-initialized')) {
    //         return $advantage_slider.slick(settingsAdvantage);
    //     }
    // });

});




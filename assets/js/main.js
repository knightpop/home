/*
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function() {

        $.scrollUp({
            animation: 'fade',
            scrollImg: {active: true, type: 'background', src: 'images/top.png'}
        });


		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
                function isMobile() {
                    if( navigator.userAgent.match(/Android/i)
                        || navigator.userAgent.match(/webOS/i)
                        || navigator.userAgent.match(/iPhone/i)
                        || navigator.userAgent.match(/iPad/i)
                        || navigator.userAgent.match(/iPod/i)
                        || navigator.userAgent.match(/BlackBerry/i)
                        || navigator.userAgent.match(/Windows Phone/i)
                    ){
                        return true;
                    }
                    else {
                        return false;
                    }
                }

                function isKorean() {
                    var userLang = navigator.language || navigator.userLanguage;
                    if(userLang.includes('ko')) return true;
                    else false;
                }

                var className = 'image';
                if(isMobile())
                	className += ' portfolio-slide-mobile';

                var pdfFile = '';
                if(isKorean())
                    pdfFile = 'Portfolio_Online_KOR.pdf';
                else
                    pdfFile = 'Portfolio_Online_ENG.pdf';

				$('#portfolio')
					.append('<iframe class="' + className + '" src="../ViewerJS/#../assets/pdf/' + pdfFile + '"></iframe>');
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Browser fixes.

			// IE: Flexbox min-height bug.
				if (skel.vars.browser == 'ie')
					(function() {

						var flexboxFixTimeoutId;

						$window.on('resize.flexbox-fix', function() {

							var $x = $('.fullscreen');

							clearTimeout(flexboxFixTimeoutId);

							flexboxFixTimeoutId = setTimeout(function() {

								if ($x.prop('scrollHeight') > $window.height())
									$x.css('height', 'auto');
								else
									$x.css('height', '100vh');

							}, 250);

						}).triggerHandler('resize.flexbox-fix');

					})();

			// Object fit workaround.
				if (!skel.canUse('object-fit'))
					(function() {

						$('.banner .image, .spotlight .image').each(function() {

							var $this = $(this),
								$img = $this.children('img'),
								positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);

							// Set image.
								$this
									.css('background-image', 'url("' + $img.attr('src') + '")')
									.css('background-repeat', 'no-repeat')
									.css('background-size', 'cover');

							// Set position.
								switch (positionClass.length > 1 ? positionClass[1] : '') {

									case 'left':
										$this.css('background-position', 'left');
										break;

									case 'right':
										$this.css('background-position', 'right');
										break;

									default:
									case 'center':
										$this.css('background-position', 'center');
										break;

								}

							// Hide original.
								$img.css('opacity', '0');

						});

					})();

		// Smooth scroll.
			$('.smooth-scroll').scrolly();
			$('.smooth-scroll-middle').scrolly({ anchor: 'middle' });

		// Wrapper.
			$wrapper.children()
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				});

		// Items.
			$('.items')
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					delay:		50,
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				})
				.children()
					.wrapInner('<div class="inner"></div>');

		// Gallery.
			$('.gallery')
				.wrapInner('<div class="inner"></div>')
				.prepend(skel.vars.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					delay:		50,
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				})
				.children('.inner')
					//.css('overflow', 'hidden')
					.css('overflow-y', skel.vars.mobile ? 'visible' : 'hidden')
					.css('overflow-x', skel.vars.mobile ? 'scroll' : 'hidden')
					.scrollLeft(0);

			// Style #1.
				// ...

			// Style #2.
				$('.gallery')
					.on('wheel', '.inner', function(event) {

						var	$this = $(this),
							delta = (event.originalEvent.deltaX * 10);

						// Cap delta.
							if (delta > 0)
								delta = Math.min(25, delta);
							else if (delta < 0)
								delta = Math.max(-25, delta);

						// Scroll.
							$this.scrollLeft( $this.scrollLeft() + delta );

					})
					.on('mouseenter', '.forward, .backward', function(event) {

						var $this = $(this),
							$inner = $this.siblings('.inner'),
							direction = ($this.hasClass('forward') ? 1 : -1);

						// Clear move interval.
							clearInterval(this._gallery_moveIntervalId);

						// Start interval.
							this._gallery_moveIntervalId = setInterval(function() {
								$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
							}, 10);

					})
					.on('mouseleave', '.forward, .backward', function(event) {

						// Clear move interval.
							clearInterval(this._gallery_moveIntervalId);

					});
	});

})(jQuery);
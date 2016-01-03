$(document).ready(function () {

	/*
	Scrolling & Animation for timeline
	*/

	var startAt = 1.4; 	//Start at 1/startAt screen
	
	/* declaration of flags to indicate whether element is displayed or not */
	var goldmarie_flag=false;
	var msc2_flag =false;
	var buffalo_flag=false;
	var ibm2_flag =false;
	var msc_flag =false;
	var ibm_flag =false;
	var omg_flag =false;
	var bsc_flag =false;
	var ms_flag  =false;
	var bsc_flag2 =false;

	var flag_2015 =false;
	var flag_2014 =false;
	var flag_2013 =false;
	var flag_2012 =false;
	var flag_2011 =false;
	var flag_2010 =false;
	var flag_2009 =false;

	/* array which includes all elements (event elements & year bubbles) of timeline */
	var sections = [
	{name : 'goldmarie_div', flag : goldmarie_flag},
	{name : 'msc2_div', flag : msc2_flag},
	{name : 'buffalo_div', flag : buffalo_flag},
	{name : 'ibm2_div', flag : ibm2_flag},
	{name : 'msc_div', flag : msc_flag},
	{name : 'ibm_div', flag : ibm_flag},
	{name : 'omg_div', flag : omg_flag},
	{name : 'bsc_div', flag : bsc_flag},
	{name : 'ms_div',  flag : ms_flag},
	{name : 'bsc_div2', flag : bsc_flag2},
	];

	var year_sections = [
	{name : 'div_2015', flag : flag_2015},
	{name : 'div_2014', flag : flag_2014},
	{name : 'div_2013', flag : flag_2013},
	{name : 'div_2012', flag : flag_2012},
	{name : 'div_2011', flag : flag_2011},
	{name : 'div_2010', flag : flag_2010},
	{name : 'div_2009', flag : flag_2009},
	];

	if (matchMedia('screen and (min-width: 960px)').matches) {

		var scrollFunction = function () {

			/* Position where the timeline should begin */
			var heightToTimeline = $('#about_timeline')[0].offsetTop;

			var fromTop = $(window).scrollTop();
			/* Position of the last bubble --> where timeline should end */
			var beginBubblePos = $('#begin_bubble').offset().top + $('#begin_bubble').height();
			/* current height of timeline bar*/
			var heightProgressLine = fromTop - heightToTimeline + $(window).height()/startAt;

			/*
			Let div increase while scrolling down
			*/
			if (fromTop + $(window).height()/startAt > heightToTimeline &&
				heightToTimeline + heightProgressLine < beginBubblePos) {

				$('#timeline_progress').css('height', (heightProgressLine+"px"));
		}

		/* automatically draw line till begin bubble */
		if ($(window).scrollTop() == $(document).height() - $(window).height()) {
			$('#timeline_progress').css('height', (beginBubblePos - heightToTimeline + "px"));
		}

			/*
			Show bubbles and description boxes while scrolling down
			*/	
			var fadeBubble = function (flag, element) {
				if (!flag && (heightToTimeline + heightProgressLine >= $('#' + element + ' .event_bubble').offset().top)) {
					flag = true;
					/*stop.animate() wegen hoch und runter scrollen --> probleme bei anzeige*/
					$('#' + element + ' .event_bubble').stop().animate({
						opacity: 1,
					}, 100, "linear");

					$('#' + element + ' .event_month').stop().animate({
						opacity: 1,
						marginLeft: '70px',
					}, 200, "linear");

					$('#' + element + ' .event_desc').stop().animate({
						opacity: 1,
						marginLeft: '550px',
					}, 200, "linear");

				} else if (heightToTimeline + heightProgressLine < $('#' + element + ' .event_bubble').offset().top) {
					flag = false;
					$('#' + element + ' .event_bubble').stop().animate({
						opacity: 0,
					}, 100, "linear");

					$('#' + element + ' .event_month').stop().animate({
						opacity: 0,
						marginLeft: '20px',
					}, 100, "linear");
					$('#' + element + ' .event_desc').stop().animate({
						opacity: 0,
						marginLeft: '610px',
					}, 100, "linear");
				}
			}

			var fadeYearBubble = function (flag, element) {
				if (!flag && (heightToTimeline + heightProgressLine >= $('#' + element + ' .year_bubble').offset().top)) {
					flag = true;

					$('#'+element+ ' .year_bubble').stop().animate({
						opacity: 1,
					}, 100, "linear");

				} else if (heightToTimeline + heightProgressLine < $('#' + element + ' .year_bubble').offset().top) {
					flag = false;
					$('#' + element + ' .year_bubble').stop().animate({
						opacity: 0,
					}, 100, "linear");
				}
			}

			/* calling function for every div of timeline */
			$.each(sections, function(index, value) {
				fadeBubble(value.flag, value.name);
			});

			$.each(year_sections, function(index, value) {
				fadeYearBubble(value.flag, value.name);
			});
		};


		$(window).scroll(scrollFunction);

			/*
			Display duration in timeline
			*/
			var expandDivTop = function (element, durationHeight) {
				element = $('#' + element + ' .timeline_duration');
				element.animate({
					marginTop: - durationHeight,
					height: durationHeight,
				}, 300);
			};

			var expandDivBot = function (element, durationHeight) {
				element = $('#' + element + ' .timeline_duration');
				element.animate({
					height: durationHeight,
				}, 300);
			};

			$('#goldmarie_bubble').mouseenter(function () {
				expandDivTop('goldmarie_bubble', 164);
			}).mouseleave(function () {
				expandDivTop('goldmarie_bubble', 0);
			});

			$('#msc_bubble_grad').mouseenter(function () {
				expandDivBot('msc_bubble_grad', 520);
			}).mouseleave(function () {
				expandDivBot('msc_bubble_grad', 0);
			});

			$('#buffalo_bubble').mouseenter(function () {
				expandDivTop('buffalo_bubble', 170);
			}).mouseleave(function () {
				expandDivTop('buffalo_bubble', 0);
			});

			$('#ibm2_bubble').mouseenter(function () {
				expandDivTop('ibm2_bubble', 100);
			}).mouseleave(function () {
				expandDivTop('ibm2_bubble', 0);
			});

			$('#msc_bubble').mouseenter(function () {
				expandDivTop('msc_bubble', 150);
			}).mouseleave(function () {
				expandDivTop('msc_bubble', 0);
			});

			$('#ibm_bubble').mouseenter(function () {
				expandDivTop('ibm_bubble', 170);
			}).mouseleave(function () {
				expandDivTop('ibm_bubble', 0);
			});

			$('#omg_bubble').mouseenter(function () {
				expandDivTop('omg_bubble', 170);
			}).mouseleave(function () {
				expandDivTop('omg_bubble', 0);
			});

			$('#bsc_bubble_grad').mouseenter(function () {
				expandDivBot('bsc_bubble_grad', 520);
			}).mouseleave(function () {
				expandDivBot('bsc_bubble_grad', 0);
			});

			$('#ms_bubble').mouseenter(function () {
				expandDivTop('ms_bubble', 325);
			}).mouseleave(function () {
				expandDivTop('ms_bubble', 0);
			});

			$('#bsc_bubble').mouseenter(function () {
				expandDivTop('bsc_bubble', 490);
			}).mouseleave(function () {
				expandDivTop('bsc_bubble', 0);
			});


		} else if (matchMedia('screen and (max-width: 960px) and (min-width: 450px').matches) {

			var scrollFunction = function () {

				var heightToTimeline = $('header').outerHeight() + $('#main_wrapper').outerHeight() - $('#about_timeline').outerHeight()
				- $('#image_wrapper').outerHeight() - $('#contactsection').outerHeight() - $('footer').outerHeight();

				/*
				Let div increase while scrolling down
				*/

				var fromTop = $(window).scrollTop();
				var beginBubblePos = $('#begin_bubble').offset().top + $('#begin_bubble').height();
				var endBubblePos = $('#div_2009').offset().top + $('#div_2009').height()/2;
				var heightProgressLine = fromTop - heightToTimeline + $(window).height()/startAt;

				if(fromTop + $(window).height()/startAt > heightToTimeline &&
					heightToTimeline + heightProgressLine < endBubblePos
					) {

					$('#timeline_progress').css('height', (heightProgressLine + "px"));
			}

			if($(window).scrollTop() == $(document).height() - ($('footer').outerHeight()+$('#contactsection').outerHeight)) {
				$('#timeline_progress').css('height', (endBubblePos - heightToTimeline + "px"));
			}

				/*
				Show bubbles and description boxes while scrolling down
				*/	

				var fadeBubble = function (flag, element) {
					if(!flag && (heightToTimeline + heightProgressLine >= $('#' + element + ' .event_bubble').offset().top)) {
						flag = true;
						/*stop.animate() wegen hoch und runter scrollen --> probleme bei anzeige*/
						$('#' + element + ' .event_bubble').stop().animate({
							opacity: 1,
						}, 100, "linear");

						$('#' + element + ' .event_month').stop().animate({
							opacity: 1,
							marginTop: '0px',
						}, 200, "linear");

						$('#' + element + ' .event_desc').stop().animate({
							opacity: 1,
							marginTop: '0px',
						}, 200, "linear");

					} else if (heightToTimeline + heightProgressLine < $('#' + element + ' .event_bubble').offset().top) {
						flag = false;
						$('#' + element + ' .event_bubble').stop().animate({
							opacity: 0,
						}, 100, "linear");

						$('#' + element + ' .event_month').stop().animate({
							opacity: 0,
							marginTop: '30px',
						}, 100, "linear");
						$('#' + element + ' .event_desc').stop().animate({
							opacity: 0,
							marginTop: '30px',
						}, 100, "linear");
					}
				}

				var fadeYearBubble = function (flag, element) {
					if (!flag && (heightToTimeline + heightProgressLine >= $('#' + element + ' .year_bubble').offset().top)) {
						flag = true;

						$('#'+element+ ' .year_bubble').stop().animate({
							opacity: 1,
						}, 100, "linear");

					} else if (heightToTimeline + heightProgressLine < $('#' + element + ' .year_bubble').offset().top) {
						flag = false;
						$('#' + element + ' .year_bubble').stop().animate({
							opacity: 0,
						}, 100, "linear");
					}
				}

				$.each(sections, function(index, value) {
					fadeBubble(value.flag, value.name);
				});

				$.each(year_sections, function(index, value) {
					fadeYearBubble(value.flag, value.name);
				});
			};


			$(window).scroll(scrollFunction);
			
			/*
			Display duration in timeline
			*/
			var expandDivTop = function (element, durationHeight) {
				element = $('#' + element + ' .timeline_duration');
				element.animate({
					marginTop: -durationHeight,
					height: durationHeight,
				}, 300);
			}

			var expandDivBot = function (element, durationHeight) {
				element = $('#' + element + ' .timeline_duration');
				element.animate({
					height: durationHeight,
				}, 300);
			}

			$('#goldmarie_bubble').mouseenter(function () {
				expandDivTop('goldmarie_bubble', 170);
			});

			$('#goldmarie_bubble').mouseleave(function () {
				expandDivTop('goldmarie_bubble', 0);
			});

			$('#msc_bubble_grad').mouseenter(function () {
				expandDivBot('msc_bubble_grad', 520);
			});

			$('#msc_bubble_grad').mouseleave(function () {
				expandDivBot('msc_bubble_grad', 0);
			});

			$('#buffalo_bubble').mouseenter(function () {
				expandDivTop('buffalo_bubble', 170);
			});

			$('#buffalo_bubble').mouseleave(function () {
				expandDivTop('buffalo_bubble', 0);
			});

			$('#ibm2_bubble').mouseenter(function () {
				expandDivTop('ibm2_bubble', 170);
			});

			$('#ibm2_bubble').mouseleave(function () {
				expandDivTop('ibm2_bubble', 0);
			});

			$('#msc_bubble').mouseenter(function () {
				expandDivTop('msc_bubble', 150);
			});

			$('#msc_bubble').mouseleave(function () {
				expandDivTop('msc_bubble', 0);
			});

			$('#ibm_bubble').mouseenter(function () {
				expandDivTop('ibm_bubble', 170);
			});

			$('#ibm_bubble').mouseleave(function () {
				expandDivTop('ibm_bubble', 0);
			});

			$('#omg_bubble').mouseenter(function () {
				expandDivTop('omg_bubble', 170);
			});

			$('#omg_bubble').mouseleave(function () {
				expandDivTop('omg_bubble', 0);
			});

			$('#bsc_bubble_grad').mouseenter(function () {
				expandDivBot('bsc_bubble_grad', 520);
			});

			$('#bsc_bubble_grad').mouseleave(function () {
				expandDivBot('bsc_bubble_grad', 0);
			});

			$('#ms_bubble').mouseenter(function () {
				expandDivTop('ms_bubble', 325);
			});

			$('#ms_bubble').mouseleave(function () {
				expandDivTop('ms_bubble', 0);
			});

			$('#bsc_bubble').mouseenter(function () {
				expandDivTop('bsc_bubble', 490);
			});

			$('#bsc_bubble').mouseleave(function () {
				expandDivTop('bsc_bubble', 0);
			});

		} else {

			$('.event_bubble').css('opacity', 1);
			$('.event_desc').css('opacity', 1);
			$('.event_month').css('opacity', 1);

			var heightToTimeline = $('header').outerHeight() + $('#main_wrapper').outerHeight() - $('#about_timeline').outerHeight()
			- $('#image_wrapper').outerHeight() - $('#contactsection').outerHeight() - $('footer').outerHeight();

			var heightTimeLine = $('#begin_bubble').offset().top - heightToTimeline;

			$('#timeline_progress').css('height', (heightTimeLine+"px"));
		}

	});

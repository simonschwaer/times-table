(function ($) {
	"use strict";

	var interval = false;
	var playing = true;
	var settingsOpen = false;
	var $canvas = false;

	var resizeId;

	var colorSets = [
		{
			primary: ["53777A", "D95B43", "ECD078"],
			secondary: ["542437", "53777A", "C02942"]
		},
		{
			primary: ["E5DAE3", "645468", "556270"],
			secondary: ["556270", "033649", "2E2633"]
		},
		{
			primary: ["CDB380", "036564", "E8DDCB"],
			secondary: ["031634", "E8DDCB", "033649"]
		},
		{
			primary: ["CC333F", "EDC951", "6A4A3C"],
			secondary: ["6A4A3C", "00A0B0", "EB6841"]
		},
		{
			primary: ["351330", "CC2A41", "64908A"],
			secondary: ["E8CAA4", "424254", "351330"]
		},
		{
			primary: ["BFB35A", "F2C45A", "5E8C6A"],
			secondary: ["5E8C6A", "8C2318", "BFB35A"]
		}
	];
	var colorSet = colorSets[Math.floor(Math.random() * (colorSets.length - 0))];

	$(document).ready(function () {
		drawCanvas();

		draw(parseFloat($('#multiplier').val()), parseInt($('#modulo').val(), 10));

		$(window).resize(function () {
			clearTimeout(resizeId);
			resizeId = setTimeout(function () {
				drawCanvas();
				draw(parseFloat($('#multiplier').val()), parseInt($('#modulo').val(), 10), !playing);
			}, 100);
		});

		$('[data-toggle="offcanvas"]').click(function (e) {
			settingsOpen = !settingsOpen;
			$('.row-offcanvas').toggleClass('active');
			$('.settings-open').fadeToggle(250);

			e.preventDefault();
		});

		$('#settings input[type="text"]').change(function () {
			if (!playing) draw(parseFloat($('#multiplier').val()), parseInt($('#modulo').val(), 10), true);
		}).focus(function () {
			if (playing && interval) {
				clearInterval(interval);
			}
		}).blur(function () {
			if (playing) {
				draw(parseFloat($('#multiplier').val()), parseInt($('#modulo').val(), 10));
			}
		});

		$('#toggle').click(function (e) {
			if (interval && playing) {
				clearInterval(interval);
				playing = false;
				$(this).html('<i class="icon-play"></i> Resume');
			} else {
				draw(parseFloat($('#multiplier').val()), parseInt($('#modulo').val(), 10));
				playing = true;
				$(this).html('<i class="icon-pause"></i> Pause');
			}

			e.preventDefault();
		});

		$("body").mouseup(function (e) {
			if (settingsOpen && $(e.target).closest("#sidebar").length === 0) {
				settingsOpen = !settingsOpen;
				$('.row-offcanvas').toggleClass('active');
				$('.settings-open').fadeToggle(250);
			}
		});
	});

	var draw = function (multi, modulo, single) {
		var primary = new Rainbow();
		var secondary = new Rainbow();
		primary.setNumberRange(0, modulo);
		secondary.setNumberRange(0, modulo);
		primary.setSpectrum.apply(this, colorSet.primary);
		secondary.setSpectrum.apply(this, colorSet.secondary);

		var width = $('#stage').width();
		var height = $('#stage').height();
		var radius = height / 2.5;

		if (width < height)
			radius = width / 2.2;

		var origin = {
			x: width / 2,
			y: height / 2
		};

		if ((typeof(single) != "undefined" && single)) {
			drawStep(multi, $canvas, primary, secondary, radius, origin, modulo);
		} else {
			var i = multi;
			interval = setInterval(function () {
				drawStep(i, $canvas, primary, secondary, radius, origin, modulo);
				$('#multiplier').val(i);

				i = Math.round((i + 0.01) * 100) / 100;

				if (i > modulo) i = 0;
			}, 30);
		}
	};

	var drawStep = function (i, $canvas, primary, secondary, radius, origin, modulo) {
		$canvas.timesTable({
			modulo: modulo,
			multiplier: i,
			color: "#" + primary.colourAt(i),
			radius: radius,
			origin: origin
		});

		$('body').css('background-color', "#" + secondary.colourAt(i));
		$('.change-color').css('color', "#" + primary.colourAt(i));
	};

	var drawCanvas = function () {
		if (interval) clearInterval(interval);
		$canvas = $('<canvas />', {
			id: 'plouffe',
		}).attr({
			height: $('#stage').height(),
			width: $('#stage').width()
		}).text("Please get a browser that does not suck.");
		$('#stage').html($canvas);
	};
}(jQuery));
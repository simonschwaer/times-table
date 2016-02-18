(function ($) {
	"use strict";

	$.fn.timesTable = function (options) {
		var defaultOptions = {
			multiplier: 2,
			modulo: 200,
			radius: 300,
			origin: {
				x: 400,
				y: 400
			},
			lineWidth: 1,
			color: "#000000"
		};
		options = $.extend(defaultOptions, options);

		var $container = this,
			destination = [],
			coordinates = [];

		for (var i = 0; i <= options.modulo; i++) {
			destination[i] = (i * options.multiplier) % options.modulo;

			var angle = i * 2 * Math.PI / options.modulo;
			coordinates[i] = {
				x: options.origin.x + (options.radius * Math.cos(angle)),
				y: options.origin.y + (options.radius * Math.sin(angle))
			};
		}

		var canvas = $container[0].getContext("2d");
		canvas.clearRect(0, 0, $container.width(), $container.height());

		for (var k = 0; k <= options.modulo; k++) {
			canvas.beginPath();
			canvas.lineWidth = "" + options.lineWidth;
			canvas.strokeStyle = options.color;
			canvas.moveTo(coordinates[k].x, coordinates[k].y);
			canvas.lineTo(coordinates[Math.round(destination[k])].x, coordinates[Math.round(destination[k])].y);
			canvas.stroke();
		}

		return this;
	};
}(jQuery));
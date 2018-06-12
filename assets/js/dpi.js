var hashRegex = /^#(\d+)[x×](\d+)(@(\d*\.?\d+)["″])?|(\d*\.?\d+)["″]$/;

var dppx = window.devicePixelRatio ||
    (window.matchMedia && window.matchMedia("(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches? 2 : 1) ||
    1;

width.value = screen.width * dppx;
height.value = screen.height * dppx;

var output = $('output');

function calcDpi(w, h, d, opt) {
	// Calculate PPI/DPI
	w > 0 || (w = 1);
	h > 0 || (h = 1);
	opt   || (opt = 'd');
	var dpi = (opt == 'd' ? Math.sqrt(w * w + h * h) : opt == 'w' ? w : h) / d;
	return dpi > 0 ? Math.round(dpi) : 0;
}

function update() {
	var w = width.value,
	    h = height.value;

	result.textContent = calcDpi(w, h, physical.value, dimension.value);

	// Size the output to have the same aspect ratio as the screen
	var ratio = w / h;

	output.style.minWidth = result.parentNode.offsetWidth + 'px';
	output.style.width    = ratio > 1 ? '' : '10em';
	output.style.height   = output.offsetWidth / ratio + 'px';
}

dimension.onchange = update;

$$('fieldset input').forEach(function(element) {
	(element.oninput = function () {
		update();
	}).call(element);
});

(window.onhashchange = function() {
	var hash = decodeURIComponent(location.hash);

	if (hashRegex.test(hash)) {
		var matches = hash.match(hashRegex);

		if (matches[1]) {
			width.value = matches[1]
			width.oninput();
		}

		if (matches[2]) {
			height.value = matches[2];
			height.oninput();
		}

		if (matches[3] || matches[5]) {
			if (matches[3]) {
				physical.value = matches[4];
			}

			if (matches[5]) {
				physical.value = matches[5];
			}

			dimension.value = 'd';
			physical.oninput();
		}
	}
})();
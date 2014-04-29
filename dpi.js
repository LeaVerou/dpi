var hashRegex = /^#(\d+)[x×](\d+)(@(\d*\.?\d+)["″])?|(\d*\.?\d+)["″]$/;

var dppx = window.devicePixelRatio ||
    (window.matchMedia && window.matchMedia("(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches? 2 : 1) ||
    1;

width.value = screen.width * dppx;
height.value = screen.height * dppx;

var output = $('output');

function calcDpi(w, h, d, opt) {
	// Calculate PPI/DPI
	w>0 || (w=1);
	h>0 || (h=1);
	opt || (opt='d');
	var dpi = (opt=='d' ? Math.sqrt(w*w + h*h) : opt=='w' ? w : h) / d;
	return dpi>0 ? Math.round(dpi) : 0;
}

function update() {	
	var w = width.value,
	    h = height.value;

	result.textContent = calcDpi(w, h, physical.value, dimension.value);
	
	// Size the output to have the same aspect ratio as the screen
	var ratio = w/h;
	
	output.style.minWidth = result.parentNode.offsetWidth;
	
	if (ratio > 1) {
		output.style.width = '';
	}
	else {
		output.style.width = '10em';
	}
	
	output.style.height = output.offsetWidth / ratio + 'px';
}

dimension.onchange = update;

$$('fieldset input').forEach(function(element) {
	(element.oninput = function () {
		this.style.width = this.value.length * .7 + 'em';
		this.style.width = this.value.length + 'ch';
		update();
	}).call(element);
});

$$('#resolutions a, #diagonals a').forEach(function(a) {
	a.href = '#' + a.textContent;
});

$u.xhr({
	url: 'screens.json',
	callback: function (xhr) {
		window.Devices = JSON.parse(xhr.responseText);
		
		var fragment = document.createDocumentFragment();
		
		Devices.forEach(function (device) {
			device.ppi || ( device.ppi = calcDpi(device.w, device.h, device.d) );
		});

		window.Devices = Devices.sort(function (device1, device2) {
			return (device2.ppi - device1.ppi);
		});

		Devices.forEach(function (device) {
			deviceRow(device, fragment);
		});
		
		var tbody = $('table tbody', devices);
		
		tbody.innerHTML = '';

		tbody.appendChild(fragment);
	}
});

function deviceRow(device, fragment) {
	return $u.element.create('tr', {
		contents: [
			{
				tag: 'th',
				contents: {
					tag: 'a',
					properties: {
						href: '#' + device.w + '×' + device.h + '@' + device.d + '″'
					},
					contents: device.name
				}
			}, {
				tag: 'td',
				contents: device.d + '″'
			}, {
				tag: 'td',
				contents: device.w + '×' + device.h
			}, {
				tag: 'td',
				contents: device.ppi
			}, {
				tag: 'td',
				contents: device.dppx || 1
			}
		],
		inside: fragment
	});
}


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

search.oninput = function() {
	if (!window.Devices) {
		return;
	}
	
	var term = this.value;
	
	var fragment = document.createDocumentFragment(),
	    results = 0;
	
	Devices.forEach(function (device) {
		for (var i in device) {
			if ((device[i] + '').toLowerCase().indexOf(term.toLowerCase()) > -1) {
				deviceRow(device, fragment);
				results++;
				return;
			}
		}
	});
	
	var tbody = $('table tbody', devices);
	
	tbody.innerHTML = results? '' : '<tr><td colspan="4">No results</td></tr>';
	
	tbody.appendChild(fragment);
};

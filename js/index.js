'use strict'

var headers = document.querySelectorAll('.headline');
var descriptions = document.querySelectorAll('.info__description');
var placeholders = document.querySelectorAll('.placeholder');
var infos = document.querySelectorAll('.info');

placeholders[0].style.height = headers[0].offsetHeight + 'px';

function getTop(element, i) {
	var h = placeholders[0].offsetHeight;
	for (var k = 0; k < i; k++) {
		h += infos[k].offsetHeight;
	}
	return h;
};

var topPosition = Array.prototype.map.call(infos, getTop);

var defaultPosition = Array.prototype.map.call(headers,function(el){
	return {
		top: el.getBoundingClientRect().top,
		height: el.offsetHeight
	};
});

var paddings = Array.prototype.map.call(descriptions,function(element){
	return parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-top"));
});

var cls = 'info__header--sticky';

function manipulate(logic, element, index, clas) {
	if (logic && !element.classList.contains(clas)) {
		element.classList.add(clas);
		descriptions[index].style.paddingTop = paddings[index] + defaultPosition[index].height + 'px';
	} else if (!logic && element.classList.contains(clas)) {
		element.classList.remove('info__header--sticky');
		descriptions[index].style.paddingTop = paddings[index] + 'px';
	}
};

function sticky() {
	for(var i = 1; i < headers.length; i++) {
		var bool = pageYOffset >= topPosition[i];
		manipulate(bool, headers[i], i, cls);
	}
}

function rebuild() {
	topPosition = Array.prototype.map.call(infos, getTop);
	sticky();
}


window.onscroll = sticky;
window.onresize = rebuild;
window.orientationchange = rebuild;
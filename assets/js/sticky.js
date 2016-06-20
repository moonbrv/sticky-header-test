'use strict'

var headers = document.querySelectorAll('.headline');
var descriptions = document.querySelectorAll('.info__description:before');

var defaultPosition = Array.prototype.map.call(headers,function(el){
	return {
		top: el.getBoundingClientRect().top,
		height: el.offsetHeight
	};
});

Array.prototype.forEach.call(descriptions, function (el, i) {
	el.style.height = defaultPosition[i].height + 'px';
});

var stack = 0;

var cls = 'info__header--sticky';

function manipulate(logic, element, index, clas) {
	if (logic && !element.classList.contains(clas)) {
		//console.log(index + '    ' + pageYOffset + '   ' + (defaultPosition[index].top - stack));
		element.classList.add(clas);
		stack += defaultPosition[index].height;
		//descriptions[index].style.display = 'block';
		console.log(index + '    ' + 'add class, stack now is '+ stack);
	} else if (!logic && element.classList.contains(clas)) {
		//console.log(index + '    ' + pageYOffset + '   ' + (defaultPosition[index].top - stack));
		element.classList.remove('info__header--sticky');
		//descriptions[index].style.display = 'none';
		stack -= defaultPosition[index].height;
		//console.log(index + '    ' + 'REMOVE class, stack now is '+ stack);
	}
};

function sticky() {
	for(var i = 1; i < headers.length; i++) {
		var bool = pageYOffset >= (defaultPosition[i].top - stack);
		manipulate(bool, headers[i], i, cls);
	}

}


window.onscroll = sticky;


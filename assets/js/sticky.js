'use strict'

var headers = document.querySelectorAll('.headline');
var descriptions = document.querySelectorAll('.info__description');
var placeholders = document.querySelectorAll('.placeholder');
var infos = document.querySelectorAll('.info');

/*placeholder get hight of first header, 
when hight of it < header.hight, 
header will hide some area of section below
*/
//placeholders[0].style.height = headers[0].offsetHeight + 'px';

//get sum of hights of all alements above selected + placeholder.hight
function getTop(element, i) {
	var h = placeholders[0].offsetHeight;
	for (var k = 0; k < i; k++) {
		h += infos[k].offsetHeight;
	}
	return h;
};

//get offset each section from document's top
var topPosition = Array.prototype.map.call(infos, getTop);

//get hight of each element
function getElementHight(el) {
	return el.offsetHeight;
};

var headersHeight = Array.prototype.map.call(headers, getElementHight);

//get top padding of each section
var paddings = Array.prototype.map.call(descriptions,function(element){
	return parseInt(window.getComputedStyle(element, null).getPropertyValue("padding-top"));
});

//classname that will make header sticky
var cls = 'info__header--sticky';

//this function will make our headers sticky
function manipulate(logic, element, index, clas) {
	if (logic && !element.classList.contains(clas)) {
		//if true and have no sticky className
		element.classList.add(clas);
		/*add header height to the padding-top of element, 
		so the header will not hide unread secrion area*/
		descriptions[index].style.paddingTop = paddings[index] + headersHeight[index] + 'px';
	} else if (!logic && element.classList.contains(clas)) {
		//if false and have sticky className
		element.classList.remove('info__header--sticky');
		//set padding-top default value
		descriptions[index].style.paddingTop = paddings[index] + 'px';
	}
};


function sticky() {
	for(var i = 0; i < headers.length; i++) {
		//if (scroll of the Page > an element's offset from document's top) then true
		var bool = pageYOffset >= topPosition[i];
		manipulate(bool, headers[i], i, cls);
	}
};

function rebuild() {
	topPosition = Array.prototype.map.call(infos, getTop);
	sticky();
};

window.onscroll = sticky;
window.onresize = rebuild;
window.orientationchange = rebuild;
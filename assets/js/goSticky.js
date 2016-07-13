/******************************************************
*
*	This module contain a function, that can create
*	a sticky header inside selected element.
*	Sticky header will have the same height, text and styles,
*	as original header. It is responsive.
*
******************************************************/

/**
*	-------------------
*	Function: goSticky
*	-------------------
*
*	Name of argument		|	Type	|	Description
*	------------------------|-----------|-------------------------------------------
*	headerClass				|	string	|	className of headers in your document
*							|			|	For example 'headers' or 'page__headers'
*	------------------------|-----------|-------------------------------------------
*	mountQuerySelector		|	string	|	querySelector where you will place your sticky header
*							|			|	For example '#app' or '.news'
*	------------------------|-----------|-------------------------------------------
*	stickyId				|	string	|	name of ID that contains styles for your sticky header
*							|			|	For example '#sticky-header' or '#top-header'
*	------------------------|-----------|-------------------------------------------
**/
export default function goSticky(headerClass, mountQuerySelector, stickyId) {
	//select all headers in document
	function getHeaders(){
		return document.querySelectorAll(`.${headerClass}`)
	}

	let headers = getHeaders();

	//this variable define which header is current will be simulated by sticky header
	let current;

	//helper variable, see change() method;
	let max;

	//helper function that get offset from element to the top of viewport
	function getTop(el) {
		return el.getBoundingClientRect().top;
	}

	//helper function that set our sticky header width = parent.style.width
	function calcWidth() {
		stickyHeader.style.width = window.getComputedStyle(document.querySelector(mountQuerySelector), null).getPropertyValue('width');
	}

	//creating sticky-header
	const stickyHeader = document.createElement('div');
	stickyHeader.id = stickyId || '';

	//mount sticky header in to chosen element
	function mount() {
		calcWidth();
		document.querySelector(mountQuerySelector).appendChild(stickyHeader);
	}

	//remove sticky header from document
	function remove() {
		return stickyHeader.parentNode.removeChild(stickyHeader);
	}

	//change sticky header style
	function change () {
		//iterate thru all headers
		for (let i = 0; i < headers.length; i++) {
			//get index of last hidden header and set it to helper variable max;
			max = (getTop(headers[i]) <= 0) ? i : max;
		}
		//change sticky header if current index of it is not the same as index latest hidden header
		if (current != max) {
			current = max;
			stickyHeader.innerHTML = headers[max].innerHTML;
			stickyHeader.style.backgroundColor = window.getComputedStyle(headers[max], null).getPropertyValue('background-color') || '';
		}
	}

	//check if we need to do something with sticky header
	function check() {
		//if sticky header is not on page
		if (!document.getElementById(stickyId)) {
			//if first header is hidden
			if (getTop(headers[0]) <= 0) {
				mount();
				change();
			}
		} else {
			//if sticky header is on page and first heder is NOT hidden
			if (getTop(headers[0]) > 0) {
				//remove sticky header from page
				remove();
			} else {
				// if if sticky header is on page and irst heder is hidden - check if we need to change something
				change();
			}
		}
	}

	/**
	*	helper function that combines other function,
	*	to use it in events like:
	*	onresize,
	*	onload,
	*	orientationchange
	**/
	function rebuild() {
		calcWidth();
		check();
	}

	/**
	*	helper function that must be trigger on dynamic elements of page
	*
	*	For example we use sticky header inside container that dynamicly change his content,
	*	this fucntion will get new headers after event inside container,
	*	and execute rebuild function
	**/
	function redefine() {
		headers = getHeaders();
		rebuild();
	}
	
	
	//return Obj that have functions to using in events
	return {
		check,
		rebuild,
		redefine
	};
}
/**
*	import HTML to HMR in development,
*	script and link tags will be automaticaly put by HtmlWebpackPlugin 
*/
/*eslint-disable */
if (NODE_ENV == 'development') {
	require('./../index.tmpl.html');
}
/*eslint-enable */

//import our styles
import './../scss/style';

/**
*	import module that contains function,
*	wich will help us to create and manipulate sticky header
**/
import goSticky from './goSticky';

/**
*	Create sticky header obj.
*	Sticky header will..:
*						imitate headers with class 'info__header'
*						be mount in a first element on page with '.container' class
*						have styles that define in #sticky, in our stylesheets
**/
let sticky = goSticky('info__header', '.container', 'sticky');

/**
*	if any event that affect headers position will happend,
*	we will call functions that manipulate sticky header
**/
window.onload = sticky.rebuild;
window.onscroll = sticky.check;
window.onresize = sticky.rebuild;
window.orientationchange = sticky.rebuild;
/*globals chrome control*/

"use strict";

var tabs = chrome.tabs,
	fired = false;

var js = ['dom', 'grab', 'settings', 'highlighter', 'selection',
			'collection', 'dropdown', 'control', 'main'];

chrome.browserAction.onClicked.addListener(function () {
	if (fired) return tabs.executeScript(null, { file : 'src/showControl.js' });
	fired = true;

	tabs.insertCSS(null, { file : 'src/ui.css' });
	tabs.executeScript(null, { file : 'lib/underscore.js' });

	for (var i = 0, l = js.length; i < l; i++) {
		tabs.executeScript(null, { file : 'src/' + js[i] + '.js' });
	}
});

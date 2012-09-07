/*globals chrome control*/

"use strict";

var tabs = chrome.tabs;

var js = ['dom', 'grab', 'settings', 'highlighter', 'selection',
			'collection', 'dropdown', 'control', 'main'];

var visitedTabs = {};

function showControl() {
	tabs.executeScript(null, { code : 'window.control.show();' });
}

function insertExtension() {
	tabs.insertCSS(null, { file : 'src/ui.css' });
	tabs.executeScript(null, { file : 'lib/underscore.js' });

	for (var i = 0, l = js.length; i < l; i++) {
		tabs.executeScript(null, { file : 'src/' + js[i] + '.js' });
	}
}

chrome.browserAction.onClicked.addListener(function (tab) {
	var id = tab.id;
	if (visitedTabs[id]) {
		showControl();
	} else {
		visitedTabs[id] = true;
		insertExtension();
	}
});

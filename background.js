/*globals chrome */

"use strict";

var tabs = chrome.tabs;

var js = ['dom', 'grab', 'settings', 'highlighter', 'selection',
			'collection', 'dropdown', 'popup', 'control', 'main'];

var visitedTabs = {};

function toggleControl() {
	tabs.executeScript(null, { code : 'toggle();' });
}

function insertExtension() {
	tabs.insertCSS(null, { file : 'src/ui.css' });
	tabs.executeScript(null, { file : 'lib/underscore.js' });

	for (var i = 0, l = js.length; i < l; i++) {
		tabs.executeScript(null, { file : 'src/' + js[i] + '.js' });
	}
}

function onUnload(fn) {
	chrome.extension.onMessage.addListener(function (request, sender) {
		fn(sender.tab.id);
	});
}

chrome.browserAction.onClicked.addListener(function (tab) {
	var id = tab.id;
	if (visitedTabs[id]) {
		toggleControl();
	} else {
		visitedTabs[id] = true;
		insertExtension();
		onUnload(function (id) { visitedTabs[id] = undefined; });
	}
});

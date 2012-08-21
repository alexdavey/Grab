chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.insertCSS(null, { file : 'ui.css' });
	chrome.tabs.executeScript(null, { file : 'underscore.js' });
	chrome.tabs.executeScript(null, { file : 'dom.js' });
	chrome.tabs.executeScript(null, { file : 'grab.js' });
	chrome.tabs.executeScript(null, { file : 'highlighter.js' });
	chrome.tabs.executeScript(null, { file : 'selection.js' });
	chrome.tabs.executeScript(null, { file : 'ui.js' });
});

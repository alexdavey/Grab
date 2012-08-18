chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, { file : 'underscore.js' });
	chrome.tabs.executeScript(null, { file : 'grab.js' });
	chrome.tabs.executeScript(null, { file : 'ui.js' });
});

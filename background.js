chrome.browserAction.onClicked.addListener(function(tab) {
	console.log('FIRED!');
	chrome.tabs.executeScript(null, { file : 'underscore.js' });
	chrome.tabs.executeScript(null, { file : 'grab.js' });
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.insertCSS(null, { file : 'src/ui.css' });
	chrome.tabs.executeScript(null, { file : 'lib/underscore.js' });
	chrome.tabs.executeScript(null, { file : 'src/dom.js' });
	chrome.tabs.executeScript(null, { file : 'src/grab.js' });
	chrome.tabs.executeScript(null, { file : 'src/highlighter.js' });
	chrome.tabs.executeScript(null, { file : 'src/selection.js' });
	chrome.tabs.executeScript(null, { file : 'src/main.js' });
});

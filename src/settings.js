window.settings = {
	threshold : 2,
	bubbleDepth : 3,
	similarityThreshold : 350,
	initialColor : { r : 0, g : 0, b : 0 },
	copyMessage : 'Press ' + ($.isMacOs ? 'Cmd' : 'Ctrl') + '-C to copy',
	popupClass : '.grab-popup',
	copiedMessage : 'Text copied!',
	dropdownClass : '.grab-dropdown',
	confirmedClass : '.grab-confirmed',
	extrapolatedClass : '.grab-extrapolated',
	dropdownChildClass : '.grab-dropdownChild',
	controlId : '#grab-controls',
	screenClass : '#grab-screen',
	removedClass : '.grab-removed',
	clipboardClass : '#grab-clipboard',
	currentClass : '#grab-currentSelection'
};

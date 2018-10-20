const imgData = [];

function preload() {

	function addImg(name) {
		imgData[name] = chrome.runtime.getURL("assets/content_images/gifs/" + name + ".png");
		//imgData[name] = loadImage("assets/content_images/gifs/" + name + ".png");
	}

	// addImg("...");

}
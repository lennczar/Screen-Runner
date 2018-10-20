const imgData = [];

function preload() {

	function addImg(name) {
		imgData[name] = loadImage("https://res.cloudinary.com/screen-runner/content_images/gifs/" + name + ".png");
=======
		imgData[name] = chrome.runtime.getURL("assets/content_images/gifs/" + name + ".png");
		//imgData[name] = loadImage("assets/content_images/gifs/" + name + ".png");
>>>>>>> 351073798ec46d821603919aab3e71e6d7762a33
	}

	// addImg("...");
	addImg("duesentrieb1");
	addImg("duesentrieb2");
	addImg("duesentrieb3");
}
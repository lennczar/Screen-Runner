const imgData = [];

function preload() {

	function addImg(name) {
		imgData[name] = loadImage("https://res.cloudinary.com/screen-runner/content_images/gifs/" + name + ".png");
	}

	// addImg("...");
	addImg("duesentrieb1");
	addImg("duesentrieb2");
	addImg("duesentrieb3");
}
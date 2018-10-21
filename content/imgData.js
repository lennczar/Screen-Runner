const imgData = [];
const soundData = [];

const names = [
	"triebwerk/an_1",
	"triebwerk/an_2",
	"triebwerk/an_3",
	"triebwerk/an_4",
	"triebwerk/an_5",
	"triebwerk/an_6",
	"triebwerk/an_7",
	"projectile/pj_1",
	"projectile/pj_2",
	"projectile/pj_3",
	"projectile/pj_4",
	"projectile/pj_5",
	"projectile/pj_6",
	"projectile/pj_7",
	"projectile/pj_8",
	"projectile/pj_9",
	"projectile/pj_10",
	"start/st_1",
	"start/st_2",
	"start/st_3",
	"start/st_4",
	"start/st_5",
	"start/st_6",
	"start/st_7",
	"start/st_8",
	"start/st_9",
	"start/st_10",
	"start/st_11",
	"start/st_12",
	"ende/en_1",
	"ende/en_2",
	"ende/en_3",
	"ende/en_4",
	"ende/en_5",
	"ende/en_6",
	"ende/en_7",
	"ende/en_8",
	"ende/en_9",
	"exploding projectiles/ep-1",
	"exploding projectiles/ep-2",
	"exploding projectiles/ep-3",
	"exploding projectiles/ep-4",
	"exploding projectiles/ep-5",
	"exploding projectiles/ep-6",
	"exploding projectiles/ep-7",
	"exploding projectiles/ep-8",
	"exploding projectiles/ep-9",
	"skins/ha_1"
];

const sounds = [
	"a_great_comeback_terrasound.mp3"
];

function preload() {
	
	for (let sound of sounds) {
		soundData[sound] = loadSound("https://s3-eu-west-1.amazonaws.com/codebakery/" + sound ); 
	}

	for (let name of names) {
		imgData[name.split("/")[1]] = loadImage("https://res.cloudinary.com/dppptdvdv/" + name + ".png");
	}
}
const imgData = [];

const names = [
	"triebwerk/antrieb_1",
	"triebwerk/antrieb_2",
	"triebwerk/antrieb_3",
	"triebwerk/antrieb_4",
	"triebwerk/antrieb_5",
	"triebwerk/antrieb_6",
	"triebwerk/antrieb_7",
	"projectile/projectile_1",
	"projectile/projectile_2",
	"projectile/projectile_3",
	"projectile/projectile_4",
	"projectile/projectile_5",
	"projectile/projectile_6",
	"projectile/projectile_7",
	"projectile/projectile_8",
	"projectile/projectile_9",
	"projectile/projectile_10",
	"start/start_1",
	"start/start_2",
	"start/start_3",
	"start/start_4",
	"start/start_5",
	"start/start_6",
	"start/start_7",
	"start/start_8",
	"start/start_9",
	"start/start_10",
	"start/start_11",
	"start/start_12",
	"ende/ende_1",
	"ende/ende_2",
	"ende/ende_3",
	"ende/ende_4",
	"ende/ende_5",
	"ende/ende_6",
	"ende/ende_7",
	"ende/ende_8",
	"ende/ende_9",
	"exploding projectiles/exploding-projectile-1",
	"exploding projectiles/exploding-projectile-2",
	"exploding projectiles/exploding-projectile-3",
	"exploding projectiles/exploding-projectile-4",
	"exploding projectiles/exploding-projectile-5",
	"exploding projectiles/exploding-projectile-6",
	"exploding projectiles/exploding-projectile-7",
	"exploding projectiles/exploding-projectile-8",
	"exploding projectiles/exploding-projectile-9",
	"skins/hand_1"
];

function preload() {
	for (let name of names) {
		imgData[name.split("/")[1]] = loadImage("https://res.cloudinary.com/dppptdvdv/" + name + ".png");
	}
}
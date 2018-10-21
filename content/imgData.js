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
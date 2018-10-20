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
];

function preload() {
	for (let name of names) {
		imgData[name.split("/")[1]] = loadImage("https://res.cloudinary.com/dppptdvdv/" + name + ".png");
	}
}
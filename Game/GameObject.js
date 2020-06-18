class GameObject {

	constructor(y, img) {
		this.y = y;
		this.sprite = img;
		this.x = null; //not currently being rendered
	}

	render(x, ctx) {
		ctx.drawImage(this.sprite, x, this.y);
	}

	render(x, ctx, spriteX, spriteY, spriteWidth, spriteHeight) {
		
	}
}
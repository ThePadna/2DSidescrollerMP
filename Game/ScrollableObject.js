class ScrollableObject extends GameObject {

	constructor(y, img, entry) {
		super(y, img);
		this.entry = entry;
		this.collidable = true;
	}

	setCollidable(collidable) {
		this.collidable = collidable;
	}
}
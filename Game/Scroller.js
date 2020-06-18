class Scroller {

	constructor(scrollableObjects) {
		this.scrollableObjects = scrollableObjects;
		this.scrolled = 0;
	}

	scroll(speed, direction) {
		if(direction) this.scrolled += speed;
		else this.scrolled -= speed;
	}

	render(canvas) {
		let ctx = canvas.getContext("2d");
		for(let i = 0; i < this.scrollableObjects.length; i++) {
			let obj = this.scrollableObjects[i];
			if(obj.entry <= this.scrolled)  {
				let pixelsInView = canvas.width - (this.scrolled - obj.entry);
				obj.x = pixelsInView;
				obj.render(pixelsInView, ctx);
			} else obj.x = null;
		}
	}

}
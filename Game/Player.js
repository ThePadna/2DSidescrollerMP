class Player extends GameObject {

	constructor(startX, startY, img, moveSpeed, canvas) {
		super(startY, img);
		this.x = startX;
		this.moveSpeed = moveSpeed;
		this.jumpHeight = 100;
		this.canvas = canvas;
		this.jumping = false;
		this.falling = false;
		this.jumpCounter = 0;
	}

	move(pressedKeys, gameObjects, scroller) {
		if(pressedKeys[65]) {
			this.x -= this.moveSpeed;
			if(this.checkForCollisions(gameObjects)) {
				this.x += this.moveSpeed;
			} else {
				scroller.scroll(this.moveSpeed, false);
			}
		}
		if(pressedKeys[68]) {
			this.x += this.moveSpeed;
			if(this.checkForCollisions(gameObjects)) {
				this.x -= this.moveSpeed;
			} else {
				scroller.scroll(this.moveSpeed, true);
			}
		}

		if(pressedKeys[32] && this.isGrounded(gameObjects)) {
			this.jumping = true;
		}

		if(this.jumping) {
			this.jumpCounter++;
			if(this.jumpCounter > this.jumpHeight) {
				this.jumping = false
				this.jumpCounter = 0;
				return;
			} else {
			this.y -= 5;
			}
		}
		if(!this.isGrounded(gameObjects) && !this.jumping) {
			this.y += 5;
		}
	} 

	isGrounded(gameObjects) {
		if((this.y + this.sprite.height + 1) > this.canvas.height) return true;
		for(let i = 0; i < gameObjects.length; i++) {
			let gameObject = gameObjects[i];
			if(gameObject.x == null || !gameObject.collidable) continue;
			if((this.y + this.sprite.height + 1) >= gameObject.y-5 && this.x >= gameObject.x && this.x <= gameObject.x + gameObject.sprite.width
			 || ((this.y + this.sprite.height + 1) >= gameObject.y-5 && (this.x + this.sprite.width) >= gameObject.x && (this.x + this.sprite.width) <= gameObject.x + gameObject.sprite.width)) {
				return true;
			}
		}
		return false;
	}

	checkForCollisions(gameObjects) {
		for(let i = 0; i < gameObjects.length; i++) {
			if(this.isColliding(gameObjects[i])) return true;
		};
		return false;
	}


	isColliding(gameObject) {
		if(gameObject.x == null || !gameObject.collidable) return false;
		console.log("not null")
		let rightX = this.x + this.sprite.width;
		let bottomY = this.y + this.sprite.height;
		let gRightX = gameObject.x + gameObject.sprite.width;
		let gBottomY = gameObject.y + gameObject.sprite.height;
		return (this.x >= gameObject.x && this.x <= gRightX && this.y >= gameObject.y && this.y <= gBottomY
			|| rightX >= gameObject.x && rightX <= gRightX && this.y >= gameObject.y && this.y <= gBottomY
			|| this.x >= gameObject.x && this.x <= gRightX && bottomY >= gameObject.y && bottomY <= gBottomY
			|| rightX >= gameObject.x && rightX <= gRightX && bottomY >= gameObject.y && bottomY <= gBottomY);                                   
	}
}
function Snake(blockLen, gridWidth, gridHeight) { 
	this.x = gridWidth / 2;
	this.y = gridHeight / 2;

	this.width = blockLen;
	this.height = blockLen;

	this.babies = [[-1, -1], [-1, -1]];

	this.direction = 1;
	
	this.move = function() {
		// babies
		for(let i = 0; i < this.babies.length-1; i++) {
			this.babies[i] = this.babies[i+1];
		}

		this.babies[this.babies.length-1] = [this.x, this.y];

		if(this.direction == 0) { // right
			//head
			this.x++;
			if(this.x == gridWidth) {
				this.x = 0;
			}
		} else if (this.direction == 1) { // up
			this.y--;
			if(this.y < 0) {
				this.y = gridHeight-1;
			}
		} else if (this.direction == 2) { // down
			this.y++;
			if(this.y == gridHeight) {
				this.y = 0;
			}
		} else if (this.direction == 3) { // left
			this.x--;
			if(this.x < 0) {
				this.x = gridWidth - 1;
			}
		}
	}
}
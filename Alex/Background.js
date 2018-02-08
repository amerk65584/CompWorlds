function Background(game, ctx, spritesheet, speed, name) {
    this.speed = speed; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = ctx;
    this.pause = false;
    this.flag = false;
    this.entities_copy = [];
    this.name = name;
	this.draw = function() {
        this.x += this.speed;
         // Scrolling left
		this.ctx.drawImage(spritesheet, -(this.x), this.y);
	
		// Draws image at edge of the first image
		this.ctx.drawImage(spritesheet, -(this.x - this.backgroundWidth), this.y);

		// Reset after image runs off screen
		if (this.x >= this.backgroundWidth)
			this.x = 0;
	};
}

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

Background.prototype.update = function () {
    if (this.game.pause) {
        this.pause = !this.pause;
        this.flag = true;
        this.entities_copy[0] = this.game.entities[0]
    }
     
    if (this.pause && this.flag) {
        for(var i = 1; i < this.game.entities.length; i++) {
            this.entities_copy[i] = this.game.entities[i];
            this.game.entities[i].removeFromWorld = true;
        }
        //console.log(this.game.entities);
        console.log(this.entities_copy);
        //console.log(entities_copy);
        this.flag = false;
    } else if (!this.pause && this.flag) {
        console.log(this.entities_copy);
        for(var i = 1; i < this.entities_copy.length; i++) {
            this.game.entities[i] = this.entities_copy[i];
            this.game.entities[i].removeFromWorld = false;
        }
        console.log(this.game.entities);
        this.flag = false;
    }
};
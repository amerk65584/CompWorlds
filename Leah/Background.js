/*********************
 * Background Object *
 *********************/

function Background(game, ctx, spritesheet, speed, pause, visible) {
    this.speed = speed; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = ctx;
    this.entities_copy = [];
    this.pause = pause;
    this.visible = false;
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
    if (this.visible && this.game.running) {
        if ((this.game.click.x >= 410 && this.game.click.x <= 590) && (this.game.click.y >= 285 && this.game.click.y <= 360)) {
            for(var i = 1; i < this.pause.entities_copy.length; i++) {
                this.game.entities[i] = this.pause.entities_copy[i];
                this.game.entities[i].removeFromWorld = false;
            }
            for (var i = 0; i < this.pause.entities_copy.length; i++) {
                this.pause.entities_copy.pop();
            }
            this.visible = false;
            this.game.click.x = null;
            this.game.click.y = null;
        }
    }
    if ((this.game.click.x >= 430 && this.game.click.x <= 615) && (this.game.click.y >= 260 && this.game.click.y <= 335) && !this.game.running) {
        console.log(this.game.entities);
        this.game.running = true;
        this.game.entities[this.game.entities.length - 1].removeFromWorld = true;
    }
};
/*********************
 * Background Object *
 *********************/

function Background(game, ctx, spritesheet, speed, pause) {
    this.speed = speed; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = ctx;
    this.entities_copy = [];
    this.pause = pause;
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
    if ((this.game.click.x >= 380 && this.game.click.x <= 610) && (this.game.click.y >= 290 && this.game.click.y <= 330)) {
        for(var i = 1; i < this.pause.entities_copy.length; i++) {
            this.game.entities[i] = this.pause.entities_copy[i];
            this.game.entities[i].removeFromWorld = false;
        }
        for (var i = 0; i < this.pause.entities_copy.length; i++) {
            this.pause.entities_copy.pop();
        }
        console.log(this.pause.entities_copy);
        console.log(this.game.entities)
        this.flag = !this.flag;
        this.game.click.x = null;
        this.game.click.y = null;
    }
};
/*********************
 * Background Object *
 *********************/

 var myLobby;
 var myMusic;


function Background(game, ctx, spritesheet, speed, pause, visible) {
    this.speed = speed; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = ctx;
    this.entities_copy = [];
    this.initialGame = [];
    this.pause = pause;
    this.screen = "main";
    var temp;
    myMusic = new Audio("./sounds/gameMusic.wav");
    myLobby = new Audio("./sounds/lobbyMusic1.mp3");
    this.visible = null;
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
     //Pause
    if (this.visible && this.game.running && this.screen === "game") {
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
        //Quit to menu from pause
        if (this.game.click.x >= 395 && this.game.click.y >= 365 && this.game.click.x <= 605 && this.game.click.y <= 450) {
            this.game.click.x = null;
            this.game.click.y = null;
            this.game.reset();
        }
    }
    //Start game
    if ((this.game.click.x >= 430 && this.game.click.x <= 615) && (this.game.click.y >= 260 && this.game.click.y <= 335) && !this.game.running && this.screen === "main") {
        this.game.running = true;
        this.screen = "game";
        this.game.entities[this.game.entities.length - 1].removeFromWorld = true;
        this.game.entities[this.game.entities.length - 2].removeFromWorld = true;
        this.game.entities[this.game.entities.length - 3].removeFromWorld = true;
    }
    //Tutorial
    if (this.game.click.x >= 320 && this.game.click.y >= 350 && this.game.click.x <= 500 && this.game.click.y <= 430 && !this.game.running && this.screen === "main") {
        this.screen = "tut";
        this.game.main = this.game.entities[this.game.entities.length - 1];
        this.game.highscore = this.game.entities[this.game.entities.length - 2];
        this.game.entities[this.game.entities.length - 1].removeFromWorld = true;
        this.game.entities[this.game.entities.length - 2].removeFromWorld = true;
    }
    //Back to Menu from Tutorial
    if (this.game.click.x >= 43 && this.game.click.y >= 555 && this.game.click.x <= 195 && this.game.click.y <= 632 && this.game.main && this.screen === "tut") {
        var main = new Background(this.game, this.ctx, this.game.main.spritesheet, this.game.main.speed, this.game.main.pause, this.game.main.visible);
        var highscore = new Background(this.game, this.ctx, this.game.highscore.spritesheet, this.game.highscore.speed, this.game.highscore.pause, this.game.highscore.visible);
        this.game.addEntity(highscore);
        this.game.addEntity(main);
        this.game.main = null;
        this.game.highscore = null;
        this.screen = "main";
    }
    //HighScore
    if (this.game.click.x >= 550 && this.game.click.y >= 355 && this.game.click.x <= 730 && this.game.click.y <= 430 && !this.game.running && this.screen === "main") {
        this.screen = "high";
        this.game.main = this.game.entities[this.game.entities.length - 1];
        this.game.entities[this.game.entities.length - 1].removeFromWorld = true;
    }
    //Back to Menu from Tutorial
    if (this.game.click.x >= 43 && this.game.click.y >= 555 && this.game.click.x <= 195 && this.game.click.y <= 632 && this.game.main && this.screen === "high") {
        var main = new Background(this.game, this.ctx, this.game.main.spritesheet, this.game.main.speed, this.game.main.pause, this.game.main.visible);
        this.game.addEntity(main);
        this.game.main = null;
        this.screen = "main";
    }
    //Play Again from Death
    if (this.game.click.x >= 107 && this.game.click.y >= 520 && this.game.click.x <= 315 && this.game.click.y <= 610 && this.game.running && this.screen === "dead") {
        this.game.click.x = null;
        this.game.click.y = null;
        this.game.reset();
        this.game.running = true;
        this.screen = "game";
        this.game.entities[this.game.entities.length - 1].removeFromWorld = true;
        this.game.entities[this.game.entities.length - 2].removeFromWorld = true;
        this.game.entities[this.game.entities.length - 3].removeFromWorld = true;
    }
    //Quit to Menu from Death
    if (this.game.click.x >= 725 && this.game.click.y >= 515 && this.game.click.x <= 980 && this.game.click.y <= 605 && this.game.running && this.screen === "dead") {
        this.game.click.x = null;
        this.game.click.y = null;
        this.game.reset();
    }
};
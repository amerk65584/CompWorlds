function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1; // make bunny smaller or bigger
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Wraith(game, sprite) {
    // Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse)
    this.animation = new Animation(sprite, 0, 0, 90, 105, .15, 4, true, true);
    this.ctx = game.ctx;
    //this.animation.scaleBy(-1);
    this.x = 0;
    this.y = 0;
    Entity.call(this, game, 0, 330);
} 

Wraith.prototype = new Entity();
Wraith.prototype.constructor = Wraith;

Wraith.prototype.update = function () {
    Entity.prototype.update.call(this);
}

Wraith.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 2);
    Entity.prototype.draw.call(this);
}

function Mist(game, sprite) {
    this.animation = new Animation(sprite, 0, 105, 104, 105, .15, 6, true, true);
    this.ctx = game.ctx;
    this.x = 0;
    this.y = 0;
    Entity.call(this, game, 0, 330);
}

Mist.prototype = new Entity();
Mist.prototype.constructor = Mist;

Mist.prototype.update = function() {
    Entity.prototype.update.call(this);
}

Mist.prototype.draw = function() {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, 2);
    Entity.prototype.draw.call(this);
}

function Bunny(game, spritesheet) {
    // bunny sprite: height = 57, width = 58, start frame = 16 to 4 more.
    // 474w × 360h of sprite sheet

    // columns = 8, row = 6 
    // frames = 4

    // frameWidth: 474 / 8 = 59.25
    // frameHeight: 360 / 6 = 60

    // startX: 60 * 4 (5th column) = 240
    // startY: 57 * 2 (3rd row) = 114
    // Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.animation = new Animation(spritesheet, 240, 114, 58, 57, 0.15, 4, true, true);
    //this.animation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 0, 0, 206, 110, 0.02, 30, true, true);
    this.jumpAnimation = new Animation(spritesheet, 70, 0, 62, 57, .75, 1, false, true);
    //this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 618, 334, 174, 138, 0.02, 40, false, true);
    this.jumping = false;
    this.pooping = false;
    this.radius = 100;
    this.ground = 475; // changed from 400
    Entity.call(this, game, 200, 475); // changed from 400
}

Bunny.prototype = new Entity();
Bunny.prototype.constructor = Bunny;

Bunny.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.jumping) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
        }
        var jumpDistance = (this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime) * 1.12;
        var totalHeight = 100;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
        //console.log("Y axis" + this.y);
    }
    Entity.prototype.update.call(this);
}

Bunny.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y - 34);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}

function Background0(game, spritesheet) {
    this.speed = 8; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;

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

Background0.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

 Background0.prototype.update = function () {
};

function Background1(game, spritesheet) {
    this.speed = 4; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;

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

Background1.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

 Background1.prototype.update = function () {
};

function Background2(game, spritesheet) {
    this.speed = 2; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;

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

Background2.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

 Background2.prototype.update = function () {
};

function Background3(game, spritesheet) {
    this.speed = 1; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;

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

Background3.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

 Background3.prototype.update = function () {
};

function Background4(game, spritesheet) {
    this.speed = .5; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;

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

Background4.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

 Background4.prototype.update = function () {
};

function Background5(game, spritesheet) {
    this.speed = 0; 
    this.backgroundWidth = 1018;
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;

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

Background5.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

 Background5.prototype.update = function () {
};

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./imgs/Rabbit/Rev_Bunny.png");
ASSET_MANAGER.queueDownload("./imgs/Monster/wraith.png");
ASSET_MANAGER.queueDownload("./imgs/Monster/knight.png");
ASSET_MANAGER.queueDownload("./imgs/Background/tree_layer_0.png");
ASSET_MANAGER.queueDownload("./imgs/Background/tree_layer_1.png");
ASSET_MANAGER.queueDownload("./imgs/Background/tree_layer_2.png");
ASSET_MANAGER.queueDownload("./imgs/Background/tree_layer_3.png");
ASSET_MANAGER.queueDownload("./imgs/Background/tree_layer_4.png");
ASSET_MANAGER.queueDownload("./imgs/Background/tree_layer_5.png");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    var bunny = new Bunny(gameEngine, ASSET_MANAGER.getAsset("./imgs/Rabbit/Rev_Bunny.png"));
    var wraith = new Wraith(gameEngine, ASSET_MANAGER.getAsset("./imgs/Monster/wraith.png"));
    var mist = new Mist(gameEngine, ASSET_MANAGER.getAsset("./imgs/Monster/knight.png"));

    gameEngine.addEntity(new Background5(gameEngine, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_5.png")));
    gameEngine.addEntity(new Background4(gameEngine, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_4.png")));
    gameEngine.addEntity(new Background3(gameEngine, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_3.png")));
    gameEngine.addEntity(new Background2(gameEngine, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_2.png")));
    gameEngine.addEntity(new Background1(gameEngine, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_1.png")));
    gameEngine.addEntity(new Background0(gameEngine, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_0.png")));
    
    
    
    if (getRandomInt(0, 1) === 0) {
        gameEngine.addEntity(wraith);
    } else {
        gameEngine.addEntity(mist);
    }
    gameEngine.addEntity(bunny);
});
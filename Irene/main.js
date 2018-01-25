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
    var scaleBy = scaleBy || 1;
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


function Unicorn(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 0, 0, 206, 110, 0.02, 30, true, true);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/RobotUnicorn.png"), 618, 334, 174, 138, 0.02, 40, false, true);
    this.jumping = false;
    this.radius = 100;
    this.ground = 430; // changed from 400
    Entity.call(this, game, 0, 430); // changed from 400
}

Unicorn.prototype = new Entity();
Unicorn.prototype.constructor = Unicorn;

Unicorn.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.jumping) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
    Entity.prototype.update.call(this);
}

Unicorn.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x + 17, this.y - 34);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
/*****************************************************************************/
function Carrot(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/carrot.png"), 0, 0, 39, 62, 0.15, 5, true, true);
    this.x = 0;
    this.speed = 1;
    Entity.call(this, game, 300, 430); // changed from 400
    // this.draw = function() {
    //     this.x += this.speed;
    //     this.ctx.drawImage(ASSET_MANAGER.getAsset("./crowFly.png"), -(this.x), this.y);
    // }
}

Carrot.prototype = new Entity();
Carrot.prototype.constructor = Carrot;

Carrot.prototype.update = function () {
    if (this.x < -800) this.x = 230;

   Entity.prototype.update.call(this);
}

Carrot.prototype.draw = function (ctx) {
   
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
/*****************************************************************************/
/*****************************************************************************/
function Mushroom(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/mushroom.png"), 0, 0, 33, 33, 0.15, 3, true, true);
    this.x = 0;
    this.speed = 1;
    Entity.call(this, game, 300, 300); // changed from 400
    // this.draw = function() {
    //     this.x += this.speed;
    //     this.ctx.drawImage(ASSET_MANAGER.getAsset("./crowFly.png"), -(this.x), this.y);
    // }
}

Mushroom.prototype = new Entity();
Mushroom.prototype.constructor = Mushroom;

Mushroom.prototype.update = function () {
    if (this.x < -800) this.x = 230;

   Entity.prototype.update.call(this);
}

Mushroom.prototype.draw = function (ctx) {
   
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
/*****************************************************************************/
 function Background(game, spritesheet) {
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

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet, this.x, this.y);
};

 Background.prototype.update = function () {
};


// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/RobotUnicorn.png");
ASSET_MANAGER.queueDownload("./img/carrot.png");
ASSET_MANAGER.queueDownload("./img/mushroom.png");
ASSET_MANAGER.queueDownload("./img/test_tree_layer.jpg");
//AM.queueDownload("./img/background_back.png");
//AM.queueDownload("./img/background_front.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da shield");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();

    var unicorn = new Unicorn(gameEngine);
    var carrot = new Carrot(gameEngine);
    var mushroom = new Mushroom(gameEngine);
 
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, ASSET_MANAGER.getAsset("./img/test_tree_layer.jpg")));
    //gameEngine.addEntity(unicorn);
    gameEngine.addEntity(carrot);
    gameEngine.addEntity(mushroom);
});
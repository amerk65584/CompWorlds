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

/******************
 * Rabbits
 *******************/


// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

//Rabbit
ASSET_MANAGER.queueDownload("./imgs/Rabbit/Rev_Bunny.png");

//Monsters
ASSET_MANAGER.queueDownload("./imgs/Monster/wraith.png");
ASSET_MANAGER.queueDownload("./imgs/Monster/knight.png");

//Enemies
ASSET_MANAGER.queueDownload("./imgs/Enemies/crowFly.png");
ASSET_MANAGER.queueDownload("./imgs/Enemies/stumpy.png");
ASSET_MANAGER.queueDownload("./imgs/Enemies/bearWalk.png");

//Pickups
ASSET_MANAGER.queueDownload("./imgs/Pickups/carrot.png");
ASSET_MANAGER.queueDownload("./imgs/Pickups/mushroom.png");

//Background
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

    //Rabbits
    var bunny = new Bunny(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Rabbit/Rev_Bunny.png"));

    //Monsters
    var wraith = new Monster(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Monster/wraith.png"), 0, 0, 90, 105, .15, 4, true, true, 2);
    var mist = new Monster(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Monster/knight.png"), 0, 105, 104, 105, .15, 6, true, true, 2);

    //Pickups
    var mushroom = new Pickup(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Pickups/mushroom.png"), .5, .5, 33, 33, .15, 2, true, true, 0, 1);
    var carrot = new Pickup(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Pickups/carrot.png"), 0, 0, 39, 62, .15, 5, true, true, 0, 1);

    //Enemies
    var crow = new Enemy(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Enemies/crowFly.png"), 0, 0, 50, 50, .10, 5, true, true, 4, 1.5, "fly");
    var bear = new Enemy(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Enemies/bearWalk.png"), 0, 0, 98, 65, 0.15, 5, true, true, 4, 1.5, "walk");
    var stumpy = new Enemy(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Enemies/stumpy.png"), 0, 60, 74, 60, .17, 4, true, true, 4, 1.5, "walk");

    //Background
    var back1 = new Background(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_5.png"), 0);
    var back2 = new Background(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_4.png"), .5);
    var back3 = new Background(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_3.png"), 1);
    var back4 = new Background(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_2.png"), 2);
    var back5 = new Background(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_1.png"), 4);
    var back6 = new Background(gameEngine, ctx, ASSET_MANAGER.getAsset("./imgs/Background/tree_layer_0.png"), 8);



    gameEngine.addEntity(back1);
    gameEngine.addEntity(back2);
    gameEngine.addEntity(back3);
    gameEngine.addEntity(back4);
    gameEngine.addEntity(back5);
    gameEngine.addEntity(back6);
    
    gameEngine.addEntity(bear);
    gameEngine.addEntity(crow);
    gameEngine.addEntity(stumpy);
    
    gameEngine.addEntity(mushroom);
    gameEngine.addEntity(carrot);

    if (getRandomInt(0, 1) === 0) {
        gameEngine.addEntity(wraith);
    } else {
        gameEngine.addEntity(mist);
    }
    gameEngine.addEntity(bunny);
});
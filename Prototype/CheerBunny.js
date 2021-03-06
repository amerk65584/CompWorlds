/***************
 * Cheer Bunny *
 ***************/

function CheerBunny(game, ctx, spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse, speed, scale, x, y, type) {
    this.game = game;
    this.ctx = ctx;
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.loop = loop;
    this.reverse = reverse;
    this.speed = speed;
    this.scale = scale;
    this.boundingBox = {x: frameWidth, y: frameHeight};
    this.animation = new Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse);
    this.x = x;
    this.y = y;
    this.type = type;
    Entity.call(this, this.game, this.x, this.y); // y == the sprites gound
}

CheerBunny.prototype = new Entity();
CheerBunny.prototype.constructor = CheerBunny;

CheerBunny.prototype.update = function () {
    if (this.game.running) {
        this.x -= this.game.clockTick * this.speed * 200;
        if (this.x < -120) {
            this.x = 1018;
        }
        Entity.prototype.update.call(this);
    }
}

CheerBunny.prototype.draw = function (ctx) {
    if (this.game.running) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        Entity.prototype.draw.call(this);
    }
}
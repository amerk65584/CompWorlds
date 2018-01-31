function Pickup(game, ctx, spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse, speed, scale) {
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
    this.animation = new Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse);
    this.x = 300;
    this.y = 495;
    Entity.call(this, this.game, this.x, this.y); // changed from 400
    // this.draw = function() {
    //     this.x += this.speed;
    //     this.ctx.drawImage(ASSET_MANAGER.getAsset("./crowFly.png"), -(this.x), this.y);
    // }
}

Pickup.prototype = new Entity();
Pickup.prototype.constructor = Pickup;

Pickup.prototype.update = function () {
   Entity.prototype.update.call(this);
}

Pickup.prototype.draw = function (ctx) {
   
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
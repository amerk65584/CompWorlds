/***********
 * Monster *
 ***********/

function Monster(game, ctx, spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse, scale, x, y) {
    
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
    this.scale = scale;
    this.animation = new Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse);
    this.x = x; //10;
    this.y = 550 - frameHeight * scale; //510 - frameHeight;
    Entity.call(this, game, this.x, this.y);
} 

Monster.prototype = new Entity();
Monster.prototype.constructor = Monster;

Monster.prototype.update = function () {
    if (this.game.running) Entity.prototype.update.call(this);
}

Monster.prototype.draw = function() {
    if (this.game.running) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, this.scale);
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.x, this.y,this.frameWidth * 1.50,this.frameHeight * 1.9);
        Entity.prototype.draw.call(this);
    }
}
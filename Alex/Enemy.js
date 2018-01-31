function Enemy(game, ctx, spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse, speed, scale, type) {
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
    this.type = type;
    switch (type) {
        case "walk":
            this.x = 0 - frameWidth;
            this.y = 510 - frameHeight;
            break;
        case "fly":
            this.x = 0 - frameWidth;
            this.y = frameHeight;
            break;
        default:
            this.x = 0;
            this.y = 0;
            break;
    }
    
    this.animation = new Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse);
    Entity.call(this, game, this.x, this.y);
}

Enemy.prototype = new Entity();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    this.x -= this.game.clockTick * this.speed * 100;
    if (this.x < -120) this.x = 1018;
   Entity.prototype.update.call(this);
}

Enemy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y, this.scale);
    Entity.prototype.draw.call(this);
}
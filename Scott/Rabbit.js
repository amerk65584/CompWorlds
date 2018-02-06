/**********
 * Rabbit *
 **********/

function Bunny(game, ctx, spriteSheet) {
    this.game = game;
    this.ctx = ctx;
    this.spriteSheet = spriteSheet;
    this.jumping = false;
    this.pooping = false;
    this.animation = new Animation(spriteSheet, 240, 114, 58, 57, 0.15, 4, true, true);
    this.jumpAnimation = new Animation(spriteSheet, 70, 0, 62, 57, 1, 1, false, true);
    this.x = 200;
    this.ground = 475; // changed from 400
    Entity.call(this, game, 200, 480); // changed from 400
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
        var height = totalHeight*(-6 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
        //console.log("Y axis" + this.y);
    }
    Entity.prototype.update.call(this);
}

Bunny.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y - 40);
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
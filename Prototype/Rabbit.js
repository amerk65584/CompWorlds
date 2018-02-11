/**********
 * Rabbit *
 **********/

function Bunny(game, ctx, spriteSheet) {
    this.game = game;
    this.ctx = ctx;
    this.spriteSheet = spriteSheet;
    this.jumping = false;
    this.pooping = false;
    this.boundingBox = {x: 58, y: 57};
    this.animation = new Animation(spriteSheet, 240, 114, 58, 57, 0.15, 4, true, true);
    this.jumpAnimation = new Animation(spriteSheet, 70, 0, 62, 57, 1, 1, false, true);
    this.x = 200;
    this.ground = 550 - 57; // changed from 400
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
        var jumpDistance = (this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime) * 1.09;
        var totalHeight = 100;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-6 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
        //console.log("Y axis" + this.y);
    }
    //this.collide();
    Entity.prototype.update.call(this);
}

Bunny.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y - 40);
        ctx.strokeRect(this.x, this.y-40,62,57);
        this.boundingBox.y = this.ground - this.height;
    }
    else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        ctx.strokeRect(this.x, this.y,58,57); 
    }
    Entity.prototype.draw.call(this);
}

Bunny.prototype.collide = function() {
    for (var i = 0; i < this.game.entities.length; i++) {
        //var entity = this.get.entities.
    }
}
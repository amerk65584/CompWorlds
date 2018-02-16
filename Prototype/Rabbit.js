/**********
 * Rabbit *
 **********/

function Bunny(game, ctx, spriteSheet, monster) {
    this.monster = monster;
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
    this.boundingBox = new BoundingBox(this.x, this.ground - 57, 58, 57);
    Entity.call(this, game, 200, 480); // changed from 400
}

Bunny.prototype = new Entity();
Bunny.prototype.constructor = Bunny;

Bunny.prototype.update = function () {
    if (this.game.running) {
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
            this.boundingBox = new BoundingBox(this.x, this.y - 43, 58, 57);
            //console.log("Y axis" + this.y);
        } else {
            this.boundingBox = new BoundingBox(this.x, this.y, 58, 57);
        }
        this.collide();
        Entity.prototype.update.call(this);
    }
}

Bunny.prototype.draw = function (ctx) {
    if (this.game.running) {
        if (this.jumping) {
            this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y - 40);
            ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, 58, 57);
        }
        else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, 58, 57);
        }
        Entity.prototype.draw.call(this);
    }
    
}

Bunny.prototype.collide = function() {
    for (var i = 0; i < this.game.entities.length; i++) {
        if (!(this.game.entities[i] instanceof Background) && 
        !(this.game.entities[i] instanceof Pause) &&
        !(this.game.entities[i] instanceof Scoring)) {
            if (this.boundingBox.x < this.game.entities[i].boundingBox.x + this.game.entities[i].boundingBox.width &&
            this.boundingBox.x + this.boundingBox.width > this.game.entities[i].boundingBox.x &&
            this.boundingBox.y < this.game.entities[i].boundingBox.y + this.game.entities[i].boundingBox.height &&
            this.boundingBox.height + this.boundingBox.y > this.game.entities[i].boundingBox.y) {
                console.log("hit!");
                if (this.game.entities[i] instanceof Pickup) {
                    this.game.entities[i].x = i * 200;
                    this.game.entities[i].boundingBox = new BoundingBox(this.game.entities[i].x, this.game.entities[i].y, 
                        this.game.entities[i].width, this.game.entities[i].height);
                    /****************************
                     * Code for pickups here!
                     ****************************/
                    if (this.game.entities[i].type === "mush") {
                        this.monster.move();
                    } else if (this.game.entities[i].type === "car") {
                        this.monster.retreat();  
                    }
                } else if (this.game.entities[i] instanceof Enemy) {
                    this.game.entities[i].x = i * 200;
                    this.game.entities[i].boundingBox = new BoundingBox(this.game.entities[i].x, this.game.entities[i].y, 
                        this.game.entities[i].width, this.game.entities[i].height);
                    this.monster.move();
                } else if (this.game.entities[i] instanceof Platform) {
                    this.game.entities[i].x = i * 200;
                    this.game.entities[i].boundingBox = new BoundingBox(this.game.entities[i].x, this.game.entities[i].y, 
                        this.game.entities[i].width, this.game.entities[i].height);
                } else if (this.game.entities[i] instanceof Monster) {
                    this.game.reset();
                    initialize(this.game, this.ctx);    
                } else {
                    continue;
                }
            }
        } 
    }
}
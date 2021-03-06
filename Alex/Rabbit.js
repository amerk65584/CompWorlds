/**********
 * Rabbit *
 **********/

function Bunny(game, ctx, spriteSheet, monster) {
    this.monster = monster;
    this.game = game;
    this.ctx = ctx;
    this.spriteSheet = spriteSheet;
    this.jumping = false;
    this.falling = false;
    this.pooping = false;
    this.boundingBox = {x: 58, y: 57};
    this.animation = new Animation(spriteSheet, 240, 114, 58, 57, 0.15, 4, true, true);
    this.jumpAnimation = new Animation(spriteSheet, 70, 0, 62, 57, 1, 1, false, true);
    this.x = 200;
    this.ground = 550 - 57; // changed from 400
    this.lastBottom = null;
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
            this.lastBottom = this.boundingBox.bottom;
            this.y = this.ground - height;
            this.boundingBox = new BoundingBox(this.x, this.y - 43, 58, 57);
            //console.log("Y axis" + this.y);
        } 
        if (this.falling) {
            this.lastBottom = this.boundingBox.bottom;
            //this.y += this.game.clockTick / this.jumpAnimation.totalTime * 4 * this.totalHeight;
            this.ground = 550 - 57;
            this.y = this.ground;
            this.boundingBox = new BoundingBox(this.x, this.y, this.jumpAnimation.frameWidth, this.jumpAnimation.frameHeight);
            this.falling = false;
        } 
        this.collide();
        Entity.prototype.update.call(this);
    }
}

Bunny.prototype.draw = function (ctx) {
    if (this.game.running) {
        if (this.jumping) {
            this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y - 40);
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
        Entity.prototype.draw.call(this);
    }
    
}

Bunny.prototype.collide = function() {
    for (var i = 9; i < this.game.entities.length; i++) {
        if (!(this.game.entities[i] instanceof Background) && 
        !(this.game.entities[i] instanceof Pause) &&
        !(this.game.entities[i] instanceof Scoring)) {
            if (this.boundingBox.x < this.game.entities[i].boundingBox.x + this.game.entities[i].boundingBox.width &&
            this.boundingBox.x + this.boundingBox.width > this.game.entities[i].boundingBox.x &&
            this.boundingBox.y < this.game.entities[i].boundingBox.y + this.game.entities[i].boundingBox.height &&
            this.boundingBox.height + this.boundingBox.y > this.game.entities[i].boundingBox.y) {
                /*********************
                 * Pickup interaction
                 ********************/
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
                /*********************
                 * enemy interaction
                 ********************/
                } else if (this.game.entities[i] instanceof Enemy) {
                    this.game.entities[i].x = i * 200;
                    this.game.entities[i].boundingBox = new BoundingBox(this.game.entities[i].x, this.game.entities[i].y, 
                        this.game.entities[i].width, this.game.entities[i].height);
                    this.monster.move();
                /*********************
                 * Platform interaction
                 ********************/
                } else if (this.game.entities[i] instanceof Platform) {
                    if (this.lastBottom < this.game.entities[i].boundingBox.top) {
                        this.jumping = false;
                        this.falling = false;
                        this.ground = this.game.entities[i].boundingBox.top - this.animation.frameHeight + 10;
                        this.y = this.game.entities[i].boundingBox.top - this.animation.frameHeight + 10;
                        this.jumpAnimation.elapsedTime = 0;
                        if (!this.jumping && !this.falling) {
                            if (this.boundingBox.left - this.game.entities[i].boundingBox.right > -5) {
                                this.falling = true;
                            }
                        }
                    }
                    
                /*********************
                 * Monster interaction
                 ********************/
                } else if (this.game.entities[i] instanceof Monster) {
                    this.game.entities[0].removeFromWorld = true;
                    this.game.entities[1].screen = "dead";
                    this.game.entities[2].dead = true;
                    for (var i = 3; i < this.game.entities.length; i++) {
                        this.game.entities[i].removeFromWorld = true;
                    }
                    console.log(this.game.entities);
                } else {
                    continue;
                }
            }
        } 
    }
}
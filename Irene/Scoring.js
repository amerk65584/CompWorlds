/*********************
* Scoring Object *
*********************/
window.localStorage;
function Scoring(game, ctx) {
    this.x = 0;
    this.y = 0;
    this.score = 0;
    this.fps = 60;
    this.game = game;
    this.ctx = ctx;
}
function saveScore(score){
    //console.log(score + " " + Number(localStorage.highscore));
    if(typeof(Storage) != '"undefined'){
       if(localStorage.highscore && (score > Number(localStorage.highscore))){
           localStorage.highscore = score;
           //localStorage.highscore = 0; //to reset the highscore
           console.log("HIGHSCORE: " + localStorage.highscore);
       } else if (localStorage.highscore && (score < Number(localStorage.highscore))){
            console.log("Not highscore yet");
            //localStorage.highscore = 0; //to rest the highscore
       }
    } else {
        console.log("Local browser does not support web storage");
    }
}
Scoring.prototype.draw = function(){
    if (this.game.running) {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Comic Sans MS';
        this.ctx.fillText("Score " + Math.floor(this.score), 10, 30);
        // console.log(this.score);
    }
};
Scoring.prototype.update = function(){
    if (this.game.running){
        this.score += (1/this.fps);
        saveScore(Math.floor(this.score));
    }
};
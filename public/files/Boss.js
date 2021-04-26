/**
 * Monstruo al que tenemos que destruir
 */
class Boss extends Character {
    /**
     * @param game {Game} La instancia del juego al que pertenece el oponente
     */
    constructor (game) {
        const height = OPPONENT_HEIGHT * game.width / 100,
            width = OPPONENT_WIDTH * game.width / 100,
            x = getRandomNumber(game.width - width / 2),
            y=0,
            speed = OPPONENT_SPEED*2,
            myImage = BOSS_PICTURE,
            myImageDead = BOSS_PICTURE_DEAD;
            let direction="R";

            super(game, width, height, x, y, speed, myImage, myImageDead);
       
        setTimeout(() => this.shoot(), 1000 + getRandomNumber(2500));
    }

    /**
     * Crea un nuevo disparo
     */
    shoot () {
        super.shoot();
    }

    /**
     * Actualiza los atributos de posición del oponente
     */
    update () {
        if (!this.dead && !this.game.ended) {
            this.y += this.speed;
            if (this.y > this.game.height) {
                this.y = 0;
            }
            if (this.direction === "R") { // Hacia la derecha
                if (this.x < this.game.width - this.width - this.speed) {
                    this.x += this.speed;
                } else {
                    this.horizontalMov = 0;
                }
            } else if (this.x > this.speed) {
                this.x -= this.speed;
            } else {
                this.horizontalMov = 0;
            }
            this.horizontalMov -= this.speed;
            if (this.horizontalMov < this.speed) {
                this.horizontalMov = getRandomNumber(this.game.width / 2);
                this.direction = this.direction === "R" ? "L" : "R"; // Cambia de sentido
            }
        }
    }

    /**
     * Mata al oponente
     */
     collide() {
        if (!this.dead) {            
            if((this.game.score)<6){ 
                super.collide();
                setTimeout(()=>{super.nocollide();},2000); 
                this.game.score++;                                    
            }   
            else if((this.game.score)===6){
                this.game.score++; 
                setTimeout(() => {
                    this.game.endGamew();
                }, 2000);
            super.collide();
               }
              
        }
        
    }
    collide2() {
        
        if (!this.dead) {
            setTimeout(() => {
                this.game.removeOpponent();
            }, 2000);  
           if(super.collide()){
            this.game.score+=this.game.score;
           }
            
        }

    }
}
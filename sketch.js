let soldier, soldieranimation, enemies, bullets, bullet2, bullet3, bullet , mines, explotion, powerUp, auxpowerUp, x, y;
let bg, bg2;
let botiquines, vacunas, curitas;
let y1 = 0;
let y2;
let scrollSpeed = 1;
let score = 0;

function preload(){
    bg = loadImage("./assets/fondo1.png");
    bg2 = loadImage("./assets/fondo2.png");
    bg3 = loadImage("./assets/gameover.png");

    /*soldier = new Sprite(400, 770, 30, 30, "dynamic");
    soldier.addAnimation("./assets/soldierr.png", 5);*/

    enemies = new Group();

    bullets = new Group();
    bullets.addImg("./assets/bullet.png");

    powerUps = new Group();
    powerUps.addImg("./assets/powerupimg.png");

    mines = new Group();
    mines.addImg("./assets/mine.png");

    explotion = loadImage("./assets/explotion.gif");

    botiquines = new Group();
    botiquines.addImg("./assets/botiquin.png");

    curitas = new Group();
    curitas.addImg("./assets/curita.png");

    vacunas = new Group();
    //vacunas = loadImage("./assets/vacuna.png");
}

function setup() {
    createCanvas(800, 800);
    setInterval(Bullets, 1000);
    soldierMoves();
    Enemies();
    EnemiesMoves();
    Mines();
    botiquinesGenerate();
    curitasGenerate();
    setInterval(powerUpGenerate, 20000);
    /*soldier.overlap(enemies, (soldier, enemy) => {
        soldier.remove();
        // FAILED MISSION
    });*/
    soldier.overlap(mines, (soldier, mine) => {
        //image(explotion, soldier.x, soldier.y);
        console.log("BOOM");
        mine.remove();
        soldier.remove();
        image(bg3, 0, 0, 800, 800);
    });
    bullets.overlap(enemies, (bullet, enemy) => {
        enemy.remove();
        bullet.remove();
        score += 1;
    });
    soldier.overlap(powerUps, (soldier, powerUp)=>{
        powerUp.remove();
        threeShots();
    });
    y2 = width;
}

function draw(){
    image(bg, 0, -y1, 800, 800);
	image(bg2, 0, -y2, 800, 800);

	y1 -= scrollSpeed;
	y2 -= scrollSpeed;

	if (y1 < -width) {
		y1 = width;
	}
	if (y2 < -width) {
		y2 = width;
	}
    
    textSize(30);
    fill(255);
    textFont('Courier');
    if (enemies.length > 0) {
        text("kills: " + score, 600, 30);
    }
    
    Limits();
    //enemies.vel.x = x;
}

function soldierMoves(){
    soldier = new Sprite(400, 770, 30, 30, "dynamic");
    soldier.shapeColor = "green";
    //soldier.vel.x = x * -1;
}

window.addEventListener("devicemotion", function(e){
    x = parseInt(e.accelerationIncludingGravity.x);
    //y = parseInt(e.accelerationIncludingGravity.y);
})

//función pa que si pasa de la izq de vaya pa la derecha el soldado.
function Limits(){
    if(soldier.x >= 800){
        soldier.x = 30;
    }
    if(soldier.x <= 30){
        soldier.x = 770;
    }

    //para que las minas vuelvan a reaparecer más arriba en el canvas
    for(let j= 0; j < mines.length; j++){
        if(mines[j].y >= 800){
            mines[j].y = -10;
            mines[j].x = random(width);
        }
    }

    //para que vuelvan a aparecer los enemigos cuando se salgan del canvas
    for(let j= 0; j < enemies.length; j++){
        if(enemies[j].y >= 800){
            enemies[j].y = -10;
            enemies[j].x = random(width);
        }
    }
}

//generación de enemigos
function Enemies(){
    enemies.diameter = 30;
    enemies.x = () => random(0, width);
	enemies.y = () => random(0, 500);
	enemies.amount = 7;
}

//generación de minas
function Mines(){
    mines.diameter = 30;
    mines.x = () => random(0, width);
	mines.y = () => random(0, height-100);
	mines.amount = 10;
    mines.vel.y = 1;
    for(let i = 0; i < mines.length; i++){
        mines[i].removeColliders();
    }
}

function EnemiesMoves(){
    enemies.vel.y = 3;
}

function botiquinesGenerate(){
    botiquines.x = () => random(0,width);
    botiquines.y = () => random(0,height-100);
    botiquines.amount = 1;
    botiquines.vel.y = 1;
    for(let i = 0; i < botiquines.length; i++){
        botiquines[i].removeColliders();
    }
}

function curitasGenerate(){
    curitas.x = () => random(0,width);
    curitas.y = () => random(0,height-100);
    curitas.amount = 1;
    curitas.vel.y = 1;
    for(let i = 0; i < curitas.length; i++){
        curitas[i].removeColliders();
    }
}

//funcion que genera las balas del soldado principal
function Bullets(){
    bullet = new bullets.Sprite(soldier.x, soldier.y-50);
    bullet.vel.y = -10;
    bullet.life = 75;
    bullets.removeColliders();
}

//cuando agarra el powerup, dispara 3 balas
function threeShots() {
    bullet2 = new bullets.Sprite(soldier.x, soldier.y-100);
    bullet3 = new bullets.Sprite(soldier.x, soldier.y-150);
    bullet2.vel.y = -10;
    bullet3.vel.y = -10;
    bullet2.life = 75;
    bullet3.life = 75;
}

//genera el powerup
function powerUpGenerate(){
    powerUp = new powerUps.Sprite(random(width), random(height-100));
    powerUp.removeColliders();
    powerUp.vel.y = 1;

}

function powerUpRemove(){
    powerUp.overlap(soldier, () => {
        powerUp.remove();
        console.log(siisis);
    });
}
let soldier, soldieranimation, enemies, bullets, bullet2, bullet3, bullet , mines, explotion, powerUp, auxpowerUp, x, y;
let soldier1, soldier2, soldier3, soldier4, soldier5;
let enemy1, enemy2, enemy3, enemy4, enemy5;
let bg, bg2;
let botiquines, vacunas, curitas;
let y1 = 0;
let y2;
let scrollSpeed = 1;
let score = 0;
let timer = 60;
let curations = 0;

function preload(){
    bg = loadImage("./assets/fondo1.png");
    bg2 = loadImage("./assets/fondo2.png");
    bg3 = loadImage("./assets/gameover.png");

    //soldier = new Sprite(400, 730, 30, 30, "dynamic");

    soldier1 = loadImage("./assets/soldier1.png");
    soldier2 = loadImage("./assets/soldier2.png");
    soldier4 = loadImage("./assets/soldier4.png");

    enemy1 = loadImage("./assets/enemy1.png");
    enemy2 = loadImage("./assets/enemy2.png");
    enemy3 = loadImage("./assets/enemy3.png");
    enemy4 = loadImage("./assets/enemy4.png");
    enemy5 = loadImage("./assets/enemy5.png");

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

    soldier = new Sprite(400, 730, 30, 30, "dynamic");
}

function setup() {
    createCanvas(800, 800);
    soldier.addAni("soldier", soldier1, soldier2, soldier4);
    enemies.addAni("enemies", enemy1, enemy2, enemy3, enemy4, enemy5);
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
    soldier.overlap(curitas, (soldier, curita)=>{
        console.log("curita agarrada");
        curita.remove();
        curations++;
    })
    soldier.overlap(botiquines, (soldier, botiquin)=>{
        console.log("botiquin agarrado");
        botiquin.remove();
        curations++;
    })
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
    
    //contador de kills
    textSize(30);
    fill(255);
    textFont('Courier');
    if (enemies.length > 0) {
        text("kills: " + score, 600, 95);
    }

    //curaciones recogidas
    textSize(20);
    text("Curaciones recogidas: " + curations, 520, 60)
    //tiempo restante
    textSize(20);
    text("Tiempo restante: " + timer, 550, 30);

    if (frameCount % 60 == 0 && timer > 0) { 
        timer--;
    }

    if(timer === 0 && curations < 10){
        image(bg3, 0, 0, 800, 800);
        soldier.remove();
        mines.remove();
        enemies.remove();
        botiquines.remove();
        curitas.remove();
        bullets.remove();
    }

    Limits();
}

window.addEventListener("devicemotion", function(e){
    x = parseInt(e.accelerationIncludingGravity.x);
    //y = parseInt(e.accelerationIncludingGravity.y);
})

function soldierMoves(){
    soldier.shapeColor = "green";
    //soldier.vel.x = x * -1;
}

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

    for(let j= 0; j < botiquines.length; j++){
        if(botiquines[j].y >= 800){
            botiquines[j].y = -10;
            botiquines[j].x = random(width);
        }
    }

    for(let j= 0; j < curitas.length; j++){
        if(curitas[j].y >= 800){
            curitas[j].y = -10;
            curitas[j].x = random(width);
        }
    }


}

//generación de enemigos
function Enemies(){
    enemies.diameter = 30;
    enemies.x = () => random(0, width);
	enemies.y = () => random(-500, 0);
	enemies.amount = 7;
}

//generación de minas
function Mines(){
    mines.diameter = 30;
    mines.x = () => random(0, width);
	mines.y = () => random(0, height-100);
	mines.amount = 8;
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
    botiquines.amount = 2;
    botiquines.vel.y = 1;
    for(let i = 0; i < botiquines.length; i++){
        botiquines[i].removeColliders();
    }
}

function curitasGenerate(){
    curitas.x = () => random(0,width);
    curitas.y = () => random(0,height-100);
    curitas.amount = 4;
    curitas.vel.y = 1;
    for(let i = 0; i < curitas.length; i++){
        curitas[i].removeColliders();
    }
}

//funcion que genera las balas del soldado principal
function Bullets(){
    bullet = new bullets.Sprite(soldier.x+18, soldier.y-50);
    bullet.vel.y = -10;
    bullet.life = 75;
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
    });
}
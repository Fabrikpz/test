let soldier, enemies, bullets, bullet , mines, x, y;
let bg;
let y1 = 0;
let y2;
let scrollSpeed = 4;

function preload(){
    bg = loadImage("./assets/fondo.png");

    bullets = new Group();
    bullets.addImg("./assets/bullet.png");
}

function setup() {
    createCanvas(800, 800);

    setInterval(Bullets, 1000);
    soldierMoves();
    Enemies();
    EnemiesMoves();

    y2 = width;
}

function draw(){
    image(bg, 0, y1, 800, 800);
	image(bg, 0, y2, 800, 800);

	y1 -= scrollSpeed;
	y2 -= scrollSpeed;

	if (y1 < -width) {
		y1 = width;
	}
	if (y2 < -width) {
		y2 = width;
	}

    Limits();
    Mines();
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

//función pa que si pasa de la izq 
function Limits(){
    if(soldier.x >= 800){
        soldier.x = 30;
    }
    if(soldier.x <= 30){
        soldier.x = 770;
    }
}

function Enemies(){
    enemies = new Group();
    enemies.diameter = 30;
    enemies.x = () => random(0, width);
	enemies.y = () => random(0, 500);
	enemies.amount = 7;
}

function Mines(){
    mines = new Group();
    mines.diameter = 30;
    mines.x = () => random(0, width);
	mines.y = () => random(0, height);
	mines.amount = 15;
}

function EnemiesMoves(){
    enemies.vel.y = 3;
}

function Bullets(){
    bullet = new bullets.Sprite(soldier.x, soldier.y+50);
    bullet.vel.y = 15;
    bullet.life = 50; 
}
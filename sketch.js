const World = Matter.World;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;

var player;
var shoot, shootGroup;
var buttonPressed = "space";
var timer = 0;
var timer2 = 0;
var score = 0;
var life = 2;

var enemieGroup;
var world,engine;
var gameState = "play";


function preload(){

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  player = createSprite(200,200,50,50);
  player.shapeColor = "red";

  enemieGroup = new Group();
  shootGroup = new Group();

  
  

}

function draw() {
  background(0); 
  Engine.update(engine);
if(gameState == "play"){
  timer += 1;
  timer2 += 1;
  //camera.position.y = player.y;
  if(keyDown("a")){
    player.x -= 5;
    buttonPressed = "a";
  }
  if(keyDown("s")){
    player.y += 5;
    buttonPressed = "s";
  }
  if(keyDown("d")){
    player.x += 5;
    buttonPressed = "d";
  }
  if(keyDown("w")){
    player.y -= 5;
    buttonPressed = "w";
  }
  
  if(keyDown("k") && timer > 50){
    CreateShoot();
    timer = 0;
  }
  if(timer2 > 100){
    for(var a=0; a<4; a++){
      var r = Math.round(random(1,4));
      if(r == 1){
        CreateEnemieD();
      }
      if(r == 2){
        CreateEnemieL();
      }
      if(r == 3){
        CreateEnemieR();
      }
      if(r == 4){
        CreateEnemieT();
      }
    }
    console.log("a");
    timer2 = 0;
  }

  shootGroup.overlap(enemieGroup, function(shoot, enemie){
    shoot.destroy(); 
    enemie.destroy();
    score += 1;
  }
  );
  enemieGroup.overlap(player, function(enemie, player){
    enemie.destroy();
    life -= 1;
  }
  );
}
  fill("white");
  textSize(50);
  if(life == 0){
    gameState = "end";
    text("FIM DE JOGO", windowWidth/2 - 150, windowHeight/2) 
    player.destroy();
  }
  textSize(20);
  text("score: " + score, 100,100);
  text("lifes: " + life, 100,120);
  drawSprites();

}
function CreateShoot(){
  shoot = createSprite(player.x, player.y, 50, 20);
  if(buttonPressed == "a"){
    shoot.velocityX = -20;
  }
  if(buttonPressed == "s"){
    shoot.width = 20;
    shoot.height = 50;
    shoot.velocityY = 20;
  }
  if(buttonPressed == "d"){
    shoot.velocityX = 20;
  }
  if(buttonPressed == "w"){
    shoot.width = 20;
    shoot.height = 50;
    shoot.velocityY = -20;
  }
  shoot.lifetime = 200;
  shootGroup.add(shoot);

  
}
function CreateEnemieR(){
 var enemie = createSprite(windowWidth + 100, random(windowHeight - 100, 100), )
 enemie.velocityX = -10;
 enemie.lifetime = 150;
 enemieGroup.add(enemie);
}
function CreateEnemieL(){
  var enemie = createSprite(-100, random(100, windowHeight -100), )
  enemie.velocityX = 10;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
function CreateEnemieD(){
  var enemie = createSprite(random(windowWidth - 100, 100), windowHeight + 100)
  enemie.velocityY = -10;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
function CreateEnemieT(){
  var enemie = createSprite(random(100, windowWidth -100), -100)
  enemie.velocityY = 10;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var player1, player2, virus, virusImg, playerImgscared, playerImgconfident, ground, groundImg, virusGroup;
var playerEnd, gameOver, gameOverImg;
var gameState = 1;


function preload(){
  playerImgscared = loadAnimation("Images/Runner-1.png","Images/Runner-2.png");
  groundImg = loadImage("Images/realBg.png");
  virusImg = loadImage("Images/1stvirus.png")
  playerEnd = loadAnimation("Images/Runner-1.png","Images/Runner-1.png");
  gameOver = loadAnimation("Images/gameOver.png")
}
function setup(){
  background("green");
  createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
  world = engine.world;

  ground = createSprite(windowWidth/2,windowHeight/2,2000, windowHeight);
  ground.addImage(groundImg)
  ground.scale = 5
ground.velocityY = 5

player1 = createSprite(windowWidth/2,windowHeight-100,50,50);
player1.addAnimation("boy",playerImgscared);
player1.scale = 0.09

virusGroup = new Group()

}
function draw(){
    Engine.update(engine);
    if(gameState===1){
    if(ground.y>windowHeight+100){
      ground.y = windowHeight/2;
    }
    if(keyDown(LEFT_ARROW)){
      player1.x =player1.x - 5
    }
    
    if(keyDown(RIGHT_ARROW)){
      player1.x =player1.x + 5
    }

    if(gameState===1&&virusGroup.isTouching(player1)){
  gameState = 2;
  
    }
    rectMode(CENTER);
    spawnVirus();
   
  }
  else if(gameState===2){
    player1.velocityY=0
    ground.velocityY=0
    console.log("2")
   virusGroup.setVelocityYEach(0);
   virusGroup.setVelocityXEach(0);
   player1.addAnimation("end",playerEnd)
   

  }
  drawSprites();
}
function spawnVirus(){
  if(frameCount%60===0){
    virus = createSprite(windowWidth/2,windowHeight/2,5,5);
    virus.addImage(virusImg);
    virus.velocityY = 7
    virus.scale=0.2;
    virusGroup.add(virus);
     virus.y = Math.round(random(60,100));
     virus.x = Math.round(random(300,1000));
  }
}
function reset(){

}
var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var iblock, iblockGroup;
var gameState = "play";

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  doorGroup = new Group();
  climberImage = loadImage("climber.png");
  climberGroup = new Group();
  ghostImage = loadImage("ghost-standing.png");
  iblockGroup = new Group();
}

function setup(){
  createCanvas (600,600);
  tower = createSprite (300,300);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  ghost = createSprite (200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
}

function draw(){
  background (0);
  if(gameState==="play"){
 if(tower.y>400){
   tower.y=300;
 }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY+0.3;
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(iblockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "end"
  }
  
  spawnDoors();
drawSprites();
}
  if(gameState==="end"){
    fill("yellow")
    textSize(30);
    text("GAMEOVER", 220, 290);
  }
}
 
function spawnDoors(){
  if(frameCount%240===0){
    door = createSprite(200, -50);
    door.addImage(doorImage);
    climber = createSprite(200, 10);
    climber.addImage(climberImage);
    iblock = createSprite(200,15);
    iblock.width = climber.width;
    iblock.height=2;
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    climber.velocityY = 1;
    climber.x=door.x
    
    iblock.x = door.x
    iblock.velocityY = 1;
    ghost.depth = door.depth;
    ghost.depth+=1
    
    door.lifetime = 800;
    doorGroup.add(door);
    climber.lifetime = 800;
    climberGroup.add(climber);
    iblockGroup.add(iblock);
    iblock.lifetime = 800;
  }
}
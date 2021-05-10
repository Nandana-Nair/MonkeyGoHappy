
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var backgroundImage,background0
var monkeyIdle;

function preload(){
  
  backgroundImage=loadImage("jungle.jpg")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkeyIdle= loadAnimation("sprite_0.png");
  
 
}





function setup() {
  var survivalTime=0;
  
  
   monkey=createSprite(80,315,20,20);  
   monkey.scale=0.15;
   monkey.addAnimation("moving",monkey_running);
   monkey.addAnimation("idle",monkeyIdle)
  
  ground = createSprite(400,350,900,10);
  ground.x=ground.width/2;
  ground.velocityX=-4;
  ground.invisible=false;`  `
  console.log(ground.x)
  
  background0=createSprite(0,0,0,0);
  background0.x=background0.width/2;
  background0.addImage(backgroundImage);
  background0.velocityX=-5;
  background0.x=background0.width/2;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  Score = 0;
}
function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("brown");
  textSize(20);
  fill("brown");
  text("score: "+ Score, 500,50);        
  if(obstaclesGroup.isTouching(monkey)){
        monkey.changeAnimation("idle",monkeyIdle);
        background0.velocityX=0;
        ground.velocityX = 0;
    monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
      FoodGroup.setLifetimeEach(-1);
        obstaclesGroup.setLifetimeEach(-1);
        
 }
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  

if (frameCount % 60 === 0){
  background0.x=background0.width/2;
}

if(FoodGroup.isTouching(monkey)){
  Score=Score+2
  
}
  
  switch(Score){
    case 10:monkey.scale=0.12
      break;
      
      case 20:monkey.scale=0.14
      break;
      
      case 30:monkey.scale=0.16
      break;
      
      case 40:monkey.scale=0.18
      break;
      default:break;
      
      
      
  }
 

   stroke("brown");
  textSize(20);
  fill("brown");
  text("Score: "+ Score, 500,50);  


function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.lifetime = 300;
    monkey.depth = banana.depth +  1;   
     banana.addImage(bananaImage);
     banana.scale=0.05;
     banana.velocityX = -5;  
  
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6; 
    obstacle.addImage(obstaceImage);
    obstaclesGroup.add(obstacle);
     obstacle.scale=0.15;    
    obstacle.lifetime = 300;
  }
}



}



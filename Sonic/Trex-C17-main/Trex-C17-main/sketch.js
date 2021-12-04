var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sonic, sonic_running, sonic_collided;
var ground, invisibleGround, groundImage;
var backgroundGame, backgroundImg;

var ringsGroup, ringsImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  sonic_running =   loadAnimation("giphy.png","sonic bueno.png");
  sonic_collided = loadAnimation("collided.png", "OIP (2).jfif");
  
  groundImage = loadImage("Floor.png");
  
  ringImage = loadImage("ring.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  backgroundImg = loadImage("fondo.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  sonic = createSprite(50,180,20,50);
  
  sonic.addAnimation("running", sonic_running);
  sonic.addAnimation("collided", sonic_collided);
  sonic.scale = 0.09;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,180,400,10);
  invisibleGround.visible = false;
  
  ringsGroup = new Group();
  obstaclesGroup = new Group();

  backgroundGame = createSprite(300, 70, 600, 200);
  backgroundGame.addImage(backgroundImg);
  backgroundGame.scale = 0.315
  
  floor.depth = backgroundGame.depth;
  sonic.depth = backgroundGame.depth;
  
  backgroundGame.depth = backgroundGame.depth -100;
  

  score = 0;
}

function draw() {
  //sonic.debug = true;
  background(255);
  text("Puntuación: "+ score, 500,50);
  
  if (gameState===PLAY){
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && sonic.y >= 140) {
      sonic.velocityY = -12;
    }
  
    sonic.velocityY = sonic.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    sonic.collide(invisibleGround);
    spawnrings();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(sonic)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //establece velocidad de cada objeto del juego en 0
    ground.velocityX = 0;
    sonic.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    ringsGroup.setVelocityXEach(0);
    
    //cambia la animación de sonic
    sonic.changeAnimation("collided",sonic_collided);
    
    //establece ciclo de vida a los objetos del juego para que nunca puedan ser destruidos
    obstaclesGroup.setLifetimeEach(-1);
    ringsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnrings() {
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 60 === 0) {
    var ring = createSprite(600,140,40,10);
    ring.y = Math.round(random(80,120));
    ring.addImage(ringImage);
    ring.scale = 0.05;
    ring.velocityX = -(6 + 3*score/100);

  if(sonic.isTouching(ringsGroup)){
    score = score + 10;
  }
    
     //asigna ciclo de vida a la variable
    ring.lifetime = 200;
    
    //ajusta la profundiad
    ring.depth = sonic.depth;
    sonic.depth = sonic.depth + 1;
   
    
    //agrega cada nube al grupo
    ringsGroup.add(ring);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //genera obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //asigna escala y ciclo de vida al obstáculo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //agrega cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  ringsGroup.destroyEach();
  
  sonic.changeAnimation("running",sonic_running);
  
 
  
  score = 0;
  
}
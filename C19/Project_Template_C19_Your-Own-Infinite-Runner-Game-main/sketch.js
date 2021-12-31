var bird, birdImg;
var bird2, bird2Img;
var bird3, bird3Img;
var PLAY = 1;
var END = 0;
var pillar1, pillar1Img
var pillarGroup, pillar2
var sky, skyImg
var invisibleGround1, invisibleGround2
var  restartImg
var gameState = PLAY
var score

function preload(){
    pillar1= loadImage("pilar1.jpg")
    pillar2= loadImage("pilar2.png")

    birdImg= loadImage("bird.jpg");
    bird2Img= loadImage("bird.jpg");
    bird3Img= loadImage("bird.jpg");

    skyImg= loadImage("sky image.jpg");

    restartImg= loadImage("Restart button.png")

}

function setup() {
 createCanvas(windowWidth,windowHeight);
 sky = createSprite(windowWidth,windowHeight);
 sky.addImage("sky", skyImg);


 bird=createSprite(200,Math.round(random(150,300)),50,50)
 bird.addImage("bird", birdImg)
 bird.scale=0.4

 invisibleGround1=createSprite(650,0,5000,25)
 invisibleGround2=createSprite(650,700,5000,25)
 invisibleGround1.visible = false;
 invisibleGround2.visible = false;
 pillarGroup=createGroup();

 restart= createSprite(300,300,60,60)
 restart.addImage(restartImg)
 restart.scale=0.2

}

function draw() {


if (gameState === PLAY) {
    restart.visible=false
    sky.velocityX=-5
    spawnPillar()

    bird.setCollider("circle",0,0,80);
    bird.debug = true

    console.log("I am the play state")
    if(keyDown("space")){
        bird.velocityY = -9;
    }
    bird.velocityY = bird.velocityY + 0.8
    
    if (sky.x<0){
        sky.x = sky.width/2.1;
      }
    
    if(pillarGroup.isTouching(bird)){
      gameState = END;
      bird.destroy()
  }
  }

drawSprites()
if(bird.collide(invisibleGround1)||bird.collide(invisibleGround2)){
    bird.destroy();
    gameState = END
}
if (gameState === END){
    stroke("yellow");
    fill("red");
    textSize(30);
    text("You died", 230,250)
    sky.velocityX=0
    restart.visible=true
    pillarGroup.setLifetimeEach(-1)
    pillarGroup.setVelocityXEach(0)
    if(mousePressedOver(restart)) {
        reset();
      }
    
  }
}

function spawnPillar(){

    if (frameCount % 60 === 0){
      var pillar = createSprite(Math.round(random(400,800)),Math.round(random(100,700)),10,40);
      pillar.velocityX=-5
       //generate random obstacles
       var rand = Math.round(random(1,2));
       switch(rand) {
         case 1: pillar.addImage(pillar1);
                 break;
         case 2:pillar.addImage(pillar2);
                 break;

         default: break;
       }
       console.log("hello") 
       //assign scale and lifetime to the obstacle           
       pillar.scale=0.34
       pillar.lifetime = 300;
      
      //add each obstacle to the group
       pillarGroup.add(pillar);
       pillar.lifetime = 300;
    }
   }
function reset(){

  gameState=  PLAY
  console.log("I am reset")
  bird=createSprite(200,Math.round(random(150,300)),50,50)
  bird.addImage("bird", birdImg)
  bird.scale=0.4
  pillarGroup.destroyEach();
  
}
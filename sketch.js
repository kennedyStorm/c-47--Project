var bg,bgImg;
var player, shooterImg, shooter_shooting;

var zombieGroup, zombieImage;
var zombieGroup2, zombieImage2;
var bullet,bulletImg
var boom,boom_img
var explosion_sound
var  text1,text2,text3, text4
var welcome,welcome_image
var treasure, treasure_img
var moneySatck, moneyStack_img
var end, end_img
var score

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImage = loadImage("assets/zombie.png");
  zombieImage2 = loadImage("assets/transparent zombie.png");
  bulletImg =loadImage("assets/cannonball.png");
  boom_img = loadImage("assets/blast.png");
  welcome_image = loadImage("assets/welcome.png")
  treasure_img = loadImage("assets/chestBox.png")
  moneyStack_img = loadImage("assets/moneyStack.png")

  explosion_sound = loadSound("assets/explosion.mp3");
  end_img = loadImage("assets/TheEnd.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  // console.log(windowHeight)
  console.log(windowHeight)


  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
// console.log(displayHeight)
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,3,3)

   zombieGroup = createGroup();
   zombieGroup2 = createGroup();

//Blast sprite creation
boom = createSprite(windowWidth/2,windowHeight/2,50,50);
boom.addImage(boom_img)
boom.visible = false;
boom.scale = 0.3


//Welcome sprite creation
welcome = createSprite(115,100,10,10)
welcome.addImage(welcome_image)
welcome.scale = 0.5

//Treasure Sprite
treasure = createSprite(1000,870,10,10)
treasure.addImage(treasure_img)
treasure.scale = 0.08

//moneyStack
moneySatck = createSprite(1500,870,20,20)
moneySatck.addImage(moneyStack_img)
moneySatck.scale = 0.4

//The End image
end = createSprite(windowWidth/2,windowHeight/2,30,30)
end.addImage(end_img)
end.scale = 2
end.visible = false;

score = 0;



  

}

function draw() {
  background(51);
  text1 = text("")
  text1.fill('Black') 
  text1.textSize(20)
  text2 =text("Press",20,250)
  text2.fill('Red')
  text2.textSize(35)
  text2.textFont("Georgia")
  text3=text("'SPACEBAR'",20,290)
  text3.fill('Black')
  text3.textSize(20)
  text4 = text("to release bullets",20,320)
 
  text("NOTE->The Game",20,340) 
  text("will end",20,360) 
  text("if the zombieeee!!",20,380) 
  text("reaches the treasure",20,400)
  
  text("Score: "+ score, 25,500);
  textSize(400)
  



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  welcome.visible = false;
  text2.visible = false;
 
  player.addImage(shooter_shooting)
  
  bullet = createSprite(displayWidth-1150, player.y, 50, 50)
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.velocityX = 10

  bullet.setCollider("rectangle",0,0,bullet.width,bullet.height);
bullet.debug = true
}
console.log(boom.visible)
if(zombieGroup.isTouching(bullet)){
  boom.visible = true;
  zombieGroup.destroyEach()
  score+=1
  

  // console.log("isTouching"+boom.visible)
  // boom = createSprite(zombie.x,zombie.y,50,50);
  // boom.addImage(boom_img)
  
  // explosion_sound.play()
  //console.log(boom.visible)

 }

if(zombieGroup2.isTouching(bullet)){
  boom.visible = true;
  zombieGroup2.destroyEach()
  score+=2
}

if(zombieGroup.isTouching(treasure)){
  end.visible = true;
  bullet.visible = false;
  bullet.velocityX = 0;
  boom.visible = false;
  treasure.visible = false;
  moneySatck.visible = false;
  zombieGroup.setVelocityYEach(0)
  zombieGroup2.setvelocityYEach(0)
  player.visible = false;
  
}

if(zombieGroup2.isTouching(moneySatck)){
  end.visible = true;
  end.visible = true;
  bullet.visible = false
  bullet.velocityX = 0;
  boom.visible = false;
  treasure.visible = false;
  moneySatck.visible = false;
  zombieGroup.setVelocityYEach(0) 
  zombieGroup2.setVelocityYEach(0)
  player.visible = false;
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  explosion_sound.play()
  boom.visible = false;
  
}

spawnZombies();
spawnZombies2();
drawSprites();

}

function spawnZombies(){
  //code for spawning zombies
  if (frameCount % 100 === 0) {
    
    var zombie = createSprite(1000,displayHeight-300,40,10);
    zombie.y = Math.round(random(80,120));
    zombie.addImage(zombieImage);
    zombie.scale = 0.2;
    zombie.velocityY = 3;

    zombie.lifetime = 250;
    zombieGroup.add(zombie)
}
}


function spawnZombies2(){
  //code for spawning zombies
  if (frameCount % 100 === 0) {
    var zombie2 = createSprite(1500,displayHeight-300,40,10);
    zombie2.y = Math.round(random(80,120));
    zombie2.addImage(zombieImage2);
    zombie2.scale = 0.25;
    zombie2.velocityY = 5;

    zombie2.lifetime = 250;
    zombieGroup2.add(zombie2)
}
}
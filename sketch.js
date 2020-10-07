var lee,running_lee,gun_lee,lee_img;
var bgImg,bg;
var zombie,zombieImg,zombieImg2,zombieGroup,zombieKill;
var monster,monsterImg,monsterGroup;
var bullet,bulletImg,bulletGroup;
var survivors,survivorsImg,survivorsGroup;

var bulletCount;
var gameState,PLAY,END;
var medicineImg;

var save1;
var life1,life,k;
var ls1,ls2,ls3,ls4,ls5,ls6,ls7;

var totMedKit,lifeSaved;
var s,l,stage;
var gameOver,gameOverImg;
function preload(){
running_lee = loadAnimation("sprites/p1r1.png","sprites/p1r2.png","sprites/p1r3.png","sprites/p1r4.png","sprites/p1r5.png","sprites/p1r6.png");
gun_lee = loadAnimation("sprites/p1gr1.png","sprites/p1gr2.png","sprites/p1gr3.png","sprites/p1gr4.png","sprites/p1gr5.png");
lee_img = loadAnimation("sprites/p1s1.png");
bgImg = loadImage("sprites/bg.jpg");
zombieImg = loadAnimation("sprites/z1r4.png","sprites/z1r5.png","sprites/z1r6.png","sprites/z1r7.png","sprites/z1r8.png","sprites/z1r9.png","sprites/z1r10.png",)
bulletImg = loadImage("sprites/bullet.png")
monsterImg = loadAnimation("sprites/z2r1.png","sprites/z2r2.png","sprites/z2r3.png","sprites/z2r4.png","sprites/z2r5.png","sprites/z2r6.png","sprites/z2r7.png")
zombieImg2 = loadAnimation("sprites/z3r4.png","sprites/z3r5.png","sprites/z3r6.png","sprites/z3r7.png","sprites/z3r8.png","sprites/z3r9.png","sprites/z3r10.png")
survivorsImg = loadImage("sprites/human1.png"); 
medicineImg = loadAnimation("sprites/med6.png");
gameOverImg = loadImage("sprites/gameOver.png");

}

function setup() {
  createCanvas(displayWidth,displayHeight);
  bg = createSprite(displayWidth/2,displayHeight/2,displayWidth,20);
  bg.addImage(bgImg);
  bg.scale = 4;
  bg.x = bg.width/2;
  

  lee = createSprite(50,displayHeight - 150, 50, 50);
  //lee.addAnimation("standing",lee_img);
  lee.addAnimation("running",running_lee);
  lee.addAnimation("gun",gun_lee);
  lee.scale = 2;

  bulletCount = 0;
  totMedKit = 0;
  lifeSaved = 0;
  l = 0;
  s = 0;
  stage = "saved";
  zombieKill = false;

  zombieGroup = new Group();
  monsterGroup = new Group();
  bulletGroup = new Group();
  survivorsGroup = new Group();

  PLAY = 1;
  END = 0;
  gameState = PLAY;

  life = [];
  k=0;

  
  ls1 = createSprite(displayWidth - 198,displayHeight/6 - 40,5,10);
  ls1.shapeColor = "yellow";
  ls1.visible = false;
  ls2 = createSprite(displayWidth - 188,displayHeight/6 - 40,5,10);
  ls2.shapeColor = "yellow";
  ls2.visible = false;
  ls3 = createSprite(displayWidth - 178,displayHeight/6 - 40,5,10);
  ls3.shapeColor = "yellow";
  ls3.visible = false;
  ls4 = createSprite(displayWidth - 168,displayHeight/6 - 40,5,10);
  ls4.shapeColor = "yellow";
  ls4.visible = false;
  ls5 = createSprite(displayWidth - 158,displayHeight/6 - 40,5,10);
  ls5.shapeColor = "yellow";
  ls5.visible = false;
  ls6 = createSprite(displayWidth - 175,displayHeight/6 - 40,5,10);
  ls6.shapeColor = "yellow";
  ls6.visible=false;
  ls7 = createSprite(displayWidth - 170,displayHeight/6 - 40,5,10);
  ls7.shapeColor = "yellow";
  ls7.visible=false;

  for(l=0;l<=75;l=l+5)
  {  
      life1 = createSprite(displayWidth -(200-l),displayHeight/6 - 20,10,10);
      life1.shapeColor = "red";   
      life.push(life1);   
      k=life.length;   
  }
  gameOver = createSprite(displayWidth/2,displayHeight/2,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
}

function draw() {
  background(0,0,0);
  
  if(gameState === PLAY){

    bg.velocityX = -2;  
    if(bg.x < 150){
      bg.x = bg.width/2;
      
    }
    

    if(bulletGroup.isTouching(zombieGroup)){
      bulletCount++;
      bulletGroup.destroyEach();
      if(bulletCount === 3){
        zombieGroup.destroyEach();
        bulletCount=0;
      }
    }
    if(bulletGroup.isTouching(monsterGroup)){
      bulletCount++;
      bulletGroup.destroyEach();
      if(bulletCount === 5){
        monster.changeAnimation("medical",medicineImg);      
        totMedKit++;
        console.log(totMedKit);
        switch (totMedKit)
        {
          case 1: ls1.visible=true;
          break;
          case 2: ls2.visible=true;
          break;
          case 3: ls3.visible=true;
          break;
          case 4: ls4.visible=true;
          break;
          case 5: ls5.visible=true;
          break;
          case 6: ls6.visible=true;
          break;
          case 7: ls7.visible=true;
          break;
          default:break;
        
        }
        bulletCount = 0;
      }

      
    }
    if(monsterGroup.isTouching(lee)){
      monsterGroup.destroyEach();
    }

    if(survivorsGroup.isTouching(lee)){
      stage="save"
      survivorsGroup.destroyEach();    
    }
      
    if(totMedKit>0 && stage==="save")
    {        
      save1 = createSprite(displayWidth - (200-s),displayHeight / 6,5,10);
      save1.shapeColor = "green";
      s=s+5;
      switch (totMedKit)
      {
        case 1: ls1.visible=false;
        break;
        case 2: ls2.visible=false;
        break;
        case 3: ls3.visible=false;
        break;
        case 4: ls4.visible=false;
        break;
        case 5: ls5.visible=false;
        break;
        case 6: ls6.visible=false;
        break;
        case 7: ls7.visible=false;
        break;
        default:break;
      }
      totMedKit--;
      stage="saved";   
      lifeSaved++;
    }

  

    if(zombieGroup.isTouching(lee)){   
      zombieGroup.destroyEach();
      zombieKill=true;
    } 

    if(zombieKill===true){
      life[k-1].visible=false;
      k=k-1;
      zombieKill=false;
    }

    spawnSurvivors();
    
    if(frameCount%1000===0){
      spawnMonster(); 
    }
    else{
      spawnZombies();
    }
     
    if(k===0 || lifeSaved===15){
      gameState=END;
    }
  }
  else if(gameState === END){
    gameOver.visible = true;
    bg.velocityX = 0;
  
    zombieGroup.setVelocityXEach(0);
    monsterGroup.setVelocityXEach(0);
    survivorsGroup.setVelocityXEach(0);

    zombieGroup.setLifetimeEach(-1);
    monsterGroup.setLifetimeEach(-1);
  }
  
  //keyPressed();
  //keyReleased();
  drawSprites();
  
  text("Available Medicines : ",displayWidth - 330,displayHeight/6 - 40);
  text("Available lives: ",displayWidth - 300,displayHeight/6 -20);
  text("People Saved : ",displayWidth - 300,displayHeight/6 );
} 
/*function keyReleased(){
 if(keyCode === DOWN_ARROW){
   lee.changeAnimation("standing",lee_img);
 }
}*/
function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    shoot();
  }
  if(keyCode === DOWN_ARROW){
    //lee.velocityY = 7;
    if(lee.y<displayHeight-100)
    {
      lee.y = lee.y+9;
      //bg.velocityY = 2;
    }
    
   // lee.changeAnimation("running",running_lee);
  }
  //if(keyup(DOWN_ARROW)){
    //lee.changeAnimation("standing",lee_img);
  //}
  else if(keyCode ===UP_ARROW){
    if(lee.y>displayHeight-300){
      lee.y = lee.y-9;
      //bg.velocityY = -2;
    }
    
  }
  /*else if(keyCode === LEFT_ARROW){
  //lee.velocityX = -7;
    lee.x = lee.x-7;
    bg.velocityX = -2;*/
  }
   
  
function spawnZombies(){

  if(frameCount % 500 === 0){
    zombie = createSprite(displayWidth,300,20,40);
    zombie.addAnimation("running",zombieImg);
    zombie.addAnimation("running1",zombieImg2);
    var r = Math.round(random(1,2));
    if(r === 1){
      zombie.changeAnimation("running",zombieImg);
    }
   else{
    zombie.changeAnimation("running1",zombieImg2);
   }  
    zombie.y=Math.round(random(displayHeight-300,displayHeight-100));
    zombie.scale = 1;
    zombie.velocityX = -2;
    zombie.lifeTime = 400;
    zombieGroup.add(zombie);    
  }
}  
function spawnMonster(){

  if(frameCount % 1000 === 0){
    monster = createSprite(displayWidth,285,20,40);
    monster.addAnimation("running",monsterImg);
    monster.addAnimation("medical",medicineImg);
    monster.scale = 2;

    monster.y=Math.round(random(displayHeight-300,displayHeight-100));
    monster.velocityX = -2;
    monster.lifeTime = 400;
    monsterGroup.add(monster);
  }
}
function spawnSurvivors(){
  if(frameCount % 1300 === 0){
    survivors = createSprite(displayWidth,displayHeight-100,20,40);
    survivors.addImage(survivorsImg);
    survivors.scale = 1.5
    survivors.y=Math.round(random(displayHeight-300,displayHeight-100));
    survivors.velocityX = -2;
    survivorsGroup.add(survivors);
  }
}
function shoot(){
  lee.changeAnimation("gun",gun_lee);
  bullet = createSprite(50,300,10,10);
  bullet.addImage(bulletImg);
  bullet.y=lee.y;
  bullet.scale = 0.1;
  bullet.velocityX = 10;
  bulletGroup.add(bullet);

}

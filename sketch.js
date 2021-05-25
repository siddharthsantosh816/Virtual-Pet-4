const Engine= Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

//Create variables here
var dog,happyDog;
var FoodS, dogName;
var database;
var foodObj,addFood;
var Bath, Sleep, Play, PlayInGarden, button, input,feed;
var gameState =0;
var fedTime, currentTime;
var display;
var sadImg, happyImg, milkImg,bedRoomImg, gardenImg, washRoomImg;

function preload(){
	sadImg=loadImage('images/Dog.png');
  happyImg=loadImage('images/happydog.png');
  bedroomImg=loadImage('images/Bed Room.png');
  gardenImg=loadImage('images/Garden.png');
  washroomImg=loadImage('images/washroom.png');
  livroomImg=loadImage('images/Living Room.png');
  lazyDog=loadImage('images/LazyDog.png');
  milkImg=loadImage('images/Milk1.png');
}

function setup(){
	createCanvas(700, 500);
  engine = Engine.create();
	world = engine.world;
    
  database=firebase.database();
  var foodStockRef=database.ref('Food');
  foodStockRef.on("value",readStock);
 
  var FeedTimeRef=database.ref('FeedTime');
  FeedTimeRef.on("value",function(data) {
    fedTime=data.val();
  });

  var readState = database.ref('gameState');
  readState.on("value", function(data){
     gameState= data.val();
  });
  
  var dogN = database.ref('Name');
  dogN.on("value", function(data) {
    dogName = data.val();
  });

  dog=createSprite(550,230,50,50);
  dog.scale=0.25;  

  foodObj = new Food();
  buttons = new Buttons();
  buttons.createButtons();
  buttons.dogName();

  Engine.run(engine);
}

function draw() {  
  background(46,139,87);
  currentTime = hour();
  buttons.choseButtons();
  
  if(gameState !== 0) {
      database.ref('/').update({
      gameState:gameState
    })
  }
  drawSprites();

  fill("white");
  textSize(20);
  if(fedTime > 12) {
    text("Last Fed Time: " + fedTime%12 + " PM", 250,400);
  } else if (fedTime === 0) {
    text("Last Fed Time: 12 AM", 300,100);
  } else {
    text("Last Fed Time: " + fedTime + " AM", 250,400);
  }
  text(dogName,520,350)

  if (FoodS === 30) {
    textSize(15);
    text("Not enough Storage Space to add more Milk", 40,400);
  }
  display = new Display();
  display.changeDisplay();

  if(gameState==1||gameState==2) {
    foodObj.display();
  }
  if(gameState==3||gameState==4||gameState==5||gameState==6) {
    if( currentTime < fedTime) {
      currentTime = currentTime +24
    }
    if (currentTime - fedTime > 4 ) {
        text("I am your Puppy " + dogName +". I am Hungry", 200,490)
    } else {
      text("I am your Puppy " + dogName + ". I had food at " + fedTime + ":00", 180,490 )
    }
  }
}

function readStock(data){
  FoodS=data.val();
  foodObj.getFoodStock(FoodS);
}

function feedDog(){
    database.ref('/').update({
    Food:foodObj.deductFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){    
  database.ref('/').update({ 
  Food:foodObj.updateFoodStock()
  })
}
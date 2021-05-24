const Engine= Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

//Create variables here
var dog,happyDog;
var FoodS, lastFed,fedTime,FeedD;
var database;
var foodObj,addFood,feed;
var dogName;
var button;
var gameState=0;
var readState;
var Bath, Sleep, Play, PlayInGarden;
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
  FeedTimeRef.on("value",readFeedTime);

  readState = database.ref('gameState');
  readState.on("value", function(data){
     gameState= data.val();
  });
  
  dog=createSprite(550,250,50,50);
 // dog.addImage(sadImg);
  dog.scale=0.2;  
  foodObj = new Food();
  var dogN = database.ref('Name');
  dogN.on("value", function(data) {
    dogName = data.val();
  });
  //console.log(dogName);
  if (dogName === "undefined") {
      input = createInput("");
      input.position(820, 400);

      button = createButton("Press this Button after Giving the Name");
      button.position(780, 450);  
      // console.log(input.value());
      
      button.mousePressed(()=> {
        input.hide();
        button.hide();
        dogName =input.value();
        database.ref('/').update({
        Name:dogName
        })    
    });
  }

   //Creating buttons
  feed = createButton("Feed the Dog");
  feed.position(360,60);

  addFood = createButton("Add Food");
  addFood.position(460,60);

  Bath=createButton("I want to take bath");
  Bath.position(540,60);

  Sleep=createButton("I am very Sleepy");
  Sleep.position(360,90);

  Play=createButton("Lets Play!");
  Play.position(600,90);
  
  PlayInGarden=createButton("Lets Play in Park");
  PlayInGarden.position(480,90);

  Engine.run(engine);
}

function draw() {  
  background(46,139,87);
  if(gameState===0) {
    dog.addImage(sadImg);
  }

  drawSprites();

  //add styles here
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
  
  feed.mousePressed(()=> {
    gameState=1;
    feedDog()

  });
    
  addFood.mousePressed(()=> {
    gameState=2;
    addFoods();
  });

  Bath.mousePressed(()=> {
    gameState=3;
  });
 
  Sleep.mousePressed(()=> {
    gameState=4;
  });

  Play.mousePressed(()=> {
    gameState=5;
  });

  PlayInGarden.mousePressed(()=> {
    gameState=6;
  });
  
  updateStatus(gameState);

  if(gameState===1){
    if (FoodS === 0) {
      dog.addImage(sadImg);
      fill("red");
      text("No food left. Please add Food", 220, 430)
    } else {
      dog.addImage(happyImg);
    }
    foodObj.display();
   
  }
    
  if(gameState===2){
    dog.addImage(sadImg);
    foodObj.display();
  }

  if(gameState===3){
    background(washroomImg);
    text("I am your Puppy, Aster!!", 220, 490);
  }
  
  if(gameState===4){
    background(bedroomImg);
    text("I am your Puppy, Aster!!", 220, 490);
  }

  
  if(gameState===5){
    background(livroomImg);
    text("I am your Puppy, Aster!!", 220, 490);
  }

  if(gameState===6){
    background(gardenImg);
    text("I am your Puppy, Aster!!", 220, 490);
  }
  
}

function readStock(data){
  FoodS=data.val();
  foodObj.getFoodStock(FoodS);
}

function readFeedTime(data){
  fedTime=data.val();
  foodObj.getLastFedTime(fedTime);
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

function updateStatus(status){
  database.ref('/').update({
    gameState:status
  })
}
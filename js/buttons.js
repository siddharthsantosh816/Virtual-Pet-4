class Buttons{
   
    constructor(){}

    createButtons(){
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
    }
    dogName() {
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
    }


    choseButtons(){
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
    }
};

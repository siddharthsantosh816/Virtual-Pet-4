class Display{
   
    constructor(){}

    changeDisplay(){
        if(gameState===0) {
            foodObj.display();
            if(FoodS === 0) {
                dog.addImage(happyImg);
            } else {
                dog.addImage(sadImg);
            }
            }
        if(gameState===1){
            if (FoodS === 0) {
                dog.addImage(sadImg);
                fill("red");
                text("No food left. Please add Food", 220, 430)
            } else {
                dog.addImage(happyImg);
            }
        }
            
        if(gameState===2){
            dog.addImage(sadImg);
        }
        
        if(gameState===3){
            background(washroomImg);
        }
        
        if(gameState===4){
            background(bedroomImg);
        }
        
        
        if(gameState===5){
            background(livroomImg);
        }
        
        if(gameState===6){
            background(gardenImg);
        }
    }
};
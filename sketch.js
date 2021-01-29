//Create variables here
var dog, happyDog, database, foodS, foodStock,dogSprite;
function preload()
{
  //load images here
  dogSprite=loadImage('dogImg.png')
  happyDog=loadImage('dogImg1.png')
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,250,10,10);
  dog.addImage(dogSprite);
  dog.scale=0.5;

  database = firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}

  drawSprites();
  textSize(20);
  fill("black");
  
text("note: press upArrow key to feed milk to the dog",10,75);
text("number of milk bottles left="+foodS,50,60)

  //add styles here

}

function readStock(data){
foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
database.ref('/').update({
  food:x
})
}

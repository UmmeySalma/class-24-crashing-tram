const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var myEngine, myWorld;
var ground;
var rock;
var bg;
var boggy1, boggy2, boggy3, boggy4, boggy5, boggy6;
var chain1, chain2, chain3, chain4, chain5;
var trainSound;
var crashSound;
var flag = 0;

function preload(){
 bg = loadImage("images/bg.jpg");
 trainSound = loadSound("sound/train.mp3");
 crashSound = loadSound("sound/train_crossing.mp3"); 
}

function setup() {
  createCanvas(1000,400);
  myEngine = Engine.create();
  myWorld = myEngine.world;

  //create the ground
  ground = new Ground (500,380,1000,20);

  //create the boggies
  boggy1 = new Boggy (50,170,50,50);
  boggy2 = new Boggy (150,170,50,50);
  boggy3 = new Boggy (250,170,50,50);
  boggy4 = new Boggy (350,170,50,50);
  boggy5 = new Boggy (450,170,50,50);
  boggy6 = new Boggy (550,170,50,50);

  //create the rock
  rock = new Rock (900,200,100,100);

  //create the chains
  
  chain1 = new Chain (boggy1.body,boggy2.body);
  chain2 = new Chain (boggy2.body,boggy3.body);
  chain3 = new Chain (boggy3.body,boggy4.body);
  chain4 = new Chain (boggy4.body,boggy5.body);
  chain5 = new Chain (boggy5.body,boggy6.body);
}

function draw() {
  background(bg);  
  Engine.update(myEngine);

  //display the objects
  ground.show();
  boggy1.show();
  boggy2.show();
  boggy3.show();
  boggy4.show();
  boggy5.show();
  boggy6.show();
  rock.show();
  chain1.show();
  chain2.show();
  chain3.show();
  chain4.show();
  chain5.show();

  var collision = Matter.SAT.collides(boggy6.body, rock.body);

  if(collision.collided){
    flag=1;
  }

  if(flag === 1){
    textSize(30);
    stroke(3);
    fill('blue');
    text("CRASH",500,200);
    crashSound.play();
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW){
    Matter.Body.applyForce(boggy6.body,{x:boggy6.body.position.x,y:boggy6.body.position.y},{x:0.5,y:0});
    trainSound.play();
  }
}
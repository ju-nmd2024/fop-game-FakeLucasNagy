let x = -300; //makes sure pivit point is at the grip
let y = -300; // ---- || ----
let characterY = 50;
let characterX = 990;


//gravity
const speedV = 3; //3; speed value (used to reset acceleration)
const recoilV = 30; //30; recoil speed value
let acceleration = 3; //3;
let speed = speedV; //sets speed value
let gravity = 0; //gravity starts without force
let shoot = 0; //upwards movement when shooting
let shootX = 0; //sideways movement when shooting
let postX = 0; // old shootX value
let shootDir = 0; //saves the direction the gun was fired in for x movement
let recoil = recoilV; //sets recoil speed value

//makes gun move correctly
isShooting = false; //toggles recoil physics
shootDecline = false; //disables up movement when true

//makes gun run
let animTimer = false; //makes sure shooting animation only plays once
let midFire = false; //makes sure you can re-enable animation by shooting mid-fire

//limit firing angle
let limit = false; //makes sure recoil doesnt go too far
const limitValue = 50; //max angle offset

//sync animations and limit controls
let firing = false; //state in which you can fire
let baseRot = 0; //updates mid-fire for new recoil
let cocking = false; //state in which the slide will cock back

//animaton values
let xFireOffset = 0; //amount slide cock back
let yFireOffset = 0; //amount slide will fall apart and noclip (unused)
let rotFire = 0; //rotation of gun recoil
let rotTrigger = -0; //rotation of trigger

//states
//game state
let gameState = "start";

//button states
let normal = '#96c8c8';
let hover = '#649696';
let buttonState = normal;


function setup(){
  createCanvas(700, 700);
  angleMode(DEGREES);

  frameRate(24); //otherwise my animations de-sync
  noStroke();
}

function draw(){
  if (gameState === "start") {
    startScreen();
  } else if (gameState === "game") {
    gameScreen();
  } else if (gameState === "win") {
    winScreen();
  } else {
    failScreen();
  }
}



//game states
//start screen
function startScreen() {
  characterY = 50;
  characterX = 990;
  speed = speedV;
  shoot = 0;
  shootX = 0;
  postX = 0;
  shootDecline = false;
  isShooting = false;

  background(50, 100, 100);
  //title
  fill(150, 200, 200);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(50);
  text('Glock into the Sky', width/2, height/2-100);
  //button
  button('START', buttonState, width/2, height/2, 30);

  //vingette
  push();
  noFill();
  stroke(0, 0, 0, 3);
  strokeWeight(20);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(30);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(40);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(50);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(60);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(70);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(80);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(90);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(100);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(110);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(120);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(130);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(140);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(150);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(160);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(170);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(180);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(190);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(115);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(200);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(210);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(220);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(230);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(240);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(250);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(260);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(270);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(280);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(290);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(300);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(310);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(320);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(330);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(340);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(350);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(360);
  ellipse(width/2-12, height/2, width+500, height+270);
  pop();
}
//the actual game
function gameScreen() {
  background(100, 150, 150);

  //win requirement (speed of at least 70 units)
  if (characterX <= -6470 && characterX >= -6550 && characterY >= 20 && 
    characterY <= 290 && characterY >= 30 && (Math.sin((shootDir/(180/PI))) * shootX + postX) < -70) {
    gameState = "win";
  } else if (characterX <= -6470 && characterX >= -6550 && characterY >= 20 && 
    characterY <= 290 && characterY >= 30) {
      gameState = "Too Slow!";
  }
  //death & scroll looping
  if (characterY > 750) {
    gameState = "You fell down!";
  }
  if (characterY < -170) {
    gameState = "That's too far up!";
  }
  if (characterX < -6930) {
    characterX = 990;
  }  

  //shooting
  if (animTimer) {
      shootF();
  }
  //shooting while animation is playing
  if (midFire) {
      shootF();
      midFire = false;
  }
    //recoil
    //if we have started shooting, and recoil havent reached max velocity, and we aren't falling
    if (isShooting && shoot >= -30 && shootDecline === false) {
    //recoil movement on both axis
    shoot -= recoil;
    shootX -= recoil + postX;
    speed = speedV; //reset acceleration
  } else if (isShooting && shoot <=0) { //if recoil has reached max velocity
    shootDecline = true; //stop going up
    //start slowing down recoil's force
    shoot += 5;
    shootX += 1;
  } else if (isShooting && shootX <=0) {
    shootX += 1; //we should still lose speed when we're falling
  } else if (isShooting && shootX >=0) { //if we're still sliding
    //we're no longer affected by upwards force
    postX = 0;
    shootX = 0;
    shootDecline = false;
    isShooting = false;
  }

  //gravity
  if (speed <= 50) {
    speed += acceleration;
  } else {
    //terminal velocity
    speed = 50;
  }

  gravity = speed; //speed up gun's gravity
  characterX += (Math.sin((shootDir/(180/PI))) * shootX + postX); //shooting force on x axis
  characterY += Math.cos((rotFire/(180/PI))) * gravity + shoot; //gravity + shooting force on y axis
 
  terrain(characterX/2, 200, characterX, 50); //it's the background!

  gun(0,characterY); //it's the gun!
}
//fail screen
function failScreen() {

  background(30, 70, 70);
  //title
  fill(100, 150, 150);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(50);
  text(gameState, width/2, height/2-100);
  //button
  button('RESTART', buttonState, width/2, height/2, 30);

  //vingette
  push();
  noFill();
  stroke(0, 0, 0, 3);
  strokeWeight(20);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(30);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(40);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(50);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(60);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(70);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(80);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(90);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(100);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(110);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(120);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(130);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(140);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(150);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(160);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(170);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(180);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(190);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(115);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(200);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(210);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(220);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(230);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(240);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(250);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(260);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(270);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(280);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(290);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(300);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(310);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(320);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(330);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(340);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(350);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(360);
  ellipse(width/2-12, height/2, width+500, height+270);
  pop();
}
//win screen
function winScreen() {
  characterY = 350;
  characterX = 990;

  background(200, 250, 250);
  //title
  fill(100, 150, 150);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("You Did It!", width/2, height/2-100);
  //button
  button('MAIN MENU', buttonState, width/2, height/2, 30);

  //vingette
  push();
  noFill();
  stroke(255, 255, 255, 8);
  strokeWeight(20);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(30);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(40);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(50);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(60);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(70);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(80);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(90);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(100);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(110);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(120);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(130);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(140);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(150);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(160);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(170);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(180);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(190);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(115);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(200);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(210);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(220);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(230);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(240);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(250);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(260);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(270);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(280);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(290);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(300);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(310);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(320);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(330);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(340);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(350);
  ellipse(width/2-12, height/2, width+500, height+270);
  strokeWeight(360);
  ellipse(width/2-12, height/2, width+500, height+270);
  pop();
}

function button(inputText, c, w, h, t) {
  //hover animation
  if (mouseX > (-112+w) && mouseY > (-40+h) &&
  mouseX < (-112+w+200) && mouseY < (-40+h+80) &&
  gameState !== "game") {
    buttonState = hover;
  } else {
    buttonState = normal;
  }
  push();
  translate(w, h);
  fill(c);
  rect(-112, -40, 200, 80, 10);
  fill(255);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  textSize(t);
  text(inputText, -12, 0);
  pop();
}

function terrain(a, b, x, y) {
  //back shapes
  fill(125, 175, 175);  
  triangle(a-100, b+700, a+900, b+700, a+500, b+0);
  triangle(a+900, b+700, a+1900, b+700, a+1500, b+0);
  triangle(a-1100, b+700, a-100, b+700, a-500, b+0);
  triangle(a+1900, b+700, a+2900, b+700, a+2500, b+0);
  triangle(a+2900, b+700, a+3900, b+700, a+3500, b+0);
  triangle(a+3900, b+700, a+4900, b+700, a+4500, b+0);
  
  //front shapes
  fill(150, 200, 200);  
  triangle(x-100, y+700, x+900, y+700, x+500, y+0);
  triangle(x+900, y+700, x+1900, y+700, x+1500, y+0);
  triangle(x-1100, y+700, x-100, y+700, x-500, y+0);
  triangle(x+1900, y+700, x+2900, y+700, x+2500, y+0);
  triangle(x+2900, y+700, x+3900, y+700, x+3500, y+0);
  triangle(x+3900, y+700, x+4900, y+700, x+4500, y+0);
  triangle(x+4900, y+700, x+5900, y+700, x+5500, y+0);
  triangle(x+5900, y+700, x+6900, y+700, x+6500, y+0);
  triangle(x+6900, y+700, x+7900, y+700, x+7500, y+0);

  //finish
  push();
  translate(7400, 0);
  fill(255,0,0);
  strokeWeight(10);
  stroke(255);
  ellipse(x-500, y+200, 90, 200);
  ellipse(x-500, y+200, 60, 160);
  ellipse(x-500, y+200, 30, 120);
  strokeWeight(4);
  ellipse(x-500, y+200, 4, 70);
  pop();
}

function gun(X,Y) {

  push();
  translate(350+X,50+Y);
  rotate(rotFire-90);
  scale(0.333);

  //muzzle
  fill(50,50,50);
  rect(x-7, y+120, 62, 27);

  //trigger guard
  fill(70,70,70);
  beginShape();
  vertex(x+93, y+183);
  bezierVertex(x+93,y+183, x+135,y+183, x+135,y+193);
  bezierVertex(x+144,y+193, x+118,y+201, x+118,y+211);
  bezierVertex(x+118,y+211, x+118,y+224, x+118,y+224);
  bezierVertex(x+118,y+236, x+124,y+243, x+142,y+243);
  bezierVertex(x+142,y+243, x+181,y+244, x+181,y+244);
  bezierVertex(x+195,y+244, x+204,y+234, x+204,y+221);
  bezierVertex(x+204,y+221, x+203,y+208, x+203,y+208);
  bezierVertex(x+203,y+208, x+230,y+254, x+230,y+254);
  bezierVertex(x+230,y+254, x+225,y+260, x+225,y+260);
  bezierVertex(x+225,y+260, x+216,y+245, x+207,y+245);
  bezierVertex(x+198,y+245, x+197,y+254, x+181,y+254);
  bezierVertex(x+181,y+254, x+113,y+251, x+109,y+251);
  bezierVertex(x+96,y+251, x+108,y+244, x+108,y+228);
  bezierVertex(x+108,y+228, x+108,y+211, x+108,y+211);
  bezierVertex(x+108,y+200, x+85,y+193, x+93,y+193);
  endShape();

  //trigger
  push();
  translate(-115, -103); //so it can rotate around its axis
  rotate(rotTrigger);

  beginShape();
  vertex(x+286,y+280);
  bezierVertex(x+286,y+280, x+326,y+292, x+326,y+292);
  bezierVertex(x+326,y+292, x+306,y+312, x+300,y+312);
  bezierVertex(x+300,y+320, x+277,y+337, x+274,y+333);
  bezierVertex(x+271,y+329, x+286,y+323, x+286,y+299);
  bezierVertex(x+286,y+299, x+286,y+280, x+286,y+280);
  endShape();
  pop();

  //grip
  fill(80,80,80);
  beginShape();
  vertex(x+353,y+176);
  bezierVertex(x+339,y+176, x+322,y+185, x+322,y+208);
  bezierVertex(x+322,y+260, x+363,y+282, x+363,y+316);
  bezierVertex(x+363,y+316, x+363,y+342, x+363,y+342);
  bezierVertex(x+363,y+346, x+360,y+347, x+356,y+348);
  bezierVertex(x+356,y+348, x+267,y+358, x+267,y+358);
  bezierVertex(x+257,y+359, x+254,y+349, x+251,y+341);
  bezierVertex(x+225,y+271, x+212,y+205, x+187,y+198);
  bezierVertex(x+165,y+193, x+96,y+193, x+96,y+193);
  bezierVertex(x+96,y+193, x+9,y+193, x+9,y+193);
  bezierVertex(x+2,y+193, x,y+192, x,y+185);
  bezierVertex(x,y+185, x,y+166, x,y+166);
  bezierVertex(x,y+166, x+362,y+166, x+353,y+166);
  bezierVertex(x,y+176, x+362,y+176, x+353,y+176);
  endShape();

  //frame
  rect(x,y+159, 357, 17, 5, 5, 5, 0);

  push();
  translate(xFireOffset, yFireOffset); //to animate barrel
  //front sight
  fill(120,120,120);
  quad(x+16,y+106, x+24,y+106, x+25,y+112, x+13,y+112);

  //back sight
  fill(138,138,138);
  quad(x+326,y+104, x+334,y+104, x+337,y+112, x+324,y+112);

  //slide
  rect(x,y+112, 357,47, 10,10,5,5);

  pop();

}

function shootF() { //this is the shooting function/animation

  let fireAngle = baseRot + 40; //resets recoil to 40 degree range
  
  //slide and trigger animation
  //make the slide cock back, if it ain't already doing that, or the gun isn't firing
  if (xFireOffset < 30 && cocking === false && firing === false) {
    xFireOffset += 30; //cock back
    rotTrigger -= 30; //pull trigger
    if (xFireOffset >= 30) { //if slide is all the way back then its "cocked"
    cocking = true;
    }
  } else if (xFireOffset > 0 && cocking === true) { //if slide isn't reset and has been "cocked"
    xFireOffset -= 5; //move slide back
    rotTrigger += 5; //move trigger back
    if (xFireOffset <= 0) { //if slide is reset
    xFireOffset = 0; //compensate for overflow
    rotTrigger = 0; // ---- || ----
    cocking = false; //its no longer in cocking mode
    }
  }

  //rotation animation
  //if rotation is less than max recoil, and its not already firing, and the recoil limit isnt reached
  if (rotFire < fireAngle && firing === false && limit === false) {
    rotFire += 40; //start rotating
    if (rotFire >= fireAngle) { //if recoil angle met
    firing = true; //we have fired
    }
  } else if (rotFire > 0 && firing === true) { //if rotation isn't reset and we just fired
    rotFire -= 5; //start drawing back
    if (rotFire <= 0) {//if rotation is reset
      baseRot = 0; //set base rotation back to downward
      xFireOffset = 0; //make sure slide doesn't get stuck mid animation
      cocking = false; //let slide start moving again
      rotTrigger = 0; //make sure trigger ---- || ----
      firing = false; //we're no longer firing
      animTimer = false; //stop animating, we're done
    }
  }

  if (limit === true) { //if limit reached, stop firing
    rotFire -= 5; //draw back from limit
    if (xFireOffset > 0) {
      xFireOffset -=5; //slide back from limit
      rotTrigger += 5; //reset trigger
    }
    if (rotFire <= 0) { //if drawn back
      baseRot = 0; //set base rotation back to downward
      xFireOffset = 0; //make sure slide doesn't get stuck mid animation
      cocking = false; //let slide start moving again
      rotTrigger = 0; //make sure trigger ---- || ----
      firing = false; //we're no longer firing
      animTimer = false; //stop animating, we're done
      limit = false; //limit has done its thing
    }
  }
}

function keyPressed() {
/*if (isLooping()) {
    baseRot = rotFire; //before animation execute, set recoil from current gun angle
    if (rotFire >= limitValue) { //if limit reached, stop firing
      limit = true;
    }
    else { //if limit not reached, allow fire mid-recoil
      firing = false;
      cocking = false;
    }
  }
  else {
    loop(); //activate on press
  }*/


  if (key === ' ') { //if space is pressed
    postX = shootX; //keep momentum on new shot
    isShooting = true; //start moving upwards
    shootDecline = false; //reset downwards movement if mid-fire
    shootDir = rotFire; //check angle of gun
    if (animTimer) { //if gun animation is already playing
      firing = false; //reset firing check
      shootDir = rotFire; //gather new firing angle
      baseRot = rotFire; //before animation execute, set recoil from current gun angle
      midFire = true; //yep, we did indeed fire mid-fire
      if (rotFire >= limitValue) { //if limit reached, stop firing
        limit = true; //execute emergency draw back
      }
    } else { //if gun animation isnt playing then play it
      animTimer = true;
    }
  }
}

//switch states when clicking on button
function mouseClicked() {
  if (buttonState === hover && gameState !== "start" && gameState !== "game") {
    gameState = "start";
  } else if (buttonState === hover && gameState === "start") {
    gameState = "game";
  }
}
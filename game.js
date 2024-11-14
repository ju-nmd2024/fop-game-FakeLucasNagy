let x = -300; //makes sure pivit point is at the grip
let y = -300; // ---- || ----
let characterY = 0;
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



function setup(){
  createCanvas(700, 700);

  angleMode(DEGREES);

  frameRate(24);

  
  //noLoop();
}

function draw(){
background(255);

if (characterY > 700) {
  characterY = -150;
}
if (characterX < -990) {
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
    console.log('step3');
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
 
  terrain(characterX, 0);
  console.log('y '+shoot);
  console.log('x '+shootX);
  console.log('post '+postX);
  gun(0,characterY); //it's the gun!
}

function terrain(x, y) {
  fill(150, 200, 200);  
  triangle(x-100, y+700, x+900, y+700, x+500, y+0);
  triangle(x+900, y+700, x+1900, y+700, x+1500, y+0);
  triangle(x-1100, y+700, x-100, y+700, x-500, y+0);
}


function gun(X,Y) {

  push();
  translate(200+X,50+Y);
  rotate(rotFire-90);
  scale(0.333);
  noStroke();

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
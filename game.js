let x = -300; //makes sure pivit point is at the grip
let y = -300; //---- || ----

let limit = false; //makes sure recoil doesnt go too far
const limitValue = 25; //max angle offset

let firing = false; //state in which you can fire
let baseRot = 0; //updates mid-fire for new recoil

let cocking = false; //state in which the slide will cock back

let xFireOffset = 0; //amount slide cock back
let yFireOffset = 0; //amount slide will fall apart and noclip (unused)
let rotFire = 0; //rotation of gun recoil
let rotTrigger = -0; //rotation of trigger


function setup(){
  createCanvas(700, 700);

  angleMode(DEGREES);

  frameRate(24);

  noLoop();
}

function draw(){
  let fireAngle = baseRot + 10; //resets recoil to 10 degree range

  //cocking
  if (xFireOffset < 30 && cocking === false && firing === false) {
    xFireOffset += 30;
    rotTrigger -= 30;
    if (xFireOffset >= 30) {
      cocking = true;
    }
  }
  else if (xFireOffset > 0 && cocking === true) {
    xFireOffset -= 10;
    rotTrigger += (30/3);
    if (xFireOffset <= 0) {
      xFireOffset = 0;
      rotTrigger = 0;
      cocking = false;
    }
  }

  //rotation
  if (rotFire < fireAngle && firing === false && limit === false) {
    rotFire += 20;
    if (rotFire >= fireAngle) {
      firing = true;
    }
  }
  else if (rotFire > 0 && firing === true) {
    rotFire -= 5;
    if (rotFire <= 0) {
      baseRot = 0;
      xFireOffset = 0;
      rotTrigger = 0;
      firing = false;
      limit = false;
      noLoop();
    }
  }
  if (limit === true) { //if limit reached, stop firing
    rotFire -= 5;
    xFireOffset -=10;
    rotTrigger += (30/3);
    if (rotFire <= 0) {
      baseRot = 0;
      xFireOffset = 0;
      rotTrigger = 0;
      firing = false;
      limit = false;
      noLoop();
    }
  }

  gun();
}

function gun() {
  background(255,255,255);

  push();
  translate(420,400);
  rotate(rotFire);
  scale(1);
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

function mousePressed() {
  if (isLooping()) {
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
  }
}
const speedV = 3; //3;
const recoilV = 20; //20;

let characterY = 0;
let characterX = 0;
let acceleration = 3; //3;
let speed = speedV;
let gravity = 0;
let shoot = 0;
let shootX = 0;
let shootDir = 0;
let recoil = recoilV;



isShooting = false;
shootDecline = false;



//requirements
let animTimer = false;
let midFire = false;

let limit = false; //makes sure recoil doesnt go too far
const limitValue = 80; //max angle offset

let firing = false; //state in which you can fire
let baseRot = 0; //updates mid-fire for new recoil

let rotFire = 0; //rotation of gun recoil







function setup() {
    createCanvas(600,600);
    angleMode(DEGREES);
}

function draw() {
    background(255);


//shooting
    if (animTimer) {
        shots();
    }
    if (midFire) {
        shots();
        midFire = false;
    }


//recoil
    if (isShooting && shoot >= -30 && shootDecline === false) {
        shoot -= recoil;
        shootX -= recoil;
        speed = 0;
    } else if (isShooting && shoot <=0) {
        shootDecline = true;
        shoot += 2;
        shootX += 2;
    } else if (isShooting && shootX <=0) {
        isShooting = false;
        shootDecline = false;

    } else if (isShooting) {



    }

//gravity
    //terminal velocity
    if (speed <= 30) {
        speed += acceleration;
    } else {
        speed = 30;
    }

    characterX += Math.sin((shootDir/(180/PI))) * -shootX;
    characterY += Math.cos((rotFire/(180/PI))) * gravity+shoot;
    gravity = speed;

    character();

}

function character() {
    push();
    scale(0.8);
    translate(50+characterX,60+characterY);
    rotate(0+rotFire);
    fill(0);
    rect(-15, -10, 20, 30);
    pop();
}

function keyPressed() {
    if (key === 'x') {
        isShooting = true;
        shootDecline = false;
    }



    //rotation
    if (animTimer) {
        firing = false;
        shootDir = rotFire;
        baseRot = rotFire; //before animation execute, set recoil from current gun angle
        midFire = true;
        if (rotFire >= limitValue) { //if limit reached, stop firing
          limit = true;
        }
    } else {
        animTimer = true;
    }
}


function shots() {
    let fireAngle = baseRot + 40; //resets recoil to 10 degree range

  //rotation
    if (rotFire < fireAngle && firing === false && limit === false) {
        rotFire += 40;
        if (rotFire >= fireAngle) {
        firing = true;
        }
    } else if (rotFire > 0 && firing === true) {
        rotFire -= 5;
        if (rotFire <= 0) {
            baseRot = 0;
            firing = false;
            limit = false;
            animTimer = false;
            //noLoop();
        }
    }
    if (limit === true) { //if limit reached, stop firing
        rotFire -= 5;
        if (rotFire <= 0) {
            baseRot = 0;
            firing = false;
            limit = false;
            animTimer = false;
            //noLoop();
        }
    }
}
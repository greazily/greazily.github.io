let fontBold;
  
function preload() {
  fontBold = loadFont('otf/DinishCondensed-Bold2.otf');
}

class Ball {
  constructor(pos, vel, radius, color, word, angle, strW, txtS) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.word = word;
    this.angle = angle;
    this.strW = strW;
    this.txtS = txtS;
  }
  collide(other) {
    if (other == this) {
      return;
    }
    let relative = p5.Vector.sub(other.pos, this.pos);
    let dist = relative.mag() - (this.radius + other.radius);
    if (dist < 0) {
      let movement = relative.copy().setMag(abs(dist/2));
      this.pos.sub(movement);
      other.pos.add(movement);
      
      let thisToOtherNormal = relative.copy().normalize();
      let approachSpeed = this.vel.dot(thisToOtherNormal) + -other.vel.dot(thisToOtherNormal);
      let approachVector = thisToOtherNormal.copy().setMag(approachSpeed);
      this.vel.sub(approachVector);
      other.vel.add(approachVector);
    }
  }
  move() {
    // replace 10 with number that suits stroke weight
    this.vel.y += 0.1;
    this.angle += this.vel.x * 0.025;
    this.pos.add(this.vel);
    if (this.pos.x < this.radius + this.strW) {
      this.pos.x = this.radius + this.strW;
      this.vel.x = -this.vel.x * 0.95;
    }
    if (this.pos.x > width-this.radius - this.strW) {
      this.pos.x = width-this.radius - this.strW;
      this.vel.x = -this.vel.x * 0.95;
    }
    // if (this.pos.y < this.radius + this.strW) {
    //   this.pos.y = this.radius + this.strW;
    //   this.vel.y = -this.vel.y * 0.95;
    // }
    if (this.pos.y > height-this.radius - this.strW) {
      this.pos.y = height-this.radius - this.strW;
      this.vel.y = -this.vel.y;
    }
  }
  render() {
    
    push()
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    strokeWeight(this.strW);
    stroke(47, 47, 47);
    fill(this.color);
    ellipse(0, 0, this.radius*2);
    noStroke();
    textSize(this.txtS);
    textAlign(CENTER, CENTER);
    textFont(fontBold);
    fill(47, 47, 47);
    text(this.word, 0, 0);
    pop()
    
  }
}

let balls = [];

let words = ['MIKAEL', 'DAHLÉN'];

const cHeight = document.querySelector(".sketch").clientHeight,
      cWidth = document.querySelector(".sketch").clientWidth;

console.log(cWidth);
console.log(window.innerWidth)
console.log(document.querySelector(".layout-rows").offsetWidth)




function setup() {
  let canvas = createCanvas(cWidth, cHeight);
  canvas.parent('sketch');
  for (i = 0; i < 2; i++) {
    let start, end, r = sqrt((width * height) * 0.15)/2;
    if(i == 0 ) {start = 0; end = width/2;} 
    else {start = width/2; end = width;}
    balls.push(new Ball(
      createVector(random(start, end), -r),
      p5.Vector.random2D(5,10).mult(random(2)),
      r,//radius
      color(253, 253, 88),//color
      words[i],//word
      0,//angle
      2.4,//strW
      r * 0.55 //txtS
    ));
  }
}

function draw() {
  // background(255, 150, 150);
  clear()
  
  for(let i = 0; i < balls.length; i++) {
    for(let j = 0; j < i; j++) {
      balls[i].collide(balls[j]);
    }
  }
  
  for(let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].render();
  }
}


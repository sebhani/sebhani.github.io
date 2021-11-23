class Ball {
    constructor(pos, vel, radius, color) {
      this.pos = pos;
      this.vel = vel;
      this.radius = radius;
      this.color = color;
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
      this.vel.y += 0.1;
      this.pos.add(this.vel);
      if (this.pos.x < this.radius) {
        this.pos.x = this.radius;
        this.vel.x = -this.vel.x;
      }
      if (this.pos.x > width-this.radius) {
        this.pos.x = width-this.radius;
        this.vel.x = -this.vel.x;
      }
      if (this.pos.y < this.radius) {
        this.pos.y = this.radius;
        this.vel.y = -this.vel.y;
      }
      if (this.pos.y > height-this.radius) {
        this.pos.y = height-this.radius;
        this.vel.y = -this.vel.y;
      }
    }
    render() {
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.radius*2);
    }
  }
  
  let balls = [];
  
  function setup() {
    createCanvas(450, 300);
  
    for (i = 0; i < 10; i++) {
      balls.push(new Ball(
        createVector(random(width),random(height)),
        p5.Vector.random2D().mult(random(10)),
        30,
        color(235, 229, 61)
      ));
    }
  }
  
  function draw() {
    background(182, 200, 224);
    
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
import Vector2d from './vector2d.js';

export default class Particle {
  constructor(initialPos, species) {
    this.pos = initialPos;
    this.vel = new Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 1);
    this.acc = new Vector2d();
    this.species = species;
    this.radius = 5;
    this.visibleArea = {
      minRadius: 50,
      maxRadius: 200,
    };
  }

  move(maxVel, friction) {
    this.vel.add(this.acc).limit(maxVel).mult(1 - friction);
    this.pos.add(this.vel);
  }

  wrapPos({ width, height }) {
    this.xAxisWrap(width);
    this.yAxisWrap(height);
  }

  xAxisWrap(width) {
    if (this.pos.x > width + this.size / 2) {
      this.pos.x = -this.size / 2;
    } else if (this.pos.x < -this.size / 2) {
      this.pos.x = width + this.size / 2;
    }
  }

  yAxisWrap(height) {
    if (this.pos.y > height + this.size / 2) {
      this.pos.y = -this.size / 2;
    } else if (this.pos.y < -this.size / 2) {
      this.pos.y = height + this.size / 2;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }
}

import Vector2d from './vector2d.js';

export default class Particle {
  constructor(initialPos, radius, species) {
    this.pos = initialPos;
    this.vel = new Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 1);
    this.species = species;
    this.radius = radius;
  }

  move(force, friction) {
    this.vel.add(force).mult(1 - friction);
    this.pos.add(this.vel);
  }

  bounceOnWall({ width, height }) {
    this.xBounce(width);
    this.yBounce(height);
  }

  xBounce(width) {
    if (this.pos.x > width - this.radius) {
      this.vel.x = -this.vel.x;
      this.pos.x = width - this.radius;
    } else if (this.pos.x < this.radius) {
      this.vel.x = -this.vel.x;
      this.pos.x = this.radius;
    }
  }

  yBounce(height) {
    if (this.pos.y > height - this.radius) {
      this.vel.y = -this.vel.y;
      this.pos.y = height - this.radius;
    } else if (this.pos.y < this.radius) {
      this.vel.y = -this.vel.y;
      this.pos.y = this.radius;
    }
  }

  wrapPos({ width, height }) {
    this.xAxisWrap(width);
    this.yAxisWrap(height);
  }

  xAxisWrap(width) {
    if (this.pos.x > width + this.radius) {
      this.pos.x = -this.radius;
    } else if (this.pos.x < -this.radius) {
      this.pos.x = width + this.radius;
    }
  }

  yAxisWrap(height) {
    if (this.pos.y > height + this.radius) {
      this.pos.y = -this.radius;
    } else if (this.pos.y < -this.radius) {
      this.pos.y = height + this.radius;
    }
  }
}

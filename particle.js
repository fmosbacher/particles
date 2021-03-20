import Vector2d from './vector2d.js';

export default class Particle {
  constructor(initialPos, radius, species) {
    this.pos = initialPos;
    this.vel = new Vector2d();
    this.acc = new Vector2d();
    this.species = species;
    this.radius = radius;
  }

  move(force, friction) {
    this.acc.add(force);
    this.acc.add(Vector2d.mult(this.vel, -friction));
    this.vel.add(this.acc).limit(1);
    this.pos.add(this.vel);
    this.acc.mult(0);
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
    if (this.pos.x > width + this.radius) this.pos.x -= width;
    else if (this.pos.x < -this.radius) this.pos.x += width;
  }

  yAxisWrap(height) {
    if (this.pos.y > height + this.radius) this.pos.y -= height;
    else if (this.pos.y < -this.radius) this.pos.y += height;
  }
}

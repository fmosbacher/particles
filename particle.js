import Vector2d from './vector2d.js';

export default class Particle {
  constructor(screen) {
    this.pos = new Vector2d(
      Math.floor(Math.random() * screen.width),
      Math.floor(Math.random() * screen.height),
    );
    this.vel = new Vector2d();
    this.acc = new Vector2d();
    this.attractionForce = (Math.random()) / 10000;
  }

  move() {
    this.pos.add(this.vel);
    this.vel.add(this.acc).limit(0.3);
  }

  interact(others) {
    others.forEach((other) => {
      console.log(this.pos.dist(other.pos));
      if (this.pos.dist(other.pos) < 5 * 2) {
        const force = Vector2d.sub(this.pos, other.pos).mult(1000);
        // const force = Vector2d.mult(forceDir, this.attractionForce + other.attractionForce);
        this.acc.add(force).limit(0.01);
      } else {
        const force = Vector2d.sub(other.pos, this.pos);
        console.log(force);
        // const force = Vector2d.mult(forceDir, 1);
        this.acc.add(force).limit(0.05);
      }
    });
  }
}

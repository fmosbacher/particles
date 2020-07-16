import Vector2d from './vector2d.js';

export default class Particle {
  constructor(screen) {
    this.pos = new Vector2d(
      Math.floor(Math.random() * screen.width),
      Math.floor(Math.random() * screen.height),
    );
    this.vel = new Vector2d(Math.random() * 2 - 1, Math.random() * 2 - 1);
    this.acc = new Vector2d();
    this.screen = screen;
    this.maxVel = 3;
    this.maxForce = 1;
    this.size = 2;
    this.type = Math.floor(Math.random() * 2);
    this.color = this.type === 0 ? '#f00' : '#00f';
  }

  move() {
    const friction = 0.3;

    this.vel.add(this.acc).limit(this.maxVel).mult(1 - friction);
    this.pos.add(this.vel);

    if (this.pos.x > this.screen.width + this.size / 2) {
      this.pos.x = -this.size / 2;
    } else if (this.pos.x < -this.size / 2) {
      this.pos.x = this.screen.width + this.size / 2;
    }

    if (this.pos.y > this.screen.height + this.size / 2) {
      this.pos.y = -this.size / 2;
    } else if (this.pos.y < -this.size / 2) {
      this.pos.y = this.screen.height + this.size / 2;
    }
  }

  group(others) {
    const sumPos = new Vector2d();

    others.forEach((other) => {
      sumPos.add(other.pos);
    });

    const avgPos = sumPos.div(others.length);
    const desiredVel = avgPos.sub(this.pos).setMag(this.maxVel);
    const steeringForce = desiredVel.sub(this.vel).limit(this.maxForce);

    return steeringForce;
  }

  separate(others) {
    const sumVel = new Vector2d();

    others.forEach((other) => {
      const dist = this.pos.dist(other.pos);
      const desiredVel = Vector2d.sub(this.pos, other.pos).normalize().div(dist ** 2);
      sumVel.add(desiredVel);
    });

    sumVel.setMag(this.maxVel);
    const steeringForce = Vector2d.sub(sumVel, this.vel).limit(this.maxForce);

    return steeringForce;
  }

  align(others) {
    const sumVel = new Vector2d();

    others.forEach((other) => {
      sumVel.add(other.vel);
    });

    const avgVel = sumVel.div(others.length);
    const desiredVel = avgVel.setMag(this.maxVel);
    const steeringForce = Vector2d.sub(desiredVel, this.vel).limit(this.maxForce);

    return steeringForce;
  }

  flock(others) {
    const closeParticles = others.filter((other) => this.pos.dist(other.pos) < 100);

    if (closeParticles.length > 0) {
      this.acc
        .add(this.group(closeParticles).mult(1))
        .add(this.separate(closeParticles).mult(1))
        .add(this.align(closeParticles).mult(1));
    }
  }

  interact(others) {
    others
      .filter((other) => this.pos.dist(other.pos) < 40)
      .forEach((other) => {
        const desiredVelAttraction = Vector2d.sub(other.pos, this.pos).setMag(this.maxVel);
        // const desiredVelAttraction = other.type === this.type
        //   ? Vector2d.sub(other.pos, this.pos)
        //   : Vector2d.sub(this.pos, other.pos);

        const dist = this.pos.dist(other.pos);
        const desiredVelRepulsion = Vector2d.sub(this.pos, other.pos).setMag(this.maxVel).div(dist);

        const steeringForce = desiredVelAttraction
          .add(desiredVelRepulsion)
          .sub(this.vel)
          .limit(0.005);

        this.acc.add(steeringForce);
      });
  }
}

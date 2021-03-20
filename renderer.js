import Vector2d from './vector2d.js';

export default class Renderer {
  constructor(ctx, universe, backgroundColor) {
    this.ctx = ctx;
    this.universe = universe;
    this.backgroundColor = backgroundColor;
  }

  clearBackground() {
    const { width, height } = this.universe.size;
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, width, height);
  }

  drawCircle({ x, y }, color, radius) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  // drawTriangle(pos, color, radius, vel) {
  //   this.ctx.beginPath();

  //   const velDir = new Vector2d(vel.x, vel.y).normalize();
  //   const { x: ax, y: ay } = Vector2d.add(pos, Vector2d.mult(velDir, radius * 5));
  //   this.ctx.moveTo(ax, ay);

  //   const { x: bx, y: by } = Vector2d.sub(pos, Vector2d.mult(velDir, radius)).rotate(-Math.PI / 6);
  //   this.ctx.lineTo(bx, by);
  //   const { x: cx, y: cy } = Vector2d.sub(pos, Vector2d.mult(velDir, radius)).rotate(Math.PI / 6);
  //   this.ctx.lineTo(cx, cy);

  //   this.ctx.fillStyle = color;
  //   this.ctx.fill();
  // }

  draw() {
    this.clearBackground();
    this.universe.particles.forEach((particle) => {
      const color = this.universe.colorMap[particle.species];
      this.drawCircle(particle.pos, color, particle.radius);
      // this.drawTriangle(particle.pos, color, particle.radius, particle.vel);
    });
  }
}

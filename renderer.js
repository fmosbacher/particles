export default class Renderer {
  constructor(ctx, universe) {
    this.ctx = ctx;
    this.universe = universe;
  }

  clearBackground(color) {
    const { width, height } = this.universe.size;

    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, width, height);
  }

  drawCircle({ x, y }, color, radius) {
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  draw() {
    this.clearBackground('#fff');

    this.universe.particles.forEach((particle) => {
      const color = this.universe.colorMap[particle.species];
      this.drawCircle(particle.pos, color, particle.radius);
    });
  }
}

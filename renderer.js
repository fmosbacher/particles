export default class Renderer {
  constructor(canvas, particles = []) {
    this.canvas = canvas;
    this.particles = particles;
    this.ctx = canvas.getContext('2d');
    this.screen = {
      width: canvas.width,
      height: canvas.height,
    };
  }

  addParticle(particle) {
    this.particles.push(particle);
  }

  draw() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.screen.width, this.screen.height);

    this.particles.forEach((particle) => {
      const { x, y } = particle.pos;

      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, particle.size, particle.size, 0, 0, 2 * Math.PI);
      this.ctx.fill();
    });
  }
}

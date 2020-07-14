import Particle from './particle.js';
import Renderer from './renderer.js';

const canvas = document.querySelector('canvas');
const screen = {
  width: canvas.width,
  height: canvas.height,
};

const renderer = new Renderer(canvas);

const particles = [];

for (let i = 0; i < 2; i += 1) {
  const particle = new Particle(screen);
  particles.push(particle);
  renderer.addParticle(particle);
}

const run = () => {
  particles.forEach((particle) => {
    const others = particles.filter((other) => other !== particle);
    particle.interact(others);
    particle.move();
  });

  renderer.draw();

  requestAnimationFrame(run);
};

run();

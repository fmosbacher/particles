import Renderer from './renderer.js';
import Universe from './universe.js';
import Particle from './particle.js';
import Vector2d from './vector2d.js';

// Canvas configs
const canvas = document.querySelector('canvas');
const context2d = canvas.getContext('2d');
const screen = {
  width: canvas.width,
  height: canvas.height,
};

// Environment configs
const numParticles = 2;
const numSpecies = 2;

const universe = new Universe(screen, numSpecies);
const renderer = new Renderer(context2d, universe);

const particles = Array.from(
  { length: numParticles },
  () => {
    const species = Math.floor(Math.random() * numSpecies);
    const initialPos = new Vector2d(
      Math.random() * screen.width,
      Math.random() * screen.height,
    );
    return new Particle(initialPos, species);
  },
);

particles.forEach((particle) => universe.addParticle(particle));

const run = () => {
  universe.step();
  renderer.draw();
  requestAnimationFrame(run);
};

run();

document.addEventListener('click', run);

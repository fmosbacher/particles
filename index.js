import Renderer from './renderer.js';
import Universe from './universe.js';
import Particle from './particle.js';
import Vector2d from './vector2d.js';
import { random } from './utils.js';

// Canvas configs
const canvas = document.querySelector('canvas');
const context2d = canvas.getContext('2d');
const screen = { width: canvas.width, height: canvas.height };

// Environment configs
const numParticles = 1100;
const particleRadius = 2;
const spawningAreaInPercent = 0.6;
const universeParams = {
  numSpecies: 5,
  attractionRadiusRange: {
    min: [7 * particleRadius, 14 * particleRadius],
    max: [15 * particleRadius, 50 * particleRadius],
  },
  friction: 0.8,
  maxAttraction: 12,
};

const universe = new Universe(screen, universeParams);
const renderer = new Renderer(context2d, universe, '#000');

const particles = Array.from(
  { length: numParticles },
  () => {
    const species = Math.floor(random(universeParams.numSpecies));
    const initialPos = new Vector2d(
      random(
        screen.width / 2 - (spawningAreaInPercent / 2) * screen.width,
        screen.width / 2 + (spawningAreaInPercent / 2) * screen.width,
      ),
      random(
        screen.height / 2 - (spawningAreaInPercent / 2) * screen.height,
        screen.height / 2 + (spawningAreaInPercent / 2) * screen.height,
      ),
    );
    return new Particle(initialPos, particleRadius, species);
  },
);

particles.forEach((particle) => universe.addParticle(particle));

const run = () => {
  universe.step();
  renderer.draw();
  requestAnimationFrame(run);
};

run();

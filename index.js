import Renderer from './renderer.js';
import Universe from './universe.js';
import Particle from './particle.js';
import Vector2d from './vector2d.js';
import { random, randomGaussian } from './utils.js';

// Canvas configs
const canvas = document.querySelector('canvas');
const context2d = canvas.getContext('2d');
const screen = { width: canvas.width, height: canvas.height };

// Environment configs
const numParticles = 15000;
const particleRadius = 2;
const spawningAreaInPercent = 0.7;
const universeParams = {
  numSpecies: 4,
  attractionRadiusRange: {
    min: [6 * particleRadius, 8 * particleRadius],
    max: [8 * particleRadius, 20 * particleRadius],
  },
  friction: 1,
  maxAttraction: 1,
};

const universe = new Universe(screen, universeParams);
const renderer = new Renderer(context2d, universe, 'rgba(0, 0, 0, 1)');

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

// User interactions

let selectedSpeciesToAdd = 0;

canvas.addEventListener('mousedown', (event) => {
  if (selectedSpeciesToAdd !== undefined) {
    const { offsetX, offsetY } = event;
    for (let i = 0; i < 10; i += 1) {
      const pos = new Vector2d(offsetX + randomGaussian(-20, 20),
        offsetY + randomGaussian(-20, 20));
      const particle = new Particle(pos, particleRadius, selectedSpeciesToAdd);
      universe.addParticle(particle);
    }
  }
});

document.addEventListener('keydown', (event) => {
  const species = parseInt(event.code.replace('Digit', ''), 10) - 1;
  console.log(species);
  if (species >= 0 && species <= universeParams.numSpecies) {
    selectedSpeciesToAdd = species;
  }
});

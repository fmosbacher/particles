import Vector2d from './vector2d.js';
import { random, randomGaussian } from './utils.js';

export default class Universe {
  constructor(
    screen,
    {
      numSpecies,
      attractionRadiusRange,
      friction,
      maxAttraction,
    },
  ) {
    this.size = screen;
    this.particles = [];
    this.numSpecies = numSpecies;
    this.friction = friction;
    this.attractionRadiusRange = attractionRadiusRange;
    this.maxAttraction = maxAttraction;

    // Mapping for species interactions
    this.attractionMap = this.generateAttractionMap();
    console.log(this.attractionMap);
    this.colorMap = this.generateColorMap();
    const [minLower, minUpper] = this.attractionRadiusRange.min;
    this.minRadiusMap = this.generateRadiusMap(minLower, minUpper);
    const [maxLower, maxUpper] = this.attractionRadiusRange.max;
    this.maxRadiusMap = this.generateRadiusMap(maxLower, maxUpper);
  }

  addParticle(particle) {
    this.particles.push(particle);
  }

  // TODO: Separate into smaller functions
  step() {
    this.particles.forEach((particle) => {
      const totalForce = new Vector2d();

      this.particles.forEach((other) => {
        if (other !== particle) {
          const forceDir = Vector2d.sub(other.pos, particle.pos).normalize();
          const dist = particle.pos.dist(other.pos);
          const minRadius = this.minRadiusMap[particle.species][other.species];
          const maxRadius = this.maxRadiusMap[particle.species][other.species];

          let attractionMag = 0;

          if (dist < minRadius) {
            const smooth = 1;
            attractionMag = smooth * minRadius * (1 / (minRadius + smooth) - 1 / (dist + smooth));
          } else if (dist < maxRadius) {
            const numer = 2 * Math.abs(dist - (maxRadius + minRadius) / 2);
            const denom = maxRadius - minRadius;
            const interactionForce = this.attractionMap[particle.species][other.species];
            attractionMag = interactionForce * (1 - numer / denom);
          }

          totalForce.add(forceDir.mult(attractionMag));
        }
      });

      particle.move(totalForce, this.friction);
      particle.wrapPos(this.size);
    });
  }

  generateAttractionMap() {
    const map = [];

    for (let i = 0; i < this.numSpecies; i += 1) {
      map[i] = [];

      for (let j = 0; j < this.numSpecies; j += 1) {
        const isSameSpecies = i === j;

        // map[i][j] = randomGaussian(-this.maxAttraction, this.maxAttraction);

        if (isSameSpecies) map[i][j] = randomGaussian(0, this.maxAttraction);
        else map[i][j] = randomGaussian(-this.maxAttraction, this.maxAttraction);
      }
    }

    return map;
  }

  generateColorMap() {
    const colors = [];
    const hueDistance = 360 / this.numSpecies;

    for (let i = 0; i < this.numSpecies; i += 1) {
      colors.push(`hsla(${i * hueDistance}, 100%, 50%, 70%)`);
    }

    return colors;
  }

  generateRadiusMap(lower, upper) {
    const map = [];

    for (let i = 0; i < this.numSpecies; i += 1) {
      map[i] = [];

      for (let j = 0; j < this.numSpecies; j += 1) {
        const interactionIsMapped = map[j] !== undefined && map[j][i] !== undefined;

        if (interactionIsMapped) map[i][j] = map[j][i];
        else map[i].push(random(lower, upper));
      }
    }

    return map;
  }
}

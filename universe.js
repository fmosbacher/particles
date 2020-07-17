import Vector2d from './vector2d.js';

export default class Universe {
  constructor(screen, numSpecies, attractionRadiusRange) {
    this.size = screen;
    this.particles = [];
    this.numSpecies = numSpecies;
    this.friction = 0.15;
    this.attractionRadiusRange = attractionRadiusRange;

    // Mapping for species
    this.attractionMap = this.generateAttractionMap();
    this.colorMap = this.generateColorMap();
    this.minRadiusMap = this.generateMinRadiusMap();
    this.maxRadiusMap = this.generateMaxRadiusMap();
  }

  addParticle(particle) {
    this.particles.push(particle);
  }

  step() {
    this.particles.forEach((particle) => {
      const totalForce = new Vector2d();

      this.particles.forEach((other) => {
        if (other !== particle) {
          const dist = particle.pos.dist(other.pos);
          const minRadius = this.minRadiusMap[particle.species][other.species];
          const maxRadius = this.maxRadiusMap[particle.species][other.species];

          let attraction = 0;

          if (dist < minRadius && dist > 0.2) {
            // Forged random function to simulate repulsion
            const smooth = 2;
            attraction = smooth * minRadius * (1 / (minRadius + smooth) - 1 / (dist - smooth));
          } else if (dist < maxRadius) {
            attraction = this.attractionMap[particle.species][other.species] / (dist / 2);
          }

          const interactionForce = Vector2d
            .sub(other.pos, particle.pos)
            .normalize()
            .mult(attraction);

          totalForce.add(interactionForce);
        }
      });

      particle.move(totalForce, this.friction);
      // particle.wrapPos(this.size);
      particle.bounceOnWall(this.size);
    });
  }

  generateAttractionMap() {
    const map = [];

    for (let i = 0; i < this.numSpecies; i += 1) {
      map[i] = [];

      for (let j = 0; j < this.numSpecies; j += 1) {
        const isSameSpecies = i === j;

        if (isSameSpecies) {
          map[i][j] = Math.random();
        } else {
          map[i][j] = Math.random() * 2 - 1;
        }
      }
    }

    return map;
  }

  generateColorMap() {
    const colors = [];
    const hueDistance = 360 / this.numSpecies;

    for (let i = 0; i < this.numSpecies; i += 1) {
      colors.push(`hsl(${i * hueDistance}, 100%, 50%)`);
    }

    return colors;
  }

  generateMinRadiusMap() {
    const [lower, upper] = this.attractionRadiusRange.min;

    return Array.from(
      { length: this.numSpecies },
      () => Array.from(
        { length: this.numSpecies },
        () => Math.random() * (upper - lower) + lower,
      ),
    );
  }

  generateMaxRadiusMap() {
    const [lower, upper] = this.attractionRadiusRange.max;

    return Array.from(
      { length: this.numSpecies },
      () => Array.from(
        { length: this.numSpecies },
        () => Math.random() * (upper - lower) + lower,
      ),
    );
  }
}

import Vector2d from './vector2d.js';

export default class Universe {
  constructor(screen, numSpecies) {
    this.size = screen;
    this.particles = [];
    this.numSpecies = numSpecies;
    this.attractionRules = this.generateAttractionRules();
    this.colorRules = this.generateColorRules();
    this.friction = 0.1;
    this.maxVel = 1;
    this.maxForce = 0.05;
  }

  addParticle(particle) {
    this.particles.push(particle);
  }

  step() {
    this.particles.forEach((particle) => {
      const interactionForce = new Vector2d();

      this.particles.forEach((other) => {
        if (other !== particle) {
          const dist = particle.pos.dist(other.pos);
          let attraction = this.attractionRules[particle.species][other.species];

          if (dist < particle.visibleArea.minRadius) {
            attraction = Math.abs(attraction);
          } else if (dist > particle.visibleArea.maxRadius) {
            attraction = 0;
          }

          interactionForce.add(
            Vector2d
              .sub(other.pos, particle.pos)
              .normalize()
              .mult(attraction)
              .limit(this.maxForce),
          );
        }
      });

      particle.applyForce(interactionForce);
      particle.move(this.maxVel, this.friction);
      particle.wrapPos(this.size);
    });
  }

  generateAttractionRules() {
    const rules = [];

    for (let i = 0; i < this.numSpecies; i += 1) {
      rules[i] = [];

      for (let j = 0; j < this.numSpecies; j += 1) {
        const isSameSpecies = i === j;

        if (isSameSpecies) {
          rules[i][j] = -Math.random();
        } else {
          const ruleAlreadyExist = rules[j] !== undefined && rules[j][i] !== undefined;

          if (ruleAlreadyExist) {
            rules[i][j] = rules[j][i];
          } else {
            rules[i][j] = Math.random() * 2 - 1;
          }
        }
      }
    }

    return rules;
  }

  generateColorRules() {
    const colors = [];
    const hueDistance = 360 / this.numSpecies;

    for (let i = 0; i < this.numSpecies; i += 1) {
      colors.push(`hsl(${i * hueDistance}, 100%, 50%)`);
    }

    return colors;
  }
}

export default class Vector2d {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  static add(vector, other) {
    return new Vector2d(vector.x + other.x, vector.y + other.y);
  }

  sub(other) {
    return new Vector2d(this.x - other.x, this.y - other.y);
  }

  static sub(vector, other) {
    return new Vector2d(vector.x - other.x, vector.y - other.y);
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  static mult(vector, scalar) {
    return new Vector2d(vector.x * scalar, vector.y * scalar);
  }

  div(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  limit(max) {
    if (this.getMag() > max) return this.setMag(max);
    return this;
  }

  dist(other) {
    return Math.hypot(other.x - this.x, other.y - this.y);
  }

  normalize() {
    const mag = this.getMag();

    if (mag === 0) return new Vector2d();

    this.x /= mag;
    this.y /= mag;
    return this;
  }

  setMag(value) {
    this.normalize().mult(value);
    return this;
  }

  getMag() {
    return Math.hypot(this.x, this.y);
  }

  rotate(rad) {
    const { x, y } = this;
    this.x = x * Math.cos(rad) - y * Math.sin(rad);
    this.y = x * Math.sin(rad) + y * Math.cos(rad);
    return this;
  }
}

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

  static sub(vector, other) {
    return new Vector2d(vector.x - other.x, vector.y - other.y);
  }

  static mult(vector, scalar) {
    return new Vector2d(vector.x * scalar, vector.y * scalar);
  }

  mult(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  limit(max) {
    if (this.mag() > max) {
      this.normalize().mult(max);
    }
  }

  dist(other) {
    return Math.hypot(other.x - this.x, other.y - this.y);
  }

  normalize() {
    this.x /= this.mag();
    this.y /= this.mag();
    return this;
  }

  mag() {
    return Math.hypot(this.x, this.y);
  }
}

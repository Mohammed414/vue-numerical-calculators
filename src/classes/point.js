export default class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  get point() {
    return `(${this.x},${this.y})`;
  }
}

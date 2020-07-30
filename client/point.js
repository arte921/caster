class Point {
  constructor(x = Math.random() * 100, y = Math.random() * 100) { //for random map generation, reduce sphagetti
    this.x = x;
    this.y = y;
  }

  distanceto(other) {
    return Math.sqrt(
      Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
    );
  }
}

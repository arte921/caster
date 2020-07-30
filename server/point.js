module.exports = {
  Point: class {
    constructor(
      // for random map generation, reduce sphagetti
      // rounding because it's not really noticeably anyway, and significantly reduces network traffic
      x = Math.round(Math.random() * 100),
      y = Math.round(Math.random() * 100)
    ) {
      this.x = x;
      this.y = y;
    }

    distanceto(other) {
      return Math.sqrt(
        Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
      );
    }
  },
};

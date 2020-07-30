class Wall {
  constructor(
    pos1 = new Point(),
    pos2 = new Point(),
    color = "rgb(" +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      "," +
      Math.random() * 255 +
      ")"
  ) {
    this.pos1 = pos1;
    this.pos2 = pos2;
    this.x1 = pos1.x;
    this.y1 = pos1.y;
    this.x2 = pos2.x;
    this.y2 = pos2.y;
    this.color = color;
  }
}

class Ray {
  //pos1 = origin, pos2 on shield
  constructor(pos1, pos2) {
    this.pos1 = pos1;
    this.pos2 = pos2;
    this.x1 = pos1.x;
    this.y1 = pos1.y;
    this.x2 = pos2.x;
    this.y2 = pos2.y;
    this.bearing = Math.tan((pos2.x - pos1.x) / (pos2.y - pos1.y));
  }

  intersect(wall) {
    let denominator =
      (wall.x1 - wall.x2) * (this.y1 - this.y2) -
      (wall.y1 - wall.y2) * (this.x1 - this.x2);
    if (denominator == 0) return null;
    let t =
      ((wall.x1 - this.x1) * (this.y1 - this.y2) -
        (wall.y1 - this.y1) * (this.x1 - this.x2)) /
      denominator;

    //if(t >= 0 && t < 1 && (this.x1 - this.x2) * (this.x1 - wall.x1) > 0 && (this.y1 - this.y2) * (this.y1 - wall.y1) > 0){
    let int = new Point(
      wall.x1 + t * (wall.x2 - wall.x1),
      wall.y1 + t * (wall.y2 - wall.y1)
    );

    let xa = this.x1 - this.x2;
    let ya = this.y1 - this.y2;
    let xb = this.x1 - int.x;
    let yb = this.y1 - int.y;

    //console.log(ya/xa, yb/xb)
    //console.log(xa,ya,xb,yb)
    //console.log(Math.abs(Math.acos((xa*ya+xb*yb)/(Math.sqrt(Math.pow(xa,2)+Math.pow(ya,2))*Math.sqrt(Math.pow(xb,2)+Math.pow(yb,2))))))
    if (t >= 0 && t <= 1 && xa * xb > 0 && ya * ya > 0) return int;
    return null;
  }
}

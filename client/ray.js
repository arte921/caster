class Ray{
  //pos1 = origin, pos2 on shield
  constructor(pos1,pos2){
    this.pos1 = pos1
    this.pos2 = pos2
    this.x1 = pos1.x
    this.y1 = pos1.y
    this.x2 = pos2.x
    this.y2 = pos2.y
    this.bearing = Math.tan((pos2.x - pos1.x) / (pos2.y - pos1.y))
  }
}

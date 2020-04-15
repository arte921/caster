class Wall{
  constructor(pos1,pos2, color){
    this.pos1 = pos1
    this.pos2 = pos2
    this.x1 = pos1.x
    this.y1 = pos1.y
    this.x2 = pos2.x
    this.y2 = pos2.y
    this.color = color
  }

  intersect(ray){
    let denominator = (this.x1-this.x2)*(ray.y1-ray.y2)-(this.y1-this.y2)*(ray.x1-ray.x2)
    if(denominator == 0) return null
    let t = ((this.x1-ray.x1)*(ray.y1-ray.y2)-(this.y1-ray.y1)*(ray.x1-ray.x2))/denominator
    if(t >= 0 && t <= 1 && (ray.x1 - ray.x2) * (ray.x1 - this.x1) > 0 && (ray.y1 - ray.y2) * (ray.y1 - this.y1) > 0){
      player.minimap.drawline(ray.pos1,new Point(this.x1 + t * (this.x2-this.x1), this.y1 + t * (this.y2-this.y1)),"rgb(255,255,255)")
      //console.log(new Point(this.x1 + t * (this.x2-this.x1), this.y1 + t * (this.y2-this.y1)).distanceto(ray.pos1))
      return new Point(this.x1 + t * (this.x2-this.x1), this.y1 + t * (this.y2-this.y1)).distanceto(ray.pos1)
    }
    return null
  }
}

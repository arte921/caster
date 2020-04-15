class Wall{
  constructor(point1,point2, color){
    this.point1 = point1
    this.point2 = point2
    this.x1 = point1.x
    this.y1 = point1.y
    this.x2 = point2.x
    this.y2 = point2.y
    this.color = color
  }

  intersect(ray){
    let denominator = (this.x1-this.x2)*(ray.y1-ray.y2)-(this.y1-this.y2)*(ray.x1-ray.x2)
    if(denominator == 0) return null
    let t = ((this.x1-ray.x1)*(ray.y1-ray.y2)-(this.y1-ray.y1)*(ray.x1-ray.x2))/denominator
    if(t >= 0 && t <= 1 && (ray.x1 - ray.x2) * (ray.x1 - this.x1) > 0 && (ray.y1 - ray.y2) * (ray.y1 - this.y1) > 0){
      player.minimap.drawline(ray.point1,new Point(this.x1 + t * (this.x2-this.x1), this.y1 + t * (this.y2-this.y1)),"rgb(255,255,255)")
      //console.log(new Point(this.x1 + t * (this.x2-this.x1), this.y1 + t * (this.y2-this.y1)).distanceto(ray.point1))
      return new Point(this.x1 + t * (this.x2-this.x1), this.y1 + t * (this.y2-this.y1)).distanceto(ray.point1)
    }
    return null
  }
}

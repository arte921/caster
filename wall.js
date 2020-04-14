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
    let divider = (this.x1-this.x2)*(ray.y1-ray.y2)-(this.y1-this.y2)*(ray.x1-ray.x2)
    let t
    if(divider != 0){
      t = ((this.x1-ray.x1)*(ray.y1-ray.y2)-(this.y1-ray.y1)*(ray.x1-ray.x2))/divider
    }else return null
    if(t >= 0 && t <= 1){
      return new Point(this.x1 + t * (this.x2-this.x1), this.y1 + t * (this.y2-this.y1)).distanceto(ray.point1)
    }else return null
  }
}

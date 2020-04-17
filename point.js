class Point{
  constructor(x,y){
    this.x = x
    this.y = y
  }

  distanceto(other){
    return Math.sqrt(Math.pow(this.x-other.x,2)+Math.pow(this.y-other.y,2))
  }

  bearingto(other){
    return Math.atan((other.y - this.y) / (other.x - this.x))
  }
}

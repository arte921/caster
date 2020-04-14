class Shield{
  constructor(player){
    this.sidelength = Math.sqrt(1 + Math.pow(player.shieldwidth/2,2))
    this.bearing1 = (2 * Math.PI + player.bearing - player.fov / 2) % (2 * Math.PI)
    this.bearing2 = (2 * Math.PI + player.bearing + player.fov / 2) % (2 * Math.PI)

    this.x1 = player.pos.x + Math.cos(this.bearing1) * this.sidelength
    this.y1 = player.pos.y + Math.sin(this.bearing1) * this.sidelength
    this.x2 = player.pos.x + Math.cos(this.bearing2) * this.sidelength
    this.y2 = player.pos.y + Math.sin(this.bearing2) * this.sidelength

    this.point1 = new Point(this.x1,this.y1)
    this.point2 = new Point(this.x2,this.y2)
    this.dx = this.x2 - this.x1
    this.dy = this.y2 - this.y1
  }

  rayintersect(i,maxi){
    let x = this.x1 + i/maxi*this.dx
    let y = this.y1 + i/maxi*this.dy
    console.log(x)
    console.log(y)
    return new Point(x,y)
  }
}

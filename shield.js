class Shield{
  constructor(player){
    this.sidelength = Math.sqrt(1 + Math.pow(player.shieldwidth/2,2))
    //this.bearing1 = (2 * Math.PI + player.bearing - player.fov / 2) % (2 * Math.PI)
    //this.bearing2 = (2 * Math.PI + player.bearing + player.fov / 2) % (2 * Math.PI)
    this.bearing1 = player.bearing - player.fov / 2
    this.bearing2 = player.bearing + player.fov / 2

    this.x1 = player.pos.x + Math.cos(this.bearing1) * this.sidelength
    this.y1 = player.pos.y + Math.sin(this.bearing1) * this.sidelength
    this.x2 = player.pos.x + Math.cos(this.bearing2) * this.sidelength
    this.y2 = player.pos.y + Math.sin(this.bearing2) * this.sidelength

    //console.log(this.x1,this.y1,this.x2,this.y2)

    this.pos1 = new Point(this.x1,this.y1)
    this.pos2 = new Point(this.x2,this.y2)
    this.dx = this.x2 - this.x1
    this.dy = this.y2 - this.y1
  }

  rayintersect(i,maxi){
    let a = Math.cos(i/maxi * Math.PI - Math.PI) * maxi
    let x = this.x1 + a/maxi*this.dx
    let y = this.y1 + a/maxi*this.dy
    //console.log(x,y)
    return new Point(x,y)
  }
}

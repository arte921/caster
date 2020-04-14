class Player{
  constructor(pos, bearing, fov){ //bearing and fov in radians
    this.pos = pos
    this.bearing = bearing
    this.fov = fov
    this.shieldwidth = 2/(Math.tan(0.5*(Math.PI-fov)))
  }

  render(){
    let shield = new Shield(this)
    for(let i=0;i<mcbwidth;i++){
      let ray = new Ray(this.pos,shield.rayintersect(i,mcbwidth))
      let record = Infinity
      let recordcolor
      walls.forEach(wall => {
        let distance = wall.intersect(ray)
        if(distance != null && distance < record){
          record = distance
          recordcolor = wall.color
        }
      })
      if(record != Infinity){
        let wallheight = (mcbheight - record) * heightfactor
        ctx.fillStyle = recordcolor
        ctx.fillRect(i,mcbheight/2 - wallheight/2,1,wallheight)
      }
    }
  }
}

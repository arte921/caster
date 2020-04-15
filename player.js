class Player{
  constructor(pos, bearing, fov){ //bearing and fov in radians
    this.pos = pos
    this.bearing = bearing
    this.fov = fov

    this.shieldwidth = 2/(Math.tan(0.5*(Math.PI-fov)))
    this.minimap = new Minimap(0, 0, 200, 100, 100, walls) //minx, miny, xsize, scenewidth, sceneheight, walls
  }

  render(){
    let shield = new Shield(this)
    console.log(mcbwidth)
    for(let i=0;i<mcbwidth;i++){
      let ray = new Ray(this.pos,shield.rayintersect(i,mcbwidth))
      let record = Infinity
      let recordcolor
      walls.forEach(wall => {
        let distance = wall.intersect(ray)
        if(distance != null && distance < record){
          record = distance
          recordcolor = wall.color
          //console.log(record)
        }
      })
      if(record != Infinity){
        let wallheight = (mcbheight - record) * heightfactor
        ctx.fillStyle = recordcolor
        ctx.fillRect(i,mcbheight/2 - wallheight/2,1,wallheight)
      }
    }

    this.minimap.render(this.pos, shield)
  }
}

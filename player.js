class Player{
  constructor(pos, bearing, fov){ //bearing and fov in radians
    this.pos = pos
    this.bearing = bearing
    this.fov = fov

    this.shieldwidth = 2/(Math.tan(0.5*(Math.PI-fov)))
    this.minimap = new Minimap(0, 0, 800, 100, 100, walls) //minx, miny, xsize, scenewidth, sceneheight, walls
  }

  render(){
    let shield = new Shield(this)
    this.minimap.render(this.pos, shield)
    for(let i=0;i<mcbwidth;i++){
      let ray = new Ray(this.pos,shield.rayintersect(i,mcbwidth))
      //console.log(ray)
      let record, recordintersection
      let recorddistance = Infinity
      walls.forEach(wall => {
        let intersection = wall.intersect(ray)
        if(intersection != null){
          let distance = intersection.distanceto(this.pos)

          //console.log(distance)
          if(distance < recorddistance){
            record = wall
            recorddistance = distance
            recordintersection = intersection
          }
        }
      })

      if(recorddistance != Infinity){
        let wallheight = (mcbheight - recorddistance) * heightfactor
        this.minimap.drawline(this.pos,recordintersection,record.color)
        //console.log(record)
        ctx.fillStyle = record.color
        //ctx.fillRect(i,mcbheight/2 - wallheight/2, 1, wallheight)
      }
    }
  }
}

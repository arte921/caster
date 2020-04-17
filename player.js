class Player{
  constructor(pos, bearing, fov){ //bearing and fov in radians
    this.pos = pos
    this.bearing = bearing
    this.fov = fov
    this.speed = 1
    this.shieldwidth = 2/(Math.tan(0.5*(Math.PI-fov)))
    this.minimap = new Minimap(0, 0, 80, 100, 100, walls) //minx, miny, xsize, scenewidth, sceneheight, walls
  }

  move(dest){
    let canmove = true
    walls.forEach(wall => {
      let denominator = (this.x-dest.x)*(wall.y1-wall.y2)-(this.y-dest.y)*(wall.x1-wall.x2)
      if(denominator == 0) return null
      let t = ((this.x-wall.x1)*(wall.y1-wall.y2)-(this.y-wall.y1)*(wall.x1-wall.x2))/denominator
      let u = -((this.x-wall.x1)*(wall.y1-wall.y2)-(this.y-wall.y1)*(wall.x1-wall.x2))/denominator
      if(t >= 0 && t <= 1 && u >= 0 && u <= 1){
        canmove = false
        console.log("hi")
      }
    })
    if(canmove){
      this.pos = dest
    }
  }

  render(){
    ctx.clearRect(0,0,mcbwidth,mcbheight)
    let shield = new Shield(this)
    this.minimap.render(this.pos, shield)
    for(let i=0; i<mcbwidth; i++){
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
        //let wallheight = (mcbheight - Math.pow(recorddistance,-1)) * heightfactor
        let wallheight = Math.pow(recorddistance,-1) * 1000
        this.minimap.drawline(this.pos,recordintersection,record.color)
        //console.log(record)
        ctx.fillStyle = record.color
        ctx.fillRect(i,mcbheight/2 - wallheight/2, 1, wallheight)
      }
    }
  }
}

class Minimap{
  constructor(minx, miny, xsize, scenewidth, sceneheight, walls){
    this.xsize = xsize
    this.ysize = xsize/scenewidth*sceneheight
    this.minx = minx
    this.miny = miny
    this.maxx = minx + xsize
    this.maxy = miny + this.ysize
    this.scenewidth = scenewidth
    this.sceneheight = sceneheight
    this.walls = walls
  }

  render(playerpos, shield){
    ctx.fillStyle = bgcolor
    ctx.fillRect(this.minx, this.miny, this.xsize, this.ysize)
    this.walls.forEach(wall => {
      this.drawline(wall.pos1,wall.pos2,wall.color)
    })
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fillRect(this.xtopx(playerpos.x), this.ytopx(playerpos.y),1,1)
    //ctx.beginPath()

    //ctx.strokeStyle = "rgb(255,255,255)"
    /*
    ctx.moveTo(this.xtopx(player.pos.x + Math.cos(player.)), this.ytopx(player.pos.y))
    ctx.lineTo(this.xtopx(player.pos.x), this.ytopx(player.pos.y))
    ctx.stroke()*/

    this.drawline(shield.pos1,shield.pos2,"rgb(255,255,255)")
/*
    ctx.moveTo(this.xtopx(shield.x1),this.ytopx(shield.y1))
    ctx.lineTo(this.xtopx(shield.x2),this.ytopx(shield.y2))
    ctx.stroke()*/
  }

  xtopx(x){
    return this.minx + x / this.scenewidth * (this.maxx - this.minx)
  }

  ytopx(y){
    return this.miny + y / this.sceneheight * (this.maxy - this.miny)
  }

  drawline(pos1,pos2,color){
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.moveTo(this.xtopx(pos1.x), this.ytopx(pos1.y))
      ctx.lineTo(this.xtopx(pos2.x), this.ytopx(pos2.y))
      ctx.stroke()
  }
}

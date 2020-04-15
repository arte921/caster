class Minimap{
  constructor(minx, miny, xsize, scenewidth, sceneheight, walls){
    this.minx = minx
    this.miny = miny
    this.xsize = xsize
    this.ysize = xsize/scenewidth*sceneheight
    this.scenewidth = scenewidth
    this.sceneheight = sceneheight
    this.walls = walls
  }

  render(){
    ctx.fillStyle = bgcolor
    ctx.fillRect(this.minx, this.miny, this.xsize, this.ysize)
  }
}

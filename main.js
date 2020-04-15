var mcbwidth = window.innerWidth
var mcbheight = window.innerHeight
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = mcbwidth
canvas.height = mcbheight
var bgcolor = "#FFFFFF"

const heightfactor = 0.1

let fov = 70
let walls = []

walls.push(new Wall(new Point(0,0),new Point(0,100),"#FF0000"))
walls.push(new Wall(new Point(0,0),new Point(100,0),"#00FF00"))
walls.push(new Wall(new Point(100,100),new Point(0,100),"#0000FF"))
walls.push(new Wall(new Point(100,100),new Point(100,0),"#FF00FF"))

let player = new Player(new Point(50,50),0,fov/180*Math.PI)
let minimap = new Minimap(0, 0, 100, mcbwidth, mcbheight, walls)

player.render()
minimap.render()


let t0 = performance.now()
function drawframe(){
  let dt = performance.now() - t0
  t0 = performance.now()
  player.bearing += Math.PI*dt/5000
  ctx.clearRect(0,0,mcbwidth,mcbheight)
  player.render()
  window.requestAnimationFrame(drawframe)
}

window.requestAnimationFrame(drawframe)

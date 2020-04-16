var mcbwidth = window.innerWidth
var mcbheight = window.innerHeight
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = mcbwidth
canvas.height = mcbheight
var bgcolor = "#000000"

const heightfactor = 0.1

let fov = 90
var walls = []

for(let i = 0;i<0;i++){
  walls.push(new Wall(new Point(Math.random()*100,Math.random()*100),new Point(Math.random()*100,Math.random()*100),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
}
walls.push(new Wall(new Point(10,10),new Point(10,90),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
walls.push(new Wall(new Point(10,10),new Point(90,10),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
walls.push(new Wall(new Point(90,90),new Point(10,90),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
walls.push(new Wall(new Point(90,90),new Point(90,10),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))

let player = new Player(new Point(40,40),Math.PI * 1.3,fov/180*Math.PI)

let t0 = performance.now()
function drawframe(){
  let dt = performance.now() - t0
  t0 = performance.now()
  ctx.clearRect(0,0,mcbwidth,mcbheight)
  player.render()
  player.bearing += Math.PI*dt/5000


  window.requestAnimationFrame(drawframe)
}

window.requestAnimationFrame(drawframe)

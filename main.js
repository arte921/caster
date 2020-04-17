var mcbwidth = window.innerWidth
var mcbheight = window.innerHeight
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = mcbwidth
canvas.height = mcbheight
var bgcolor = "#000000"

const heightfactor = 0.1

let fov = 70
var walls = []

for(let i = 0;i<10;i++){
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
  player.render()
  document.getElementById("title").innerHTML = Math.round(1/(dt/1000)) + " fps"
  window.requestAnimationFrame(drawframe)
}

function mousemoved(e){
  player.bearing += Math.PI*e.movementX/mcbwidth
}

document.onkeypress = function(e){
  switch(e.key){
    case "w":
      player.move(new Point(player.pos.x + Math.cos(player.bearing) * player.speed, player.pos.y + Math.sin(player.bearing) * player.speed))
    break;
    case "s":
      player.move(new Point(player.pos.x - Math.cos(player.bearing) * player.speed, player.pos.y - Math.sin(player.bearing) * player.speed))

    break;
    case "a":
      player.move(new Point(player.pos.x - Math.cos(player.bearing + Math.PI / 2) * player.speed, player.pos.y - Math.sin(player.bearing + Math.PI / 2) * player.speed))

    break;
    case "d":
      player.move(new Point(player.pos.x += Math.cos(player.bearing + Math.PI / 2) * player.speed, player.pos.y += Math.sin(player.bearing + Math.PI / 2) * player.speed))
      //player.pos.y += Math.sin(player.bearing + Math.PI / 2) * player.speed
    break;

  }
}

canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock
canvas.onclick = () => {
  canvas.requestPointerLock()
}
document.addEventListener('pointerlockchange', lockChangeAlert, false)
document.addEventListener('mozpointerlockchange', lockChangeAlert, false)
function lockChangeAlert() {
  if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
    document.addEventListener("mousemove", mousemoved, false)
  } else {
    document.removeEventListener("mousemove", mousemoved, false)
  }
}

window.requestAnimationFrame(drawframe)

console.log(new Point(1,1).bearingto(new Point(2,2)))

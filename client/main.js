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
var otherplayers = []

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
  socket.send(JSON.stringify(new Wall(player.shield.pos1, player.shield.pos2, player.color)))
  //console.log(JSON.stringify(new Wall(player.shield.pos1, player.shield.pos2, player.color)))
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
      player.move(new Point(player.pos.x + Math.cos(player.bearing + Math.PI / 2) * player.speed, player.pos.y + Math.sin(player.bearing + Math.PI / 2) * player.speed))
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

var socket = new WebSocket("ws://localhost:8080")
socket.addEventListener("open", function(event){
  socket.send(JSON.stringify(new Wall(player.shield.pos1, player.shield.pos2, player.color)))
  console.log("connected")
})

socket.addEventListener("message", function (event) {
  //console.log(JSON.parse(event.data))
  let data = JSON.parse(event.data)
  if(data[0] == "map"){
    data.splice(0,1)
    walls = data
    console.log("map")
  }else{
    data.splice(0,1)
    //console.log(data)
    let otherplayers = []
    data.forEach(player => {
      otherplayers.push(player)
    })

    //console.log(otherplayers)
    otherplayers = otherplayers.map(aplayer => {
      //console.log(player["pos1"])
      //
      let tplayer = JSON.parse(aplayer)
      //console.log(tplayer.x1)
      return new Wall(new Point(tplayer.x1, tplayer.y1), new Point(tplayer.x2, tplayer.y2), tplayer.color)
    })
    //console.log(walls.concat(otherplayers))

    //otherplayers = data
  }
  //console.log("got data")
  //console.log(event.data)
  //console.log(walls)
})

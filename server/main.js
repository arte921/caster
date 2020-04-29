const WebSocket = require('ws')
const wss = new WebSocket.Server({port: 8080})
const { Wall } = require("./wall")
const { Point } = require("./point")

var walls = ["map"]

walls.push(new Wall(new Point(10,10),new Point(10,90),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
walls.push(new Wall(new Point(10,10),new Point(90,10),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
walls.push(new Wall(new Point(90,90),new Point(10,90),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
walls.push(new Wall(new Point(90,90),new Point(90,10),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))

for(let i = 0;i<10;i++){
  walls.push(new Wall(new Point(Math.random()*100,Math.random()*100),new Point(Math.random()*100,Math.random()*100),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
}

var players = new Map()

wss.on('connection', function connection(ws){
  const id = Math.random()
  ws.send(JSON.stringify(walls))

  console.log(id)
  ws.on('message', function incoming(message){

    players.set(id, message)

    let playerarray = ["playerupdate"]

    players.forEach(player => {
      playerarray.push(player)
    })

    wss.clients.forEach(function each(client){
      client.send(JSON.stringify(playerarray))
    })

  })
})

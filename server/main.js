const WebSocket = require('ws')
const wss = new WebSocket.Server({port: 8080})
const { Wall } = require("./wall")
const { Point } = require("./point")

var walls = []

walls.push(new Wall(new Point(10,10),new Point(10,90),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
walls.push(new Wall(new Point(10,10),new Point(90,10),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
walls.push(new Wall(new Point(90,90),new Point(10,90),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
walls.push(new Wall(new Point(90,90),new Point(90,10),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))

for(let i = 0;i<10;i++){
  walls.push(new Wall(new Point(Math.random()*100,Math.random()*100),new Point(Math.random()*100,Math.random()*100),"rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"))
}

var players = []

wss.on('connection', function connection(ws){
  const id = Math.random()
  ws.on('message', function incoming(message){
    players[id] = JSON.parse(message.data)
    console.log(players)
    ws.send(JSON.stringify(walls))
  })
})

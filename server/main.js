const WebSocket = require('ws')
const wss = new WebSocket.Server({port: 30000})
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
	ws.clientid = id

	//console.log(id)
	ws.on('message', message => {

		players.set(id, message)

		//console.log(ws.clientid)

		wss.clients.forEach(client => {
			if(client.clientid != id){
				let playerarray = ["playerupdate"]

				players.forEach((player, playerid) => {
					console.log(playerid, client.clientid, playerid != client.clientid)
					if(playerid != client.clientid){

						playerarray.push(player)
						console.log(playerid, id)
					}

					//console.log(playerid, id)

				})

				console.log(playerarray.length - 1)

				client.send(JSON.stringify(playerarray))

			}
		})

	})

	ws.on('close', () => {
		players.delete(ws.playerid)
	})
})

//TODO: pinging?

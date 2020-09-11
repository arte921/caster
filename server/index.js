const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 30000 });
const { Wall } = require("./wall");
const { Point } = require("./point");

let walls = [];

walls.push(new Wall(new Point(10, 10), new Point(10, 90)));
walls.push(new Wall(new Point(10, 10), new Point(90, 10)));
walls.push(new Wall(new Point(90, 90), new Point(10, 90)));
walls.push(new Wall(new Point(90, 90), new Point(90, 10)));

for (let i = 0; i < 10; i++) walls.push(new Wall());

let players = new Map();

function send(data, type, ws) {
    const object = {
        type:type,
        data:data
    };

    console.log(object);

    ws.send(JSON.stringify(object));
}

wss.on("connection", function connection(ws) {
    const id = Math.random();
    send(walls, "map", ws);
    ws.clientid = id;

    //console.log(id)
    ws.on("message", (message) => {
        players.set(id, message);

        //console.log(ws.clientid)

        wss.clients.filter(client.clientid != id).forEach((client) => {
            let playerarray = [];
            
            players.forEach((player, playerid) => {
                console.log(
                    playerid,
                    client.clientid,
                    playerid != client.clientid
                );
                
                if (playerid != client.clientid) {
                    playerarray.push(player);
                    console.log(playerid, id);
                }
            });

            console.log(playerarray.length - 1);

            send(playerarray, "playerupdate", client);
            
        });
    });

    ws.on("close", () => players.delete(ws.playerid));
});

//TODO: pinging

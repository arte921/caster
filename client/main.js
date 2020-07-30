var mcbwidth = window.innerWidth;
var mcbheight = window.innerHeight;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = mcbwidth;
canvas.height = mcbheight;
var bgcolor = "#000000";

const heightfactor = 0.1;
const fov = 70;
const networkprecision = 2;

let walls = [];

walls.push(new Wall(new Point(10, 10), new Point(10, 90)));
walls.push(new Wall(new Point(10, 10), new Point(90, 10)));
walls.push(new Wall(new Point(90, 90), new Point(10, 90)));
walls.push(new Wall(new Point(90, 90), new Point(90, 10)));

for (let i = 0; i < 10; i++) {
    walls.push(new Wall());
}

let otherplayers = [];

let player = new Player(
    new Point(40, 40),
    Math.PI * 1.3,
    (fov / 180) * Math.PI
);

let t0 = performance.now();
function drawframe() {
    let dt = performance.now() - t0;
    t0 = performance.now();
    player.render();

    let fps = Math.round(1 / (dt / 1000));
    document.getElementById("title").innerHTML = fps + " fps";

    window.requestAnimationFrame(drawframe);
}

function mousemoved(e) {
    player.bearing += (Math.PI * e.movementX) / mcbwidth;
    socket.send(
        JSON.stringify(
            new Wall(
                player.shield.pos1.rounded(networkprecision),
                player.shield.pos2.rounded(networkprecision),
                player.color
            ) // round to reduce network traffic
        )
    );
    //console.log(JSON.stringify(new Wall(player.shield.pos1, player.shield.pos2, player.color)))
}

document.onkeypress = function (e) {
    const wsmod = new Point(
        Math.cos(player.bearing) * player.speed,
        Math.sin(player.bearing) * player.speed
    );

    const admod = new Point(
        Math.cos(player.bearing + Math.PI / 2) * player.speed,
        Math.sin(player.bearing + Math.PI / 2) * player.speed
    );
    
    console.log(e.key);

    switch (e.key) {
        case "w":
            player.move(wsmod, true);
            break;
        case "s":
            player.move(wsmod.timesnumber(-1), true);
            break;
        case "d":
            player.move(admod, true);
            break;
        case "a":
            player.move(admod.timesnumber(-1), true);
            break;
    }
};

canvas.requestPointerLock =
    canvas.requestPointerLock || canvas.mozRequestPointerLock;
document.exitPointerLock =
    document.exitPointerLock || document.mozExitPointerLock;

canvas.onclick = () => {
    canvas.requestPointerLock();
};

document.addEventListener("pointerlockchange", lockChangeAlert, false);
document.addEventListener("mozpointerlockchange", lockChangeAlert, false);

function lockChangeAlert() {
    if (
        document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas
    ) {
        document.addEventListener("mousemove", mousemoved, false);
    } else {
        document.removeEventListener("mousemove", mousemoved, false);
    }
}

window.requestAnimationFrame(drawframe);

var socket = new WebSocket("ws://arte921.duckdns.org:30000/");

socket.addEventListener("open", function (event) {
    socket.send(
        JSON.stringify(
            new Wall(player.shield.pos1, player.shield.pos2, player.color)
        )
    );
    console.log("connected");
});

socket.addEventListener("message", function (event) {
    //console.log(JSON.parse(event.data))
    let data = JSON.parse(event.data);

    if (data.type == "map") {
        walls = data.data;
        console.log("recieved map");
    } else {
        otherplayers = [];
        data.data.forEach((player) => {
            otherplayers.push(player);
        });

        //console.log(otherplayers)
        otherplayers = otherplayers.map((aplayer) => {
            //console.log(player["pos1"])
            //
            return JSON.parse(aplayer);
            //console.log(tplayer.x1)
            //return new Wall(new Point(tplayer.x1, tplayer.y1), new Point(tplayer.x2, tplayer.y2), tplayer.color)
        });
        //console.log(walls)
        //console.log(otherplayers)

        //otherplayers = data
    }
    console.log("got data");
    console.log(event.data);
    //console.log(walls)
});

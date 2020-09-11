const mcbwidth = window.innerWidth;
const mcbheight = window.innerHeight;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = mcbwidth;
canvas.height = mcbheight;
const bgcolor = "#000000";

const heightfactor = 0.1;
const fov = 70;
const networkprecision = 2;

let walls = [];

walls.push(new Wall(new Point(10, 10), new Point(10, 90)));
walls.push(new Wall(new Point(10, 10), new Point(90, 10)));
walls.push(new Wall(new Point(90, 90), new Point(10, 90)));
walls.push(new Wall(new Point(90, 90), new Point(90, 10)));

for (let i = 0; i < 10; i++) walls.push(new Wall());

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

canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

canvas.onclick = () => canvas.requestPointerLock();

const lockChangeAlert = () => {
    if (
        document.pointerLockElement === canvas ||
        document.mozPointerLockElement === canvas
    ) document.addEventListener("mousemove", mousemoved, false);
    else document.removeEventListener("mousemove", mousemoved, false);
}

document.addEventListener("pointerlockchange", lockChangeAlert, false);
document.addEventListener("mozpointerlockchange", lockChangeAlert, false);



window.requestAnimationFrame(drawframe);

const socket = new WebSocket("ws://arte921.duckdns.org:30000/");

socket.addEventListener("open", (event) => {
    socket.send(
        JSON.stringify(
            new Wall(player.shield.pos1, player.shield.pos2, player.color)
        )
    );
    console.log("connected");
});

socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);

    if (data.type == "map") {
        walls = data.data;
        console.log("recieved map");
    } else {
        otherplayers = [];
        data.data.forEach(player => otherplayers.push(player));
        otherplayers = otherplayers.map(JSON.parse);
    }

    console.log("got data");
    console.log(event.data);
});

class Player {
    constructor(pos, bearing, fov) {
        //bearing and fov in radians
        this.pos = pos;
        this.bearing = bearing;
        this.fov = fov;
        this.speed = 1;
        this.shieldwidth = 2 / Math.tan(0.5 * (Math.PI - fov));
        this.minimap = new Minimap(0, 0, 80, 100, 100, walls); //minx, miny, xsize, scenewidth, sceneheight, walls
        this.shield = new Shield(this);
        this.color = randomcolor();
    }

    move(rawdest, relative = false) {
        let dest = relative ? this.pos.plus(rawdest) : rawdest;
        let canmove = true;
        walls.forEach(wall => {
            let denominator =
                (this.pos.x - dest.x) * (wall.y1 - wall.y2) -
                (this.pos.y - dest.y) * (wall.x1 - wall.x2);

            let t =
                ((this.pos.x - wall.x1) * (wall.y1 - wall.y2) -
                (this.pos.y - wall.y1) * (wall.x1 - wall.x2)) /
                denominator;
                
            let u = -(
                    (this.pos.x - dest.x) * (this.pos.y - wall.y1) -
                    (this.pos.y - dest.y) * (this.pos.x - wall.x1)
                ) / denominator;
                
            if (t >= 0 && t <= 1 && u >= 0 && u <= 1) canmove = false;
        });
        if (canmove) this.pos = dest;

        socket.send(
            JSON.stringify(
                new Wall(this.shield.pos1.rounded(networkprecision), this.shield.pos2.rounded(networkprecision), this.color)
            )
        );
    }

    render() {
        ctx.clearRect(0, 0, mcbwidth, mcbheight);
        this.shield = new Shield(this);
        this.minimap.render(this.pos, this.shield);
        
        for (let i = 0; i < mcbwidth; i++) {
            let ray = new Ray(this.pos, this.shield.rayintersect(i, mcbwidth));
            let record, recordintersection;
            let recorddistance = Infinity;

            let scene = walls.concat(otherplayers);

            scene.forEach((wall) => {
                let intersection = ray.intersect(wall);
                if (intersection != null) {
                    let distance = intersection.distanceto(this.pos);
                    if (distance < recorddistance) {
                        record = wall;
                        recorddistance = distance;
                        recordintersection = intersection;
                    }
                }
            });

            if (recorddistance != Infinity) {
                let wallheight = Math.pow(recorddistance, -1) * 1000;
                this.minimap.drawline(
                    this.pos,
                    recordintersection,
                    record.color
                );
                
                ctx.fillStyle = record.color;
                ctx.fillRect(i, mcbheight / 2 - wallheight / 2, 1, wallheight);
            }
        }
    }
}

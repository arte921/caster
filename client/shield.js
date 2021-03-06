class Shield {
    constructor(player) {
        this.sidelength = Math.sqrt(1 + Math.pow(player.shieldwidth / 2, 2));

        this.fov = player.fov;
        this.bearing1 = player.bearing - player.fov / 2;
        this.bearing2 = player.bearing + player.fov / 2;
        this.playerpos = player.pos;

        this.x1 = player.pos.x + Math.cos(this.bearing1) * this.sidelength;
        this.y1 = player.pos.y + Math.sin(this.bearing1) * this.sidelength;
        this.x2 = player.pos.x + Math.cos(this.bearing2) * this.sidelength;
        this.y2 = player.pos.y + Math.sin(this.bearing2) * this.sidelength;

        this.pos1 = new Point(this.x1, this.y1);
        this.pos2 = new Point(this.x2, this.y2);
        this.dx = this.x2 - this.x1;
        this.dy = this.y2 - this.y1;
    }

    // what part of the shield
    rayintersect(i, maxi) {
        let a = this.bearing1 + (i / maxi) * this.fov;
        let x = this.playerpos.x + Math.cos(a);
        let y = this.playerpos.y + Math.sin(a);
        //console.log(x,y)
        return new Point(x, y);
    }
}

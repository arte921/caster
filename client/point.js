class Point {
    constructor(x = Math.random() * 100, y = Math.random() * 100) {
        //for random map generation, reduce sphagetti
        this.x = x;
        this.y = y;
    }

    distanceto(other) {
        return Math.sqrt(
            Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)
        );
    }

    rounded(decimals) {
        return new Point(round(this.x, decimals), round(this.y, decimals));
    }

    plus(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }

    timesnumber(number) {
        return new Point(this.x * number, this.y * number);
    }
}

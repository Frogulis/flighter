function Colour(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.getHex = function()
    {
        return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }
}
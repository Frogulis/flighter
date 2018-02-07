function Rule() {
    if (options.param === undefined) options.param = "";
    if (options.colour === undefined) options.colour = new Colour(255, 255, 255);
    this.param = "";
    this.colour = new Colour(255, 255, 255);
}

function FindRule() {
    Rule.call(this);
    
}

/*** Simple colour object. Use the factory. ***/
function Colour(r, g, b) {
    function cap(num)
    {
        return num > 255 ? 255 : num;
    }
    this.r = cap(r);
    this.g = cap(g);
    this.b = cap(b);
}

Colour.prototype = {
    getHex: function()
    {
        function toTwo(str)
        {
            if (str.length == 1)
            {
                return "0" + str;
            }
            else {
                return str;
            }
        }
        return "#" + toTwo(this.r.toString(16)) +
                     toTwo(this.g.toString(16)) +
                     toTwo(this.b.toString(16));
    }
};

//factory

function getColour(r, g, b)
{
    return new Colour(r, g, b);
}

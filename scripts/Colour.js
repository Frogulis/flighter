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
    setHSL: function(h, s, l)
    {
        var colours = this._hslToRgb(h, s, l);
        this.r = colours[0];
        this.g = colours[1];
        this.b = colours[2];
    },
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
    },
    _hslToRgb: function(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            var hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }
};

//factory

function getColour(r, g, b)
{
    return new Colour(r, g, b);
}

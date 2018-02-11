function Rule(options) {
    if (options.param === undefined) options.param = "";
    if (options.colour === undefined) options.colour = getColour(200, 200, 200);
    this.param = options.param;
    this.colour = options.colour;
    this.post_class = getPostClass(); //expand this function if needed
}

Rule.prototype = {
    applyRule: function()
    {
        if (!this.func || !this.param || !this.colour) {
            return;
        }
        var filtered_divs = Array.from(this.func());
        filtered_divs.forEach((el) => {
            if (el != undefined) {
                while (el.className != this.post_class && el.parentNode) { // post_class == "_3ccb" as of writing
                    el = el.parentNode;
                }
                if (el.style) {
                    el.setAttribute('coloured', 'true');
                    el.style.backgroundColor = this.colour;
                }
            }
        });
    },
    func: null
};

function FindRule(options) {
    Rule.call(this, options);
}

FindRule.prototype = Object.create(Rule.prototype, {
    func: function()
    {
        function getSmallestDivsIncludes(el, my_string)
        {
            if (el.hasChildNodes()) {
                if (el.className == this.post_class && el.getAttribute('coloured') == 'true') { //if already coloured, no need to go further.
                    return [];
                }
                var children = Array.from(el.children);
                var filtered = children.filter(e => e.innerHTML.includes(my_string)); //get children that contain the string somewhere
                if (filtered.length > 0) {
                    //console.log("<<" + el.innerHTML);
                    var result = [];
                    for (var i = 0; i < filtered.length; i++) {
                        var mres = getSmallestDivsIncludes(filtered[i], my_string);
                        result = result.concat(mres);
                    }
                    return result;
                }
                else { //we're at the bottom level
                    //console.log(">>" + el.innerHTML);
                    if (el.tagName == "P") {
                        return [el];
                    }
                    else {
                        return [];
                    }
                }
            }
            else {
                return [el];
            }
        }
        return getSmallestDivsIncludes(document.getElementById("contentArea"), this.param);
    }
};

function getRule(type, options)
{
    if (type == "find") {
        return new FindRule(options);
    }
    else {
        return new Rule(options);
    }
}

function getPostClass()
{
    return "_3ccb";
}

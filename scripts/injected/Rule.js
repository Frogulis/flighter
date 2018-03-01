/*** A Rule is the concrete implementation of a colouring rule that is injected into
 *** the page. This class and its descendants are not used by the popup directly.
 ***/
function Rule(options) {
    if (options.param === undefined) options.param = "";
    if (options.colour === undefined) options.colour = new PageColour(200, 200, 200);
    this.param = options.param;
    this.colour = options.colour;
    this.post_class = getPostClass(); //expand this function if needed
}

Rule.prototype = {
    applyRule: function()
    {
        if (!this.func || !this.param || !this.colour) {
            console.log('!');
            return;
        }
        var filtered_divs = Array.from(this.func());
        if (filtered_divs.length == 0) {
            return;
        }
        filtered_divs.forEach((el) => {
            if (el != undefined) {
                while (el.className != this.post_class && el.parentNode) { // post_class == "_3ccb" as of writing
                    el = el.parentNode;
                }
                if (el.style) {
                    el.setAttribute('coloured', 'true');
                    el.style.backgroundColor = this.colour.getHex();
                }
            }
        });
    },
    func: function()
    {
        console.log("calling default func");
    }
};

/*** The rule that colours posts containing the given string parameter ***/
function FindRule(options) {
    Rule.call(this, options);
}

FindRule.prototype = Object.create(Rule.prototype, {
    func: {
        value: function() {
            function getSmallestDivsIncludes(el, my_string)
            {
                if (el.hasChildNodes()) {
                    if (el.className == getPostClass() && el.getAttribute('coloured') == 'true') { //if already coloured, no need to go further.
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
    }
});

function PageColour(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.getHex = function()
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
    };
}

function PageRuleManager() {
    this._rules = [];
}

PageRuleManager.prototype = {
    addRuleFromJSON: function(json)
    {
        var rule = getRuleFromJSON(json);
        console.log(rule);
        this._rules.push(rule);
    },
    clearRules: function()
    {
        this._rules = [];
        Array.from(document.getElementsByClassName(getPostClass())).forEach(el => {
            el.setAttribute("coloured", "false");
            el.style.backgroundColor = "#ffffff";
        });
    },
    employRules: function()
    {
        this._rules.forEach(rule => {
            rule.applyRule();
        });
    }
};

var currently_timing = false;

function runPerHalfSecond(func)
{
    if (currently_timing == false) {
        window.setTimeout(() => {currently_timing = false}, 300);
        currently_timing = true;
        if (func === undefined) console.log("no func lol");
        func();
    }
}

//factories below

function getRule(type, options)
{
    if (type == "find") {
        return new FindRule(options);
    }
    else {
        return new Rule(options);
    }
}

function getRuleFromJSON(json)
{
    return this.getRule(json.type, {param: json.param,
                                    colour: new PageColour(json.colour.r,
                                                           json.colour.g,
                                                           json.colour.b)});
}

function getPageRuleManager()
{
    return new PageRuleManager();
}

function getPostClass()
{
    return "_3ccb";
}

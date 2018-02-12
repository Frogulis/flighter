/*** UIRule is the class that is used to generate the HTML representation in the popup,
 *** and provides the data which will be turned into  implementation Rules in the relevant page
 ***/
function UIRule(options) {
    if (options.type === undefined) options.type = "none";
    if (options.param === undefined) options.param = "";
    if (options.colour === undefined) options.colour = getColour(200, 200, 200);
    this.type = options.type;
    this.param = options.param;
    this.colour = options.colour;
}

UIRule.prototype = {
    getHTML: function()
    {
        return '\
        <div class="rule_outer">\
            <a href="none.html">\
                <div class="rule_cat">' +
                    this.type +
                '</div>\
            </a>\
            <div class="rule_content_container">\
                <div class="rule_content">\
                    <input type="text" class="rule_parameter" placeholder="Enter parameter"' + (this.param ? ('value="' + this.param + '"') : '') + '>\
                </div>\
                <div class="rule_content">\
                    <button>color</button> <!-- unlikely to remain button -->\
                </div>\
            </div>\
        </div>\
        ';
    }
};

//factories

function getUIRule(options)
{
    return new UIRule(options);
}
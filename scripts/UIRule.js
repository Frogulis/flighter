/*** UIRule is the class that is used to generate the HTML representation in the popup,
 *** and provides the data which will be turned into  implementation Rules in the relevant page
 ***/
function UIRule(options) {
    if (options === undefined) options = {};
    if (options.type === undefined) options.type = "none";
    if (options.param === undefined) options.param = "";
    if (options.colour === undefined) options.colour = getColour(255, 230, 230);
    this.type = options.type;
    this.param = options.param;
    this.colour = options.colour;
}

UIRule.prototype = {
    getHTML: function(number)
    {
        return '\
        <div class="rule_outer" number='+ number + '>\
            <div class="rule_cat_container">\
                <a href="none.html">\
                    <div class="rule_cat">' +
                        this.type +
                    '</div>\
                </a>\
                <div class="delete_button_container">\
                    <img src="images/delete.png" class="delete_button">\
                </div>\
            </div>\
            <div class="rule_content_container">\
                <div class="rule_content">\
                    <input type="text" class="rule_parameter" placeholder="Enter parameter"'
                    + ' value=' + (this.param ? ('"' + this.param + '"') : '""') + '>\
                </div>\
                <div class="rule_content">\
                    <a href="aux_html/colour.html?index="' + number + '">\
                        <div class="rule_colour" style="background-color: ' + this.colour.getHex() + ';"></div>\
                    </a>\
                </div>\
            </div>' + number + '\
        </div>\
        ';
    },
    getJSON: function()
    {
        return {
            type: this.type,
            param: this.param,
            colour: {
                r: this.colour.r,
                g: this.colour.g,
                b: this.colour.b
            }
        };
    }
};

//factories

function getUIRule(options)
{
    return new UIRule(options);
}

function getUIRuleFromJSON(obj)
{
    return new UIRule({type: obj.type, param: obj.param, colour: getColour(obj.colour.r, obj.colour.g, obj.colour.b)});
}

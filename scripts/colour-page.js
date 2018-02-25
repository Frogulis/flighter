function getCurrentTabUrl(callback)
{
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, (tabs) => {
        callback(tabs[0].url);
    });
}

var cur_colour = new Colour();
var current_rule_index = null;
var ui_rules = getRuleHandler();
var user_log = getUserLog("user_log", {reverse_output: true, fade_length: 5, auto_deleting: true, reverse_fade: false});

function setRuleIndex()
{
    var url = document.location.href;
    current_rule_index = parseInt(url.split('?')[1].split('=')[1], 10);
    console.log(current_rule_index);
}

document.addEventListener("DOMContentLoaded", () => {
    setRuleIndex();
    var canvas = document.getElementById('picker');
    canvas.addEventListener("click", function(event)
    {
        cur_colour.setHSL(event.offsetX / canvas.width,
                          1 - (event.offsetY / canvas.height),
                          0.5 + 0.5 * (event.offsetY / canvas.height));
        //document.getElementsByClassName("main_container")[0].style.backgroundColor = cur_colour.getHex();
        draw_picker_preview();
        var element = ui_rules.getElement(current_rule_index);
        element.colour = cur_colour;
        ui_rules.updateElement(current_rule_index, element);
        saveRules(ui_rules);
    });
    document.getElementById("user_log").addEventListener("redraw", () => {
        var log = document.getElementById("user_log");
        log.innerHTML = "";
        log.innerHTML = user_log.getHTML();
    });
    ui_rules.loadArray();
    draw_picker();
});

function draw_picker()
{
    var canvas = document.getElementById('picker');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var picker_image = new Image();
        picker_image.src = "images/picker.png";
        picker_image.alt = "colour picker image";
        picker_image.addEventListener("load", () => {
            ctx.drawImage(picker_image, 0, 0);
        });
    }
}

function draw_picker_preview()
{
    var canvas = document.getElementById('picker_preview');
    if (canvas.getContext) {
        var ctx =  canvas.getContext('2d');
        ctx.fillStyle = 'rgb(' + cur_colour.r + ', ' +
                                 cur_colour.g + ', ' +
                                 cur_colour.b + ')';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

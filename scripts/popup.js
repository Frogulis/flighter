/*** passes the current tab's url to the callback ***/
function getCurrentTabUrl(callback)
{
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, (tabs) => {
        callback(tabs[0]);
    });
}

var ui_rules = getRuleHandler();
var user_log = getUserLog("user_log", {reverse_output: true, fade_length: 5, auto_deleting: true, reverse_fade: false});

function getRuleOuterOf(element)
{
    while (element.parentNode && element.parentNode.className != "rule_outer")
    {
        element = element.parentNode;
    }
    if (element.className == "rule_outer") {
        return element;
    }
    else {
        return undefined;
    }
}

function setupElementEvents(parent)
{
    var rules = Array.from(parent.getElementsByClassName("rule_outer"));
    rules.forEach(el => {
        var index = el.getAttribute("number");
        var delete_button = el.getElementsByClassName("delete_button")[0];
        delete_button.addEventListener("click", () => {
            ui_rules.deleteWithDOMElement(el);
            redrawPage(ui_rules);
        });
        var type_box = el.getElementsByClassName("rule_cat")[0];
        var find_option = document.createElement("option");
        find_option.text = "find";
        var likes_option = document.createElement("option");
        likes_option.text = "likes";
        type_box.add(find_option);
        type_box.add(likes_option);
        type_box.value = ui_rules.getElement(el.getAttribute("number")).type;
        type_box.addEventListener("change", () => {
            ui_rules.updateWithDOMElement(el);
        });
        var param_input = el.getElementsByClassName("rule_parameter")[0];
        param_input.addEventListener("change", () => {
            ui_rules.updateWithDOMElement(el);
        });

    });
}

function redrawPage(rules)
{
    var main_list = document.getElementsByClassName("main_list")[0];
    main_list.innerHTML = "";
    if (rules.getArrayLength() > 0) {
        for (var i = 0; i < rules.getArrayLength(); i++) {
            main_list.innerHTML += rules.getHTMLOf(i);
        }
        setupElementEvents(main_list);
    }
    else {
        main_list.innerHTML = "There's nothing here yet! Press the + button below to get started.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("redraw_page", () => {
        redrawPage(ui_rules);
    });
    ui_rules.loadArray();
    var add_button = document.getElementById("add_button");
    var save_button = document.getElementById("save_button");

    add_button.addEventListener("click", () => {
        ui_rules.addEmptyElement();
        redrawPage(ui_rules);
    });
    save_button.addEventListener("click", () => {
        //todo: refresh target page
        saveRules(ui_rules, () => {console.log("Saved to storage.")});
    });
    redrawPage(ui_rules);
});

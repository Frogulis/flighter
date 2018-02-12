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

var ui_rules = [];

function displayHTML(array) {
    var main_list = document.getElementsByClassName("main_list")[0]; //there'll only ever be one per page
    main_list.innerHTML = "";
    if (array.length > 0) {
        array.forEach((el) => {main_list.innerHTML += el.getHTML()});
    }
    else {
        main_list.innerHTML = "There's nothing here yet! Press the button below to get started.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadRules(ui_rules, displayHTML);
    var add_button = document.getElementById("add_button");
    add_button.addEventListener("click", () => {
        console.log("!");
        ui_rules.push(getUIRule());
        displayHTML(ui_rules);
    });
});




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

function initList()
{
    for (var i = 0; i < 20; i++) {
        ui_rules.push(getUIRule({type: "find", param: ""}));
    }
};

function displayHTML() {
    var main_list = document.getElementsByClassName("main_list")[0]; //there'll only ever be one per page
    main_list.innerHTML = "";
    Array.from(ui_rules).forEach((el) => {main_list.innerHTML += el.getHTML()});  
}

document.addEventListener("DOMContentLoaded", () => {
    initList();
    displayHTML();
});



function loadRules(array, callback)
{
    chrome.storage.sync.get("rules", (result) => {ruleArrayBuilder(result, array, callback)});
}

function ruleArrayBuilder(jsons, array, callback)
{
    var i = 0;
    while (true) {
        if (jsons.hasOwnProperty(i.toString(10))) { //rules are numbered in the storage object
            array.push(getUIRuleFromJSON(jsons[i.toString(10)]));
        }
        else {
            return;
        }
    }
    callback(array);
}

function saveRules(array)
{
    var result = {};
    for (var i = 0; i < array.length; i++) {
        result[i.toString(10)] = array[i].getJSON();
    }
    chrome.storage.sync.remove("rules");
    chrome.storage.sync.set({rules: result});
}
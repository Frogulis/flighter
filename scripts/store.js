function loadRules(array, callback)
{
    chrome.storage.sync.get("rules", (result) => {ruleArrayBuilder(result, array, callback)});
}

function ruleArrayBuilder(jsons, array, callback)
{
    var i = 0;
    while (true) {
        if (jsons["rules"].hasOwnProperty(i)) { //rules are numbered in the storage object
            array.push(getUIRuleFromJSON(jsons["rules"][i]));
        }
        else {
            break;
        }
        i++;
    }
    callback(array);
}

function saveRules(array, callback)
{
    var result = {};
    for (var i = 0; i < array.length; i++) {
        result[i] = array[i].getJSON();
    }
    chrome.storage.sync.remove("rules");
    chrome.storage.sync.set({"rules": result}, callback);
}
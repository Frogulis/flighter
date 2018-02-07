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


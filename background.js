var enable = false;

chrome.browserAction.onClicked.addListener(function (tab) {
    enable = enable ? false : true; //Switch to true or false everytime the extension is clicked

    if(enable){
        chrome.browserAction.setBadgeText({text: "on"})
        chrome.tabs.executeScript({file: "script.js"});

    }else{
        chrome.browserAction.setBadgeText({text: ""})
        chrome.runtime.reload()
    }
});

chrome.tabs.onActivated.addListener(() => {
    chrome.runtime.reload()
});

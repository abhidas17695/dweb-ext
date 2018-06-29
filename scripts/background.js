chrome.webRequest.onCompleted.addListener(function(details) {
    if(!details.url.startsWith("chrome")){
        chrome.tabs.executeScript(details.tabId, {
            file:"scripts/dweb-transports-bundle.js"
        });
        chrome.tabs.executeScript(details.tabId, {
            file:"scripts/dweb-objects-bundle.js"
        });
        chrome.tabs.executeScript(details.tabId, {
            file:"scripts/bootloader.js"
        });
    }
}, {urls: ["<all_urls>"], types: ["main_frame"]});
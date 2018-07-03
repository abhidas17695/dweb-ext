chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.url && message.target){
        window.open(message.url,message.target); 
    }
});
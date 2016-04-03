// Wait until DOM is ready and element exists
document.addEventListener("DOMContentLoaded", function(event) {
    // reset storage
    chrome.storage.local.clear();
    
    // chrome.storage.local.get('lastUpdateTime', function(result) {
    //     console.log(result)
    // });
});
chrome.browserAction.onClicked.addListener(function(activeTab) {

    chrome.tabs.create({ url: chrome.extension.getURL('html/test.html') });
});

var pollInterval = 1000 * 10; // 1 minute, in milliseconds
var timerId;

function updateBadge() {
    // check updates
    checkHowManyNewUpdate();
}

function checkHowManyNewUpdate() {
    var lastUpdateTime = "";

    chrome.storage.local.get('lastUpdateTime', function(result) {
        console.log(result)
        // if undefined
        if (!result.lastUpdateTime) {
            setLastUpdateTime();
        }

        getNumberOfNotRead(result.lastUpdateTime, function(count) {
            if (count !== 0) {
                chrome.browserAction.setBadgeText({ text: count.toString() });
            }
        });
    });
}

// set lastUpdateTime
function setLastUpdateTime() {
    updater.getAllBlogs(function(postList) {
        var firstPost = postList[0];

        if (firstPost) {
            var meta = firstPost.meta;
            chrome.storage.local.set({ 'lastUpdateTime': meta });
        }
    });
}

// get number of not read
function getNumberOfNotRead(lastUpdateTime, callback) {
    var count = 0;

    updater.getAllBlogs(function(postList) {
        var post = {};
        for (var i = 0; i < postList.length; i++) {
            post = postList[i];

            if (post.meta === lastUpdateTime) {
                callback(count);
                return;
            } else {
                count++;
            }
        }

        callback(count);
    });

}

function startRequest() {
    updateBadge();
    timerId = window.setTimeout(startRequest, pollInterval);
}

function stopRequest() {
    window.clearTimeout(timerId);
}

// startRequest
startRequest();


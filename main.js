var updater = (function() {
    // dom elements
    var checkBtn = null;

    // get all blogs update in the page
    function getAllBlogs(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://blog.dota2.com/", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(xhr.responseText);
            }
        }
        xhr.send();
    }

    // extract post list
    function extractPostList(rawHtml) {
        var html = document.createElement('html');
        html.innerHTML = rawHtml;
        var mainLoop = html.querySelector('div#mainLoop');

        var postList = [];

        if (mainLoop) {
            var postListHtml = mainLoop.querySelectorAll('div.post');

            for (var i = 0, len = postListHtml.length; i < len; i++) {
                var post = getPost(postListHtml[i]);
                postList.push(post);
            }
        }
        
        return postList;
    }

    // get post
    function getPost(postHtml) {
        var post = {
            'title': '',
            'meta': '',
            'content': ''
        };

        var titleHtml = postHtml.querySelector('.entry-title');
        if (titleHtml) {
            post.title = titleHtml.innerHTML;
        }

        var metaHtml = postHtml.querySelector('.entry-meta');
        if (metaHtml) {
            post.meta = metaHtml.innerHTML.trim();
        }

        var contentHtml = postHtml.querySelector('.entry-content');
        if (contentHtml) {
            post.content = contentHtml.innerHTML.trim();
        }

        return post;
    }

    return {
        // init the updater
        init: function() {
            getAllBlogs(extractPostList);
        }
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    updater.init();
}, false);


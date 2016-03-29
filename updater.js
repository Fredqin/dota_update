var updater = (function() {
    // todo
    // 1. added css
    // 2. run in background
    // 3. popup how many not read
    // 4. can disable the extension
    
    // dom elements
    var checkBtn,
        postListDom = null;

    // settings 



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
    function extractPostList(rawHtml, callback) {
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

        return (postList);
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

    // render post list
    function renderPostList(postList) {
        postListDom = document.querySelector('div#post_list');

        for (var i = 0; i < postList.length; i++) {
            var postHtml = createPostHtml(postList[i]);
            postListDom.appendChild(postHtml);
        }
    }

    // create post html
    function createPostHtml(post) {
        var postHtml = document.createElement('div');
        postHtml.className = "post";

        var postTitle = createPostTitleHtml(post.title);
        var postMeta = createPostMetaHtml(post.meta);
        var postContent = createPostContentHtml(post.content);

        postHtml.appendChild(postTitle);
        postHtml.appendChild(postMeta);
        postHtml.appendChild(postContent);

        return postHtml;
    }

    // create post title html
    function createPostTitleHtml(title) {
        var titleHtml = document.createElement('div');
        titleHtml.innerHTML = title;
        titleHtml.className = "post_title";
        return titleHtml;
    }

    // create post meta html
    function createPostMetaHtml(meta) {
        var metaHtml = document.createElement('div');
        metaHtml.innerHTML = meta;
        metaHtml.className = "post_meta";
        return metaHtml;
    }

    // create post content html
    function createPostContentHtml(content) {
        var contentHtml = document.createElement('div');
        contentHtml.innerHTML = content;
        contentHtml.className = "post_content";
        return contentHtml;
    }

    return {
        // init the updater
        init: function() {

            getAllBlogs(function(rawHtml) {
                var postList = extractPostList(rawHtml);
                renderPostList(postList);
            });
        }
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    updater.init();
}, false);


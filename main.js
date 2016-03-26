var updater = (function() {
    // dom elements
    var checkBtn = null;


    return {
        // init the updater
        init: function() {
            checkBtn = document.querySelector('button#check');
            console.log(checkBtn)
        }


    }
})();

document.addEventListener('DOMContentLoaded', function() {
    updater.init();
}, false);


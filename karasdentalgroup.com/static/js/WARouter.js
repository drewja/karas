function war(endpoints, loaders, unloaders) {

    // The only interface to this object after initalization;
    var go = function(target) {
        if (!isCurrentPage(target) && pageExists(target)) {
            history.pushState('', '', target);
            unloadPage();
            routeLocation();
        }
    }

    function load(page) {
        if (page != '/') $('.warEndpointLink[href="' + page + '"]').parent().addClass('active');
        collapseMenu();
        $(window).scrollTop(0);
        endpoints[page].show().addClass('active');
        let q = '.navbar-nav li>a[data-target="/' + page + '"]';
        $(q).parent().addClass('active');
        if (loaders[page]) loaders[page](go);
    }

    function unloadPage(){
        $('.navbar-nav li.active').removeClass('active');
        let id = $('.container.page.active').hide().removeClass('active').attr('id');
        let page = paths[id];
        if (unloaders[page]) unloaders[page]();
    }

    function routeLocation() {
        // Read the pathname from the address bar and load the cooresponding page
        let page = document.location.pathname;
        load(page);
    }

    function pageExists(page) {
        if (endpoints[page]) return true;
        return false;
    }

    function currentPage() {
        return paths[$('.container.page.active').attr('id')];
    }

    function isCurrentPage(page) {
        return page == currentPage();
    }

    var paths = {};
    /* paths is a map of element id attributes to target paths */
    for (i in endpoints) {
        paths[endpoints[i].attr('id')] = i;
    }

    /* initialize to the current pathname of the address bar */
    routeLocation()

    // set up the click handler for navigation
    $('.warEndpointLink').click(
        function(ev) {
            console.log('clicked ', ev);
            ev.preventDefault();
            let t = $(ev.target);
            let targetPage = t.attr('href');
            if (targetPage == undefined) {
                targetPage = t.parent().attr('href');
            }
            go(targetPage);
        }
    );
    return go;
}

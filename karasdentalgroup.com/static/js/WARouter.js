function war(endpoints, loaders, unloaders) {
    var paths = {};
    /* paths = a map of element id attributes to target paths */
    for (i in endpoints) {
        paths[endpoints[i].attr('id')] = i;
    }

    var go = function (page) {
        if (!isCurrentPage(page) && pageExists(page)) {
            history.pushState('', '', page);
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
        id = $('.container.page.active').hide().removeClass('active').attr('id');
        page = paths[id];
        if (unloaders[page]) unloaders[page]();
    }

    function routeLocation() {
        // Read the pathname from the address bar and load the cooresponding page
        page = document.location.pathname;
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
    /* initialize to the current pathname of the address bar */
    routeLocation()
    return go;
}
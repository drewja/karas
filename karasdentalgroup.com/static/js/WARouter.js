function war(endpoints, loaders, unloaders) {
    var paths = {};
    /* paths = a map of element id attributes to target paths */
    for (i in endpoints) {
        paths[endpoints[i].attr('id')] = i;
    }

    var go = function (page) {
        if (pageExists(page) && !isCurrentPage(page)) {
            history.pushState('', '', page);
            unloadPage();
            routeLocation();
        }
    }

    function loadPage(uri) {
        if (uri != '/') $('.pathLink[href="' + uri + '"]').parent().addClass('active');
        collapseMenu();
        $(window).scrollTop(0);
        endpoints[uri].show().addClass('active');
        let q = '.navbar-nav li>a[data-target="/' + uri + '"]';
        $(q).parent().addClass('active');
        if (loaders[uri]) loaders[uri](go);
    }

    function unloadPage(){
        $('.navbar-nav li.active').removeClass('active');
        id = $('.container.page.active').hide().removeClass('active').attr('id');
        page = paths[id];
        if (unloaders[page]) unloaders[page]();
    }

    function routeLocation() {
        page = document.location.pathname;
        loadPage(page);
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
    /* initialize to the current pathname of the addressbar */
    routeLocation()
    return go;
}
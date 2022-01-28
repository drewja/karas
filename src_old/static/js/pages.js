function isSmall() {
    if ($(window).width() < 928) return true;
    return false;
}
var endpoints = {
        '/': $('#index'),
        '/contact': $('#contact'),
        '/about': $('#about'),
        '/services': $('#services'),
        '/team': $('#team')
    }
    /* pages = a map of paths to target element objects */

/* loader = a map of paths to callback functions invoked with a route function after routing the uri */
var loaders = {
    '/': function(redirect) {
        let bg = {
            'url': "./img/teamallweb.jpg",
            'alignY': 0.2,
            'scale': "cover",
            'orientation': "landscape"
        };

        if (isSmall()) {
            redirect('/about')
        } else {
            $.backstretch([bg]);

            $(window).on("resize",
                () => {
                    if (isSmall()) redirect('/about')
                });
        }

    }
}
var unloaders = {
    '/': function() {
        if ($("body").data("backstretch")) $.backstretch('destroy');
        $(window).off("resize");
    }
}
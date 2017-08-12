var pages = {
    'index' : "",
    'contact': $('contact').detach(),
    'about' : $('#about').detach(),
    'services': $('#services').detach(),
    'team': $('#team').detach()
}
var container = $('#content');
var loadPage = {
    'index' : function(){
        $.backstretch(["./img/KarasDental_team.tall.jpg"]);
    },
    'contact' : function(){
        $('.page').load('./contact.html');
    },
    'about' : function(){

    },

    'services' : function(){
        pages['services'].appendTo(container);
    },
    'team' : function(){
        pages['team'].appendTo(container);
    }
}

function unloadPage(){

    if ($("body").data("backstretch")) $.backstretch('destroy');
    container.empty();
}

$('.navbar-nav>li>a').click(
    function(ev){
        ev.preventDefault();
        t = $(ev.target);
        if (t.parent().hasClass('active')) return;
        $('.navbar-nav>.active').removeClass('active');
        t.parent().addClass('active')
        page = t.data('target');
        unloadPage();
        console.log(page);
        loadPage[page]();
    }
);
loadPage.index();

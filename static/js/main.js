var loadPage = {
    'index' : function(){
        $.backstretch(["./img/KarasDental_team.tall.jpg"]);
    },
    'contact' : function(){
        $('.page').load('./contact.html');
    },
    'about' : function(){

    },
    'contact' : function (){

    },
    'services' : function(){

    },
    'team' : function(){
        $('.page').load('drkaras.html');    
    }
}

function unloadPage(){

    if ($("body").data("backstretch")) $.backstretch('destroy');
    $('.page').empty();
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
        loadPage[page]();
        console.log(ev);
    }
)

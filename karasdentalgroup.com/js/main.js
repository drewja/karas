
var pageContainer = $("#pageTarget");


var _map_loaded = 0;
map = ()=> newMap(document.getElementById("map_branches"), $("#map_branches_list > button"));

$('#schedule-modal').on('show.bs.modal', function (event) {
    if (!_map_loaded) map();
    _map_loaded = 1;
  });

$("#map_branches_list").on('click', function(event){
    let button = $(event.target);
    $("#map_branches_list > button").removeClass('active');
    button.addClass('active');
    showMapInfo[button.html()]();
});

var pages = {'main': pageContainer.html()};

navEventHandler = function(event){
    event.preventDefault();
    el = $(event.target);
    if (el.hasClass("dropdown-toggle") || el.hasClass("prevent-nav")) return;
    let href = el.attr('href');
    if (!href) href = el.parent().attr('href');
    _loadPage(href);
};

_loadPage = function(href){

    if (href in pages) return pageContainer.html(pages[href]);

    let url = "pages/" + href + ".html";

    $.get(url, 'html')
        .done(
            function(htmltext){
                pages[href] = htmltext;
                _loadPage(href);

            })
        .fail(function(e) {
            console.log( "error", e );
            });

}

var go = function(href){
    $('.nav-link[href="'+ href + '"]').click();
}
$('.nav-link, .dropdown-item').on('click', (event) => navEventHandler(event));



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

navEventHandler = function(target){
    event.preventDefault();
    el = $(target);
    if (el.hasClass("dropdown-toggle") || el.hasClass("prevent-nav")) return;
    let href = el.attr('href');
    if (!href) target = el.parent().attr('href');
    _loadPage(href);
};

_loadPage = function(target){

    if (target in pages) return pageContainer.html(pages[target]);

    let url = "pages/" + target + ".html";

    $.get(url, 'html')
        .done(
            function(htmltext){
                pages[target] = htmltext;
                _loadPage(target);

            })
        .fail(function(e) {
            console.log( "error", e );
            });

}

var go = function(href){
    $('.nav-link[href="'+ href + '"]').click();
}
$('.nav-link, .dropdown-item').on('click', (event) => navEventHandler(event.target));


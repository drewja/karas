var pageContainer = $("#pageTarget");

var _map_loaded = 0;
map = () =>
  newMap(
    document.getElementById("map_branches"),
    document.getElementById("map_branches_list")
  );

$("#schedule-modal").on("show.bs.modal", function (event) {
  if (!_map_loaded) map();
  _map_loaded = 1;
});

$("#map_branches_list").on("click", function (event) {
  let button = $(event.target);
  $("#map_branches_list > button").removeClass("active");
  button.addClass("active");
  showMapInfo[button.attr("id")]();
});

var pages = { main: pageContainer.html() };

navEventHandler = function (event) {
  event.preventDefault();
  el = $(event.target);
  if (el.hasClass("dropdown-toggle") || el.hasClass("prevent-nav")) return;
  let href = el.attr("href");
  if (!href) href = el.parent().attr("href");
  _loadPage(href);
  window.scrollTo(0, 0);
};

_loadPage = function (href) {
  if (href in pages) return pageContainer.html(pages[href]);

  let url = "pages/" + href + ".html";

  $.get(url, "html")
    .done(function (htmltext) {
      pages[href] = htmltext;
      _loadPage(href);
    })
    .fail(function (e) {
      console.log("error", e);
    });
};

var go = function (href) {
  $('.nav-link[href="' + href + '"]').click();
};
$(".nav-link, .dropdown-item").on("click", (event) => navEventHandler(event));

let menuIcon = document.getElementById("nav-icon"); // div#nav-icon [hamburger and close icon, svg]
let topNav = document.getElementById("top-nav");
// when hamburger icon is clicked
menuIcon.addEventListener("click", function () {
  // div#top-nav add class .nav-active
  topNav.classList.toggle("nav-active");
  // change menu icon from menu-ham-black to menu-close-black.svg (in CSS background)
  menuIcon.classList.toggle("menu-close");
});

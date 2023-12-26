$(document).ready(function () {
    const allButtons = $(".searchBtn");
    const searchBar = $(".searchBar");
    const searchInput = $("#searchInput");
    const searchClose = $("#searchClose");

allButtons.click( function () {
    searchBar.css("visibility", "visible");
    searchBar.addClass("open");
    this.attr("aria-expanded", "true");
    searchInput.focus();
});

searchClose.click( function () {
    searchBar.css("visibility", "hidden");
    searchBar.removeClass("open");
    this.attr("aria-expanded", "false");
});


});
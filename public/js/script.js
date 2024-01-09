$(document).ready(function () {

    // Date in the Footer
    const date = new Date().getFullYear();
    $("#year").text(date);

    // Search icon href attribute
    $("#searchInput").on("input", function () {
        $("#searchIcon").attr("href", "/search/" + $("#searchInput").val());
        $("#searchForm").attr("action", "/search/" + $("#searchInput").val());
    });

    // Responsive Navbar
    $("#burger").click(function (e) { 
        e.preventDefault();
        $("#menu").toggleClass("max-md:hidden");
    });
   
    $("#bookmark").click(function (e) { 
        e.preventDefault();
        $("#categories").toggleClass("max-md:hidden");
    });
   
    // Add Post Word count
    $("#title").on("input", function () {
        const titleLength = ($("#title").val()).length;
        $("#title-count").text(titleLength);
    });
    $("#description").on("input", function () {
        const titleLength = ($("#description").val()).length;
        $("#desc-count").text(titleLength);
    });
    $("#body").on("input", function () {
        const titleLength = ($("#body").val()).trim().split(/\s+/).length;
        $("#body-count").text(titleLength);
    });

    // Auto-Resize textarea for content input
    $("textarea").keyup( e => {
        $("textarea").height("auto");
        let scHeight = e.target.scrollHeight;
        let height = $("textarea").height();
        console.log(height); 
        $("textarea").height(`${scHeight}px`);
    });

    // Clickable checkbox labels
    $(".tag__label").click(function (e) {
        $(this).toggleClass("checked");
    });
});
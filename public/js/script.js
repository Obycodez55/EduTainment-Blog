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
    $("#title-count").text(($("#title").val()).length);
    $("#desc-count").text(($("#description").val()).length)
    $("#title").on("input", function () {
        const titleLength = ($("#title").val()).length;
        $("#title-count").text(titleLength);
    });
    $("#description").on("input", function () {
        const descLength = ($("#description").val()).length;
        $("#desc-count").text(descLength);
    });

     $("#thumbnail").change(function (e) { 
        e.preventDefault();
        var file = this.files[0];
        var filename = file.name;
        $("#fileInfo").text(filename);
        $("#fileInfo").removeClass("text-danger-500");
     });
    // Auto-Resize textarea for content input
    // $("textarea").keyup( e => {
    //     $("textarea").height("auto");
    //     let scHeight = e.target.scrollHeight;
    //     let height = $("textarea").height();
    //     console.log(height); 
    //     $("textarea").height(`${scHeight}px`);
    // });

    // Clickable checkbox labels
    $(".tag__label").click(function (e) {
        $(this).toggleClass("checked");
    });
});
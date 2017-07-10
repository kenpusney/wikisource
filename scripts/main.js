requirejs.config({
    "baseUrl": "scripts"
});
requirejs(["render", "zepto", "lodash"], function (render, $, _) {
    $(function () {
        if (location.hash) {
            render(location.hash);
        } else {
            render("#README");
        }
    })
    $(window).on("hashchange", function (e) {
        if (location.hash) {
            render(location.hash);
        } else {
            render("#README");
        }

        e.preventDefault();
    });

    $("#btn-search").click(function (e) {
        e.preventDefault();
        var search_term = $("#input-search").val();
        if (search_term == null || search_term === undefined || search_term.length == 0) {
            return;
        }

        location.hash = "#search/" + search_term;
    });
});
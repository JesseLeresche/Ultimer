import "./nav.html";

Template.nav.rendered = function () {
    $(".button-collapse").sideNav({
        closeOnClick: true,
    });
};
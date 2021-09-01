
function toggleNav() {
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
        $('.sidenav').toggleClass('active');
    });
}

$(function () {
    if ($('.navbar-toggler').length > 0) {
		toggleNav();
	}
});
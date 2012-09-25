$(document).ready(function(){
    // Transform your fixed header

    var toTop, prevToTop = 0,
        $nav = $('#nav'),
        // set equal to  css property 'top' of nav element
        navToTop = 150,
        $title = $('.nav-title');

    // initial check
    if ($(window).scrollTop() > navToTop) {
        $nav.css('top', 0);
        $title.show();
        $nav.addClass("scroll");
    }

    // Listen for scroll events, essentially to update
    // the header's top css attribute
    $(window).scroll(function(){
        var toTop = $(window).scrollTop();
        if ($("body").height() > $(window).height()) {

            // scrolling down, and not snaping back
            if (prevToTop < toTop && toTop >= 0) {
                if (toTop <= navToTop) {
                    $nav.css('top', navToTop - toTop);
                } else if (toTop > navToTop) {
                    $nav.css('top', 0);
                    $title.show();
                    $nav.addClass("scroll");
                }
            // scrolling up
            } else if (prevToTop > toTop) {
                if (toTop < navToTop && toTop >= 0)  {
                    $nav.css('top', navToTop - toTop);
                    $title.hide();
                    $nav.removeClass("scroll");
                }
            }
        }

        prevToTop = toTop;
    });

    // A little JS to help the header be more responsive
    // Fixed elements inherit their size from the window,
    // rather than the parent element; which is a problem.
    // Tie the width of the header to the width of #page.
    $page = $('#page');

    //initial set
    $nav.width($page.width());

    $(window).resize(function(){
        $nav.width($page.width());
    });
});
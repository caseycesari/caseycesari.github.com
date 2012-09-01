$(document).ready(function(){
    var toTop, prevToTop = 0,
        $nav = $('#nav'),
        // set equal to  css property 'top' of nav element
        navToTop = 150,
        $title = $('.nav-title');

    $(window).scroll(function(){
        var toTop = $(window).scrollTop();
        
        if ($("body").height() > $(window).height()) {

            //scrolling down, and not snaping back
            if (prevToTop < toTop && toTop >= 0) {
                if (toTop <= navToTop) {
                    $nav.css('top', navToTop - toTop);
                } else if (toTop > navToTop) {
                    $nav.css('top', 0);
                    $title.show();
                    $nav.addClass("scroll")
                }
            //scrolling up
            } else if (prevToTop > toTop) {
                if (toTop < navToTop && toTop >= 0)  {
                    $nav.css('top', navToTop - toTop);
                    $title.hide();
                    $nav.removeClass("scroll")
                }
            }
        }

        prevToTop = toTop;
    });
}); 
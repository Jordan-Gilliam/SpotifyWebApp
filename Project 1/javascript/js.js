// $(document).ready(function() {
$(document).ready(function() {


    // Initialize collapse button
    $(".button-collapse").sideNav();


    $('.carousel').carousel();
    
     $('.collapsible').collapsible({
        onOpen: function(el) {
            var carousel = el.find('.carousel');
            if (carousel.length) {
                carousel.trigger('carouselNext', [0.000001]);
            }
        }
    });
    
});

// });

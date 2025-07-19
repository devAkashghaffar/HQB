$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger);
    $(".about-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        arrows: false,
        vertical: true,
        verticalSwiping: true,
    });
    $(".expertise-inner").slick({
        slidesToShow: 4, // Default for larger screens
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: false,
        dots: true,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3, // Set to 3 slides when the width is 1200px or below
                slidesToScroll: 1,
                centerMode: true, // You can keep other settings the same
                centerPadding: false,
                dots: true,
                arrows: false,
                autoplaySpeed: 2000
            }
        }]
    });
    $(".testimonial-slider").slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        dots: false,
        adaptiveHeight: true,
    });

    function updateMapMarker(currentSlide) {
        // Find the currently active slide and get its data-place attribute
        var activePlace = $(".testimonial-slider .slick-current").data("place");
        $(".map-marker").attr("data-place", activePlace);
    }

    function updateSlideNumber(slick, currentSlide) {
        // Update slide numbers
        var totalSlides = slick.slideCount;
        var currentSlideNumber = currentSlide + 1;
        $(".current-slide").text(currentSlideNumber);
        $(".total-slides").text(totalSlides);
    }

    // Set initial state on slider initialization
    $(".testimonial-slider").on("init", function(event, slick) {
        updateMapMarker(0); // Set map marker for the first slide
        updateSlideNumber(slick, 0); // Set initial slide number
    });

    // Update state on slide change
    $(".testimonial-slider").on(
        "afterChange",
        function(event, slick, currentSlide) {
            updateMapMarker(currentSlide);
            updateSlideNumber(slick, currentSlide);
        }
    );

    // Trigger the 'init' event manually if Slick has already been initialized
    $(".testimonial-slider").slick("setPosition");

    // gsap.set(".our-value-items-wrapper:not(:first-of-type)", {
    //   opacity: 0,
    // });

    if (document.querySelector(".value-items-body")) {
        let boxes = document.querySelectorAll(".value-items-body");
        let wrappers = document.querySelectorAll(".value-items-img");
        console.log(boxes);

        boxes.forEach((box, index) => {
            gsap.from(box, {
                scrollTrigger: {
                    trigger: box,
                    start: "top center",
                    scrub: true,
                    onEnter: () => {
                        console.log("entered " + index);
                        wrappers.forEach((wrapper) => {
                            wrapper.classList.remove("active");
                        });
                        wrappers[index].classList.add("active");
                    },
                    onLeaveBack: () => {
                        console.log("leave back " + index);
                        wrappers.forEach((wrapper) => {
                            wrapper.classList.remove("active");
                        });
                        if (index > 0) {
                            wrappers[index - 1].classList.add("active");
                        } else {
                            // Keep the first item active on leave
                            wrappers[0].classList.add("active");
                        }
                    },
                },
            });
        });
    }
});

// $(window).scroll(function () {
//   var $window = $(window),
//     $panel = $(".our-value-items"),
//     scroll = $window.scrollTop() + $window.height() / 3;

//   $(".our-value-items").removeClass("active");

//   $panel.each(function () {
//     var $this = $(this);
//     var $img = $this.find(".value-items-img");

//     if (
//       $this.position().top <= scroll &&
//       $this.position().top + $this.height() > scroll
//     ) {
//       $this.addClass("active");

//       // Fix the image in place when within the section's scroll range
//       if (
//         $window.scrollTop() >= $this.position().top &&
//         $window.scrollTop() <= $this.position().top + $this.height()
//       ) {
//         $img.addClass("fixed");
//       } else {
//         $img.removeClass("fixed");
//       }
//     } else {
//       $this.removeClass("active");
//       $img.removeClass("fixed");
//     }
//   });
// });
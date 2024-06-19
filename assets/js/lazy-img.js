function lazyLoadImages(paramlazyClass = 'lazybg') {
  // document.addEventListener("DOMContentLoaded", () => {
    var lazyloadImages;
    var lazyCssClassName = paramlazyClass;
    var lazyCssClassSelector = "." + lazyCssClassName;

    lazyloadImages = document.querySelectorAll(lazyCssClassSelector);
    if ("IntersectionObserver" in window) {
      var imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.classList.remove(lazyCssClassName);
            imageObserver.unobserve(image);
          }
        });
      });

      lazyloadImages.forEach(function (image) {
        imageObserver.observe(image);
      });
    } else {
      var lazyloadThrottleTimeout;

      function lazyload() {
        if (lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }

        lazyloadThrottleTimeout = setTimeout(function () {
          var scrollTop = window.scrollY || window.pageYOffset;
          lazyloadImages.forEach(function (img) {
            if (img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove(lazyCssClassName);
            }
          });

          if (lazyloadImages.length == 0) {
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }

      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  // });
}

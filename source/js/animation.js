'use strict';

(function () {
  var CLOUD_RANGE = 500;

  var onParallax = function (event) {
    this.querySelectorAll('.cloud-animation__image').forEach(cloud => {
      var speed = cloud.getAttribute('data-speed');

      cloud.style.transform = 'translate(' + event.clientX * speed / CLOUD_RANGE + 'px,' + event.clientY * speed / CLOUD_RANGE + 'px)';
    });
  };

  window.animation = onParallax;
})();

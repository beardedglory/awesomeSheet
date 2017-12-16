var shade = (function() {

  var previousShade = null;

  function bind() {
    window.addEventListener("keydown", function(event) {
      if (event.keyCode == 27) {
        destroy();
      };
    }, false);
  };

  function destroy() {
    var all_shade = helper.eA(".js-shade");
    if (all_shade[0]) {
      for (var i = 0; i < all_shade.length; i++) {
        all_shade[i].destroy();
      };
    };
  };

  function render(options) {
    var defaultOptions = {
      action: null,
      includeHeader: false
    };
    var applyOptions = function() {
      if (options) {
        for (key in options) {
          if (key in defaultOptions) {
            defaultOptions[key] = options[key];
          };
        };
      };
    };
    var destroyPrevious = function(){
      if (previousShade != null) {
        destroy();
      };
    };
    var makeShade = function(action) {
      var body = helper.e("body");
      var shade = document.createElement("div");
      shade.setAttribute("class", "m-shade js-shade");
      if (defaultOptions.includeHeader) {
        helper.addClass(shade, "m-shade-top");
      };
      if (display.state()) {
        helper.addClass(shade, "is-display-mode");
      };
      shade.destroy = function() {
        if (shade.classList.contains("is-opaque")) {
          helper.removeClass(shade, "is-opaque");
          helper.addClass(shade, "is-transparent");
        } else {
          shade.remove();
        };
      };
      shade.addEventListener("transitionend", function(event, elapsed) {
        if (event.propertyName === "opacity" && getComputedStyle(this).opacity == 0) {
          this.parentElement.removeChild(this);
        };
      }.bind(shade), false);
      shade.addEventListener("click", function() {
        this.destroy();
        if (defaultOptions.action) {
          defaultOptions.action();
        };
      }, false);
      previousShade = shade;
      body.appendChild(shade);
      getComputedStyle(shade).opacity;
      helper.removeClass(shade, "is-transparent");
      helper.addClass(shade, "is-opaque");
    };
    destroyPrevious();
    applyOptions();
    makeShade();
  };

  // exposed methods
  return {
    bind: bind,
    destroy: destroy,
    render: render
  };

})();

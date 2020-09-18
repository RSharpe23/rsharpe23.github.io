"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function ($) {
  'use strict';

  var Util = {
    clamp: function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }
  };

  var ParallaxFx =
  /*#__PURE__*/
  function () {
    function ParallaxFx($element, options) {
      _classCallCheck(this, ParallaxFx);

      this.$element = $element;
      this.options = ParallaxFx._getMergedOptions(options);
      this.offset = 0;

      this._init();
    }

    _createClass(ParallaxFx, [{
      key: "_init",
      value: function _init() {
        this.$element.css('transition', "transform ".concat(this.options.duration, " ease-out"));
      }
    }, {
      key: "incOffset",
      value: function incOffset(value) {
        var newOffset = value * this.options.offsetScale;
        newOffset = Util.clamp(newOffset, -100, 100);
        this.offset -= newOffset;
      }
    }, {
      key: "execute",
      value: function execute() {
        var _this = this;

        this._resetTimer();

        this.timer = setTimeout(function () {
          _this.$element.css('transform', "translate3d(0, ".concat(_this.offset, "px, 0)"));
        }, this.options.delay);
      }
    }, {
      key: "_resetTimer",
      value: function _resetTimer() {
        this.timer && clearTimeout(this.timer);
      }
    }, {
      key: "reset",
      value: function reset() {
        this._resetTimer();

        this.$element.css('transform', 'translate3d(0, 0, 0)');
        this.offset = 0;
      }
    }], [{
      key: "_getMergedOptions",
      value: function _getMergedOptions(options) {
        return $.extend({}, ParallaxFx.defaults, options);
      }
    }]);

    return ParallaxFx;
  }();

  ParallaxFx.defaults = {
    offsetScale: 0.06,
    duration: '0.5s',
    delay: 100
  }; // class ParallaxFx {
  //   constructor($element, options) {
  //     this.$element = $element;
  //     this.options = $.extend({}, ParallaxFx.defaults, options);
  //     this.offset = 0;
  //   }
  //   init() {
  //     this.$element.css(
  //       'transition',
  //       `transform ${this.options.duration} ease-out`
  //     );
  //   }
  //   incOffset(value) {
  //     let newOffset = value * this.options.scale;
  //     newOffset = Util.clamp(newOffset, -100, 100);
  //     this.offset -= newOffset;
  //   }
  //   execute() {
  //     this._resetTimer();
  //     this.timer = setTimeout(() => {
  //       this.$element.css(
  //         'transform',
  //         `translate3d(0, ${this.offset}px, 0)`
  //       );
  //     }, this.options.delay);
  //   }
  //   _resetTimer() {
  //     this.timer && clearTimeout(this.timer);
  //   }
  //   reset() {
  //     this._resetTimer();
  //     this.$element.css('transform', 'translate3d(0, 0, 0)');
  //   }
  // }
  // ParallaxFx.defaults = {
  //   scale: 0.06,
  //   duration: '0.5s',
  //   delay: 100,
  // };
  // export default ParallaxFx;

  var DATA_KEY = 'rsh.parallax-fx';

  $.fn.parallaxFx = function (options) {
    return this.each(function (index, element) {
      var $element = $(element);
      var instance = $element.data(DATA_KEY);

      if (!instance) {
        $element.data(DATA_KEY, instance = new ParallaxFx($element, options));
        return;
      }

      if (typeof options == 'number') {
        instance.incOffset(options);
        instance.execute();
      } else if (typeof options == 'string') {
        instance[options]();
      }
    });
  }; // $.fn.parallaxFx = function (option) {
  //   return this.each((index, element) => {
  //     const $element = $(element);
  //     let instance = $element.data(DATA_KEY);
  //     if (!instance) {
  //       $element.data(
  //         DATA_KEY,
  //         instance = new ParallaxFx($element)
  //       );
  //     }
  //     if (typeof option == 'number') {
  //       instance.incOffset(option);
  //       instance.execute();
  //     } else if (typeof option == 'string') {
  //       instance[option]();
  //     }
  //   });
  // };

})($);
//# sourceMappingURL=jquery.parallax-fx.js.map

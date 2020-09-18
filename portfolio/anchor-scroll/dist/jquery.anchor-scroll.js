"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function ($) {
  'use strict';

  var AnchorScroll =
  /*#__PURE__*/
  function () {
    function AnchorScroll() {
      _classCallCheck(this, AnchorScroll);

      this["_constructor".concat(arguments.length)].apply(this, arguments);
    }

    _createClass(AnchorScroll, [{
      key: "_constructor1",
      value: function _constructor1(options) {
        this._constructor2($('html, body'), options);
      }
    }, {
      key: "_constructor2",
      value: function _constructor2($element, options) {
        this.$element = $element;
        this.options = options;
      }
    }, {
      key: "execute",
      value: function execute() {
        var scrollTop = this._getTarget().offset().top;

        var _this$options = this.options,
            duration = _this$options.duration,
            complete = _this$options.complete;
        this.$element.animate({
          scrollTop: scrollTop
        }, {
          duration: duration,
          complete: complete
        });
      }
    }, {
      key: "_getTarget",
      value: function _getTarget() {
        var target = this.options.target;
        return target instanceof $ ? target : $(target);
      }
    }]);

    return AnchorScroll;
  }();

  $.extend({
    anchorScroll: function anchorScroll(options) {
      new AnchorScroll(options).execute();
    }
  });
})($);
//# sourceMappingURL=jquery.anchor-scroll.js.map

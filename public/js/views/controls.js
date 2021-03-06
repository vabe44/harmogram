// Generated by CoffeeScript 1.8.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Sounder.Views.Controls = (function(_super) {
    __extends(Controls, _super);

    function Controls() {
      return Controls.__super__.constructor.apply(this, arguments);
    }

    Controls.prototype.template = JST['controls'];

    Controls.prototype.el = "#controls";

    Controls.prototype.events = {
      'change [data-control-method]': 'handleRange',
      'click [data-control-switch]': 'handleSwitch',
      'click #control-fullscreen': 'toggleFullScreen',
      'click #control-centered': 'toggleCentered'
    };

    Controls.prototype.initialize = function(src) {
      this.render();
      this.isFullScreen = false;
      return this.isCentered = false;
    };

    Controls.prototype.handleRange = function(e) {
      var attr, val;
      attr = $(e.currentTarget).data('control-method');
      val = e.currentTarget.valueAsNumber;
      if (attr === 'baseAngle') {
        val = val / 100;
      }
      if (attr === 'colorAmp') {
        val = val / 100;
      }
      if (attr === 'changeAngleSpeed') {
        val = val / 10000;
      }
      e.currentTarget.dataset.controlMethodValue = val;
      return Sounder.renderer[attr] = val;
    };

    Controls.prototype.handleSwitch = function(e) {
      var attr;
      e.preventDefault();
      attr = $(e.currentTarget).data('control-switch');
      if (Sounder.renderer[attr]) {
        Sounder.renderer[attr] = false;
        return this["switch"](e.currentTarget, false);
      } else if (!Sounder.renderer[attr]) {
        Sounder.renderer[attr] = true;
        return this["switch"](e.currentTarget, true);
      }
    };

    Controls.prototype.toggleFullScreen = function(e) {
      var el;
      e.preventDefault();
      el = $(document.body).parent();
      if (this.isFullScreen) {
        document.webkitCancelFullScreen();
        this.$(e.currentTarget).parent().removeClass('controls--active');
        this.isFullScreen = false;
        Sounder.renderer.updatePos();
        return true;
      }
      el[0].webkitRequestFullScreen();
      this.$(e.currentTarget).parent().toggleClass('controls--active');
      this.isFullScreen = true;
      return Sounder.renderer.updatePos();
    };

    Controls.prototype.toggleCentered = function(e) {
      e.preventDefault();
      if (this.isCentered) {
        this.$(e.currentTarget).parent().removeClass('controls--active');
        this.isCentered = false;
        Sounder.renderer.xOffset = 1.5;
        Sounder.renderer.updatePos();
        return true;
      }
      this.$(e.currentTarget).parent().toggleClass('controls--active');
      Sounder.renderer.xOffset = 2;
      this.isCentered = true;
      return Sounder.renderer.updatePos();
    };

    Controls.prototype["switch"] = function(el, truth) {
      if (truth == null) {
        truth = true;
      }
      if (truth) {
        return $(el).parent().addClass('controls--active');
      } else if (!truth) {
        return $(el).parent().removeClass('controls--active');
      }
    };

    Controls.prototype.render = function() {
      this.$el.html(this.template());
      return this.resetInputs();
    };

    Controls.prototype.resetInputs = function() {
      var attr, checker, checkers, range, ranges, val, _i, _j, _len, _len1, _results;
      ranges = this.$('input[type="range"]');
      checkers = this.$('input[type="checkbox"]');
      for (_i = 0, _len = ranges.length; _i < _len; _i++) {
        range = ranges[_i];
        attr = range.dataset.controlMethod;
        val = Sounder.renderer[attr];
        range.dataset.controlMethodValue = val;
        range.value = val;
      }
      _results = [];
      for (_j = 0, _len1 = checkers.length; _j < _len1; _j++) {
        checker = checkers[_j];
        attr = checker.dataset.controlSwitch;
        val = Sounder.renderer[attr];
        if (val === true) {
          _results.push($(checker).parent().addClass('controls--active'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Controls;

  })(Backbone.View);

}).call(this);

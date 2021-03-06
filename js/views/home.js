// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Dot.Views.Home = (function(_super) {

    __extends(Home, _super);

    function Home() {
      this.destroyScrollChecker = __bind(this.destroyScrollChecker, this);

      this.initScrollChecker = __bind(this.initScrollChecker, this);
      return Home.__super__.constructor.apply(this, arguments);
    }

    Home.prototype.template = JST['home'];

    Home.prototype.el = "container";

    Home.prototype.events = {
      'keyup #search-input': 'search',
      'keyup': 'handleKeyboard'
    };

    Home.prototype.colorViews = [];

    Home.prototype.initialize = function(key) {
      var _this = this;
      this.initialKey = key;
      this.colors = new Dot.Collections.Colors();
      this.windowPos = $(window).scrollTop();
      this.windowHeight = $(window).height();
      this.render();
      return this.colors.fetch({
        success: function() {
          _this.loadCards();
          return _this.initEvents();
        }
      });
    };

    Home.prototype.render = function() {
      $(this.el).html(this.template());
      this.colorEl = this.$('#color');
      this.inputter = this.$('#search').find('input');
      this.swappers = $('.classSwaping');
      return this.colorizers = $('.colorizing');
    };

    Home.prototype.loadCards = function() {
      var color, _fn, _i, _len, _ref,
        _this = this;
      _ref = this.colors.models;
      _fn = function(color) {
        var vi;
        vi = new Dot.Views.ColorCard({
          color: color
        });
        _this.$('#roll').append(vi.el);
        return _this.colorViews.push(vi);
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        color = _ref[_i];
        _fn(color);
      }
      return _.delay((function() {
        var height, res, _j, _len1, _ref1;
        _ref1 = _this.colorViews;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          color = _ref1[_j];
          height = parseFloat((color.$el.height()).toFixed(0));
          res = parseFloat(color.$el.offset().top.toFixed(0)) + height;
          color.offsetTop = res;
          color.heightV = height;
        }
        return _.delay((function() {
          _this.findKey();
          return _this.checkColor();
        }), 0);
      }), 0);
    };

    Home.prototype.findKey = function(key) {
      var r, res,
        _this = this;
      if (this.initialKey !== void 0) {
        res = _.find(this.colorViews, function(v) {
          return v.hex === _this.initialKey.toUpperCase();
        });
        return this.scrollWindow(res.$el.offset().top.toFixed(0) - 150);
      } else {
        r = Math.floor(Math.random() * this.colorViews.length);
        return this.scrollWindow(this.colorViews[r].$el.offset().top.toFixed(0) - 150);
      }
    };

    Home.prototype.search = function(e) {
      e.preventDefault();
      if (e.which === 38) {
        this.showPrev(true);
        return false;
      } else if (e.which === 40) {
        this.showNext(true);
        return false;
      }
      this.searcher(e);
      return false;
    };

    Home.prototype.handleKeyboard = function(e) {
      e.preventDefault();
      if (e.which === 38) {
        this.showPrev();
        return false;
      } else if (e.which === 40) {
        this.showNext();
        return false;
      }
      return false;
    };

    Home.prototype.showPrev = function(fromSearch) {
      var a, i, prev;
      if (fromSearch == null) {
        fromSearch = false;
      }
      a = this.colorViews;
      i = this.currentColorIndex;
      if (fromSearch) {
        a = this.searchRes;
        i = this.searchCurrent;
      }
      prev = a != null ? a[i - 1] : void 0;
      if (prev) {
        i -= 1;
        this.scrollWindow(a[i].$el.offset().top.toFixed(0) - 150);
        if (fromSearch) {
          return this.searchCurrent = i;
        } else {
          return this.currentColorIndex = i;
        }
      } else {
        return false;
      }
    };

    Home.prototype.showNext = function(fromSearch) {
      var a, i, next;
      if (fromSearch == null) {
        fromSearch = false;
      }
      a = this.colorViews;
      i = this.currentColorIndex;
      if (fromSearch) {
        a = this.searchRes;
        i = this.searchCurrent;
      }
      next = a != null ? a[i + 1] : void 0;
      if (next) {
        i += 1;
        this.scrollWindow(a[i].$el.offset().top.toFixed(0) - 150);
        if (fromSearch) {
          return this.searchCurrent = i;
        } else {
          return this.currentColorIndex = i;
        }
      } else {
        return false;
      }
    };

    Home.prototype.scrollWindow = function(val) {
      return this.$el.animate({
        scrollTop: val
      }, 250);
    };

    Home.prototype.initScrollChecker = function() {
      var checker,
        _this = this;
      checker = _.debounce((function() {
        var newWinPos, oldWinPos;
        newWinPos = $(window).scrollTop();
        oldWinPos = _this.windowPos || 0;
        if (newWinPos !== oldWinPos) {
          _this.windowPos = newWinPos;
        }
        return _this.checkColor();
      }), 20);
      return $(window).on('scroll', function(e) {
        return checker();
      });
    };

    Home.prototype.destroyScrollChecker = function() {
      $(window).off('scroll');
      return $(window).off('resize');
    };

    Home.prototype.initEvents = function() {
      var resizeChecker,
        _this = this;
      this.searcher = _.debounce((function(e) {
        var res, val;
        val = $(e.currentTarget).val().toUpperCase();
        res = _.filter(_this.colorViews, function(c) {
          return (c.hex.indexOf(val) >= 0) || (c.name.toUpperCase().indexOf(val) >= 0);
        });
        if (res.length) {
          _this.searchRes = res;
          _this.searchCurrent = 0;
          _this.scrollWindow(res[0].$el.offset().top.toFixed(0) - 150);
          return _this.checkColor();
        }
      }), 40);
      this.initScrollChecker();
      resizeChecker = _.debounce((function(e) {
        _this.windowHeight = $(window).height();
        _this.windowPos = $(window).scrollTop();
        console.log('resize check - new height found', _this.windowHeight);
        return _this.checkColor();
      }), 300);
      $(window).on('resize', function(e) {
        return resizeChecker();
      });
      return $(window).on('hashchange', function(e) {
        e.preventDefault();
        return false;
      });
    };

    Home.prototype.checkColor = function() {
      var res,
        _this = this;
      res = _.find(this.colorViews, function(c) {
        var middleOfEl, _i, _ref, _ref1, _results;
        middleOfEl = Math.floor(c.el.clientHeight / 2);
        return _ref = (c.el.offsetTop + middleOfEl) - _this.windowPos, __indexOf.call((function() {
          _results = [];
          for (var _i = 0, _ref1 = _this.windowHeight + middleOfEl; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; 0 <= _ref1 ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this), _ref) >= 0;
      });
      if (res !== void 0) {
        this.currentColor = res;
        this.currentColorIndex = this.colorViews.indexOf(res);
        return this.colorChanger();
      }
    };

    Home.prototype.colorChanger = function() {
      var brightness, hex,
        _this = this;
      hex = this.currentColor.hex;
      brightness = this.currentColor.brightness;
      this.colorEl.css("backgroundColor", '#' + hex);
      this.inputter.css("color", '#' + hex);
      if (brightness < 0.5) {
        this.swappers.addClass("light");
        this.colorizers.css("color", function() {
          return "hsl(0, 0%, 90%)";
        });
      } else {
        this.swappers.removeClass("light");
        this.colorizers.css("color", function() {
          return "hsl(0, 0%, 10%)";
        });
      }
      this.currentColor.$el.attr('id', '');
      Backbone.history.navigate("/" + hex, {
        trigger: false,
        silent: true
      }, false);
      return this.currentColor.$el.attr('id', hex);
    };

    return Home;

  })(Backbone.View);

}).call(this);

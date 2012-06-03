(function() {
  var Jukebox, MainScene, Shooting, Timer, Vector;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Vector = (function() {
    function Vector(x, y) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      this.set(x, y);
    }
    Vector.prototype.set = function(x, y) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      this.x = x;
      this.y = y;
      return this;
    };
    Vector.prototype.add = function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    };
    Vector.prototype.sub = function(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    };
    Vector.prototype.scale = function(n) {
      this.x *= n;
      this.y *= n;
      return this;
    };
    Vector.prototype.div = function(n) {
      this.x /= n;
      this.y /= n;
      return this;
    };
    Vector.prototype.product = function(v) {
      return this.x * v.x + this.y * v.y;
    };
    Vector.prototype.length = function() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vector.prototype.resize = function(n) {
      if (this.length()) {
        this.scale(n / this.length());
      }
      return this;
    };
    Vector.prototype.normalize = function() {
      return this.resize(1);
    };
    Vector.prototype.angle = function() {
      return (180 * Math.atan2(this.y, this.x)) / Math.PI;
    };
    Vector.prototype.rotate = function(deg) {
      var rad, size, x, y;
      rad = (deg * Math.PI) / 180;
      size = this.length();
      x = this.x;
      y = this.y;
      this.x = Math.sin(rad) * y + Math.cos(rad) * x;
      this.y = Math.cos(rad) * y - Math.sin(rad) * x;
      return this.resize(size);
    };
    Vector.prototype.clone = function() {
      return new Vector(this.x, this.y);
    };
    Vector.prototype.reverse = function() {
      this.x *= -1;
      this.y *= -1;
      return this;
    };
    Vector.prototype.max = function(m) {
      if (this.length() <= m) {
        return this;
      }
      return this.resize(m);
    };
    Vector.prototype.min = function(m) {
      if (this.length() >= m) {
        return this;
      }
      return this.resize(m);
    };
    Vector.prototype.isZero = function() {
      return this.x === 0 && this.y === 0;
    };
    return Vector;
  })();
  Array.prototype._index = function(index) {
    var length;
    if (index < 0) {
      length = this.length;
      return length + index;
    }
    return index;
  };
  Array.prototype.at = function(index) {
    return this[this._index(index)];
  };
  Array.prototype.map = function(func) {
    var value, _ref;
    return ([].splice.apply(this, [0, this.length - 0].concat(_ref = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        value = this[_i];
        _results.push(func(value));
      }
      return _results;
    }).call(this))), _ref);
  };
  Array.prototype.clone = function() {
    return this.dup();
  };
  Array.prototype.dup = function() {
    return this.slice(0, this.length);
  };
  Array.prototype.each = function(func) {
    var index, _ref;
    for (index = 0, _ref = this.length; 0 <= _ref ? index < _ref : index > _ref; 0 <= _ref ? index++ : index--) {
      func(this[index], index);
    }
    return this;
  };
  Array.prototype.deleteAt = function(index) {
    index = this._index(index);
    if (index >= this.length) {
      return;
    }
    return this.splice(index, 1);
  };
  Array.prototype.deleteIf = function(func) {
    var i;
    return this.replace((function() {
      var _ref, _results;
      _results = [];
      for (i = 0, _ref = this.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        if (!func(this[i], i)) {
          _results.push(this[i]);
        }
      }
      return _results;
    }).call(this));
  };
  Array.prototype.reject = function(func) {
    var before;
    before = this.length;
    this.deleteIf(func);
    if (before === this.length) {
      return;
    }
    return this;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  Array.prototype.isEql = function(other, eql) {
    var index, _ref;
    if (eql == null) {
      eql = function(a, b) {
        return a === b;
      };
    }
    if (this.length !== other.length) {
      return false;
    }
    for (index = 0, _ref = this.length; 0 <= _ref ? index < _ref : index > _ref; 0 <= _ref ? index++ : index--) {
      if (!eql(this[index], other[index])) {
        return false;
      }
    }
    return true;
  };
  Array.prototype.fill = function(val, start, end) {
    var i, _ref;
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = this.length - 1;
    }
    start = this._index(start);
    end = this._index(end);
    [].splice.apply(this, [start, end - start + 1].concat(_ref = (function() {
      var _results;
      _results = [];
      for (i = start; start <= end ? i <= end : i >= end; start <= end ? i++ : i--) {
        _results.push(val);
      }
      return _results;
    })())), _ref;
    return this;
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    var last;
    last = this._index(-1);
    return this[last];
  };
  Array.prototype.uniq = function(eql) {
    var array, val, _i, _len;
    if (eql == null) {
      eql = function(a, b) {
        return a === b;
      };
    }
    array = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      val = this[_i];
      if (!array.isInclude(val, eql)) {
        array.push(val);
      }
    }
    return this.replace(array);
  };
  Array.prototype.index = function(value, eql) {
    var index, _ref;
    if (eql == null) {
      eql = function(a, b) {
        return a === b;
      };
    }
    for (index = 0, _ref = this.length; 0 <= _ref ? index < _ref : index > _ref; 0 <= _ref ? index++ : index--) {
      if (eql(this[index], value)) {
        return index;
      }
    }
    return;
  };
  Array.prototype.indexes = function() {
    var index, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      index = arguments[_i];
      _results.push(this.at(index));
    }
    return _results;
  };
  Array.prototype.rindex = function(value, eql) {
    var index, _ref;
    if (eql == null) {
      eql = function(a, b) {
        return a === b;
      };
    }
    for (index = _ref = this.length; _ref <= 0 ? index < 0 : index > 0; _ref <= 0 ? index++ : index--) {
      if (eql(this[index], value)) {
        return index;
      }
    }
    return;
  };
  Array.prototype.flatten = function() {
    return this.replace(this.reduce(function(a, b) {
      return a.concat(b instanceof Array ? b.flatten() : b);
    }, []));
  };
  Array.prototype.transpose = function() {
    var h, i, t, w, x, y;
    w = this.isEmpty() ? 0 : this.length;
    h = this.first() instanceof Array ? this.first().length : 0;
    if (!w || !h) {
      return this;
    }
    t = (function() {
      var _results;
      _results = [];
      for (i = 0; 0 <= h ? i < h : i > h; 0 <= h ? i++ : i--) {
        _results.push([]);
      }
      return _results;
    })();
    for (x = 0; 0 <= w ? x < w : x > w; 0 <= w ? x++ : x--) {
      for (y = 0; 0 <= h ? y < h : y > h; 0 <= h ? y++ : y--) {
        t[y][x] = this[x][y];
      }
    }
    return this.replace(t);
  };
  Array.prototype.compact = function() {
    return this.deleteIf(function(value) {
      return value === void 0;
    });
  };
  Array.prototype.isInclude = function(val, eql) {
    var elem, _i, _len;
    if (eql == null) {
      eql = function(a, b) {
        return a === b;
      };
    }
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      elem = this[_i];
      if (eql(elem, val)) {
        return true;
      }
    }
    return false;
  };
  Array.prototype.size = function() {
    return this.length;
  };
  Array.prototype.swap = function(a, b) {
    var tmp;
    a = this._index(a);
    b = this._index(b);
    tmp = this[a];
    this[a] = this[b];
    this[b] = tmp;
    return this;
  };
  Array.prototype.shuffle = function() {
    var i, _ref;
    for (i = 0, _ref = this.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this.swap(i, Math.floor(Math.random() * this.length));
    }
    return this;
  };
  Array.prototype.choice = function() {
    return this[Math.floor(Math.random() * this.length)];
  };
  Array.prototype.count = function(val, eql) {
    var index, sum, _ref;
    if (eql == null) {
      eql = function(a, b) {
        return a === b;
      };
    }
    sum = 0;
    for (index = 0, _ref = this.length; 0 <= _ref ? index < _ref : index > _ref; 0 <= _ref ? index++ : index--) {
      if (eql(this[index], val)) {
        ++sum;
      }
    }
    return sum;
  };
  Array.prototype.replace = function(other) {
    var elem, _i, _len;
    this.clear();
    for (_i = 0, _len = other.length; _i < _len; _i++) {
      elem = other[_i];
      this.push(elem);
    }
    return this;
  };
  Array.prototype.nitems = function() {
    return this.clone().compact().size();
  };
  Array.prototype.insert = function() {
    var args, i, index, values, _ref;
    args = Array.prototype.slice.call(arguments, 0, arguments.length);
    if (args.size() <= 1) {
      return this;
    }
    index = this._index(args[0]);
    values = args.slice(1, this.length);
    for (i = 0, _ref = values.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      this.splice(index + i, 0, values[i]);
    }
    return this;
  };
  Array.prototype.clear = function() {
    var _results;
    _results = [];
    while (!this.isEmpty()) {
      _results.push(this.deleteAt(0));
    }
    return _results;
  };
  Array.prototype.max = function(cmp) {
    var result;
    if (cmp == null) {
      cmp = function(a, b) {
        if (a === b) {
          return 0;
        }
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      };
    }
    result = this.first();
    this.reduce(function(a, b) {
      if (cmp(result, b) < 0) {
        return result = b;
      }
    });
    return result;
  };
  Array.prototype.min = function(cmp) {
    var result;
    if (cmp == null) {
      cmp = function(a, b) {
        if (a === b) {
          return 0;
        }
        if (a < b) {
          return -1;
        } else {
          return 1;
        }
      };
    }
    result = this.first();
    this.reduce(function(a, b) {
      if (cmp(result, b) >= 0) {
        return result = b;
      }
    });
    return result;
  };
  Timer = (function() {
    function Timer(max, repeat, time, active, complete) {
      if (repeat == null) {
        repeat = false;
      }
      if (time == null) {
        time = 0;
      }
      if (active == null) {
        active = false;
      }
      if (complete == null) {
        complete = void 0;
      }
      this.set(max);
      this._time = time;
      this._active = active;
      this._complete = complete;
      this._repeat = repeat;
    }
    Timer.prototype.set = function(max) {
      if (max == null) {
        max = 0;
      }
      this._max = max;
      return this;
    };
    Timer.prototype.play = function() {
      this._active = true;
      return this;
    };
    Timer.prototype.stop = function() {
      this._active = false;
      this._time = 0;
      return this;
    };
    Timer.prototype.pause = function() {
      this._active = false;
      return this;
    };
    Timer.prototype.reset = function() {
      this._time = 0;
      return this;
    };
    Timer.prototype.tick = function() {
      if (this._time < this._max && this._active) {
        ++this._time;
        if (this._time === this._max) {
          if (this._complete != null) {
            this._complete();
          }
          if (this._repeat) {
            this._time = 0;
          }
        }
      }
      return this;
    };
    Timer.prototype.now = function() {
      return this._time;
    };
    Timer.prototype.max = function() {
      return this._max;
    };
    Timer.prototype.setNow = function(_time) {
      this._time = _time;
      return this;
    };
    Timer.prototype.setComplete = function(func) {
      this._complete = func;
      return this;
    };
    Timer.prototype.setRepeat = function(repeat) {
      this._repeat = repeat;
      return this;
    };
    Timer.prototype.isActive = function() {
      return this._active;
    };
    Timer.prototype.isOver = function() {
      return this._time >= this._max;
    };
    return Timer;
  })();
  Jukebox = (function() {
    function Jukebox() {}
    Jukebox._sounds = [];
    Jukebox.root = '';
    Jukebox.load = function() {
      var sound, sounds, _i, _len, _results;
      sounds = Array.prototype.slice.call(arguments);
      _results = [];
      for (_i = 0, _len = sounds.length; _i < _len; _i++) {
        sound = sounds[_i];
        _results.push(Jukebox._loadSound(sound));
      }
      return _results;
    };
    Jukebox.play = function(sound) {
      if (!(Jukebox._sounds[sound] != null)) {
        Jukebox._loadSound(sound);
      }
      Jukebox.stop(sound);
      return Jukebox._sounds[sound].play();
    };
    Jukebox.pause = function(sound) {
      if (sound != null) {
        return Jukebox._sounds[sound].pause();
      }
    };
    Jukebox.stop = function(sound) {
      if (sound != null) {
        return Jukebox._sounds[sound].stop();
      }
    };
    Jukebox._loadSound = function(sound, mimetype) {
      if (!(Jukebox._sounds[sound] != null)) {
        if (mimetype != null) {
          return Jukebox._sounds[sound] = Sound.load("" + Jukebox.root + sound, mimetype);
        } else {
          return Jukebox._sounds[sound] = Sound.load("" + Jukebox.root + sound);
        }
      }
    };
    return Jukebox;
  })();
  enchant();
  Shooting = (function() {
    __extends(Shooting, Game);
    Shooting.prototype.config = {
      WIDTH: 640,
      HEIGHT: 480,
      FPS: 30,
      FONT: 'Helvetica',
      IMAGE_PATH: 'resources/images/',
      IMAGES: [],
      SOUND_PATH: 'resources/sounds/',
      SOUNDS: [],
      INITIAL_LEVEL: 1,
      LAST_LEVEL: 7,
      LEVEL_TIME: 30
    };
    function Shooting() {
      var image, root, sound, _i, _j, _len, _len2, _ref, _ref2;
      Shooting.__super__.constructor.call(this, this.config.WIDTH, this.config.HEIGHT);
      this.fps = this.config.FPS;
      this.keybind(90, 'a');
      this.keybind(88, 'b');
      Shooting.game = this;
      Shooting.config = this.config;
      _ref = this.config.IMAGES;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        image = _ref[_i];
        this.preload("" + this.config.IMAGE_PATH + image);
      }
      Jukebox.root = this.config.SOUND_PATH;
      _ref2 = this.config.SOUNDS;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        sound = _ref2[_j];
        Jukebox._loadSound(sound, 'audio/wav');
      }
      root = new MainScene();
      this.start();
    }
    return Shooting;
  })();
  window.onload = function() {
    return new Shooting();
  };
  MainScene = (function() {
    __extends(MainScene, Scene3D);
    function MainScene() {
      var camera;
      MainScene.__super__.constructor.apply(this, arguments);
      this.setDirectionalLight = new DirectionalLight();
      camera = new Camera3D();
      this.ball = new Cube();
      this.ball.mesh.texture = new Texture("resources/images/gigicat.png");
      this.ball.z = -10;
      this.ball.rotX = 0;
      this.ball.addEventListener('enterframe', function(e) {
        this.rotX += 0.01;
        return this.rotation = [Math.cos(this.rotX), 0, -Math.sin(this.rotX), 0, 0, 1, 0, 0, Math.sin(this.rotX), 0, Math.cos(this.rotX), 0, 0, 0, 0, 1];
      });
      this.addChild(this.ball);
    }
    return MainScene;
  })();
}).call(this);

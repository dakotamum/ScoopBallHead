// Object for managing keyboard input
MyGame.input.Keyboard = function () {
  "use-strict";
  let that = {
    keys: {},
    handlers: {},
  };

  // add pressed key to keys array
  function keyPress(e) {
    that.keys[e.key] = e.timeStamp;
  }

  // remove released key from keys and call on-release handler
  function keyRelease(e) {
    that.keys[e.key];
    if (that.handlers[e.key] && that.handlers[e.key].onReleaseHandler) {
      that.handlers[e.key].onReleaseHandler();
    }
    delete that.keys[e.key];
  }

  // call on-press handlers for each key
  that.update = function (elapsedTime) {
    for (let key in that.keys) {
      if (that.keys.hasOwnProperty(key) && that.handlers[key]) {
        if (that.handlers[key].onPressHandler) {
          that.handlers[key].onPressHandler(elapsedTime);
        }
      }
    }
  };

  // register on-press handler and optional on-release handler
  that.register = function (key, onPressHandler, onReleaseHandler) {
    that.handlers[key] = {};
    that.handlers[key].onPressHandler = onPressHandler;
    if (onReleaseHandler) {
      that.handlers[key].onReleaseHandler = onReleaseHandler;
    }
  };

  // unregister a key
  that.unregister = function (key) {
    delete that.handlers[key];
  };

  window.addEventListener("keydown", keyPress);
  window.addEventListener("keyup", keyRelease);
  return that;
};

MyGame.queue = function () {
  "use strict";
  let that = [];

  that.enqueue = function (value) {
    that.push(value);
  };

  that.dequeue = function () {
    return that.shift();
  };

  Object.defineProperty(that, "front", {
    get: () => that[0],
  });

  Object.defineProperty(that, "empty", {
    get: () => {
      return that.length === 0;
    },
  });

  return that;
};

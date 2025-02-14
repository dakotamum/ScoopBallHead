MyGame.objects.remotePlayer = function (spec) {
  "use strict";
  // constants
  const velocityConstant = 0.000175;

  let state = {
    center: {
      x: 0.5,
      y: 0.5,
    },
  };
  let goal = {
    center: {
      x: 0.5,
      y: 0.5,
    },
    updateWindow: 0,
  };

  let radius = 0.05;
  let fill = "#a065cd";
  let stroke = "#ddf8d0";

  function update(elapsedTime) {
    // protect against divide by 0 before the first update from the server has been given
    // if (goal.updateWindow === 0) return;

    let goalTime = Math.min(elapsedTime, goal.updateWindow);

    if (goalTime > 0) {
      let updateFraction = elapsedTime / goal.updateWindow;
      state.center.x -= (state.center.x - goal.center.x) * updateFraction;
      state.center.y -= (state.center.y - goal.center.y) * updateFraction;
    }
  }

  let api = {
    // move: move,
    update: update,
    get state() {
      return state;
    },
    get goal() {
      return goal;
    },
    set state(val) {
      state = val;
    },
    set goal(val) {
      goal = val;
    },
    get radius() {
      return radius;
    },
    set radius(val) {
      radius = val;
    },
    get fill() {
      return fill;
    },
    get stroke() {
      return stroke;
    },
  };
  return api;
};

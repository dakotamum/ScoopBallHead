MyGame.objects.remotePlayer = function (spec) {
  "use strict";
  // constants
  const velocityConstant = 0.000175;

  let state = {
    center: {
      x: 0.5,
      y: 0.5
    }
  }
  let goal = {
    center: {
      x: 0.5,
      y: 0.5
    },
    updateWindow: 0
  }

  let radius = 0.05;
  let fill = "#a065cd";
  let stroke = "#ddf8d0";

  function move(message) {
    let angle = 0;
    switch (message.direction) {
      case "up-left":
        angle = (5 * Math.PI) / 4;
        break;
      case "up-right":
        angle = (7 * Math.PI) / 4;
        break;
      case "down-left":
        angle = (3 * Math.PI) / 4;
        break;
      case "down-right":
        angle = Math.PI / 4;
        break;
      case "up":
        angle = (3 * Math.PI) / 2;
        break;
      case "down":
        angle = Math.PI / 2;
        break;
      case "left":
        angle = Math.PI;
        break;
      case "right":
        angle = 0;
        break;
    }
    center.x += message.updateWindow * velocityConstant * Math.cos(angle);
    center.y += message.updateWindow * velocityConstant * Math.sin(angle);
  }

  function update(elapsedTime) {
    // protect against divide by 0 before the first update from the server has been given
    if (goal.updateWindow === 0) return;

    let updateFraction = elapsedTime / goal.updateWindow;
    if (updateFraction > 0) {
        state.center.x -= (state.center.x - goal.center.x) * updateFraction;
        state.center.y -= (state.center.y - goal.center.y) * updateFraction;
    }
  }

  let api = {
    move: move,
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

MyGame.objects.remotePlayer = function (spec) {
  "use strict";

  let state = {
    center: {
      x: 0.5,
      y: 0.5,
    },
  };
  let goal = {
    center: {
      x: state.center.x,
      y: state.center.y,
    },
    start: {
      x: state.center.x,
      y: state.center.y,
    },
    updateWindow: 0,
    t: 0,
  };

  let radius = 0.05;
  let fill = "#a065cd";
  let stroke = "#ddf8d0";

  // called when a server snapshot for this remote player arrives
  function onServerUpdate(snapshot) {
    const s = state.center;
    goal = {
      start: { x: s.x, y: s.y },
      center: { x: snapshot.x, y: snapshot.y },
      updateWindow: Math.max(1, snapshot.updateWindow), // ms, avoid 0
      t: 0,
    };
  }

  function update(elapsedTime) {
    if (!goal) return;

    const dx = goal.center.x - state.center.x;
    const dy = goal.center.y - state.center.y;
    if (dx * dx + dy * dy > ((3 * 1) / 16) * ((3 * 1) / 16)) {
      state.center.x = goal.center.x;
      state.center.y = goal.center.y;
      goal.t = goal.updateWindow;
      return;
    }

    goal.t = Math.min(goal.t + elapsedTime, goal.updateWindow);
    const arpha = goal.updateWindow > 0 ? goal.t / goal.updateWindow : 1;

    state.center.x = goal.start.x + (goal.center.x - goal.start.x) * arpha;
    state.center.y = goal.start.y + (goal.center.y - goal.start.y) * arpha;
  }

  let api = {
    onServerUpdate: onServerUpdate,
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

"use strict";

let movement = require("../shared/movement");

function roundToThousandth(value) {
  return Math.round(value * 1000) / 1000;
}

function createPlayer(id) {
  const velocityConstant = 0.000175;
  let privateId = id;

  let center = {
    x: 0.5,
    y: 0.5,
  };
  let radius = 0.05;
  let fill = "#ea92ab";
  let stroke = "#61567d";
  let reportUpdate = false;

  function move(message) {
    movement.moveIt(message, center);
    reportUpdate = true;
  }

  function update(elapsedTime) {}

  let api = {
    update: update,
    move: move,

    get center() {
      return center;
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
    get id() {
      return privateId;
    },
    set id(anId) {
      privateId = anId;
    },
    set reportUpdate(value) {
      reportUpdate = value;
    },
    get reportUpdate() {
      return reportUpdate;
    },
  };
  return api;
}

module.exports.create = (id) => createPlayer(id);

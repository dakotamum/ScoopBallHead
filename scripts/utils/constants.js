const WORLD_DIMENSIONS = { height: 3, width: 3 };
const COLOR_THEME = [
  "#3c42c4",
  "#2f2f2f",
  "#a065cd",
  "#ce79d2",
  "#d68fb8",
  "#dda2a3",
  "#eac4ae",
  "#f4dfbe",
];

if (typeof module !== "undefined") {
  module.exports.WORLD_DIMENSIONS = WORLD_DIMENSIONS;
  module.exports.COLOR_THEME = COLOR_THEME;
}

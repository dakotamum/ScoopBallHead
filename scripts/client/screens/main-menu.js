// Main menu screen
MyGame.screens["main-menu"] = (function (game) {
  "use-strict";

  // register event listeners for buttons
  function initialize() {
    document
      .getElementById("new-game-button")
      .addEventListener("click", function () {
        game.showScreen("username");
      });
    document
      .getElementById("high-scores-button")
      .addEventListener("click", function () {
        game.showScreen("high-scores");
      });
    document
      .getElementById("controls-button")
      .addEventListener("click", function () {
        game.showScreen("controls");
      });
    document
      .getElementById("about-button")
      .addEventListener("click", function () {
        game.showScreen("about");
      });
  }
  function run() {
    // do nothing
  }
  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game);

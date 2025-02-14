// Main menu screen
MyGame.screens["main-menu"] = (function (game, assets) {
  "use-strict";

  // register event listeners for buttons
  function initialize() {
    document
      .getElementById("new-game-button")
      .addEventListener("click", function () {
        game.showScreen("username");
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
  function run() {}
  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game, MyGame.assets);

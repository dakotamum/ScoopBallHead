MyGame.screens["game-over"] = (function (game) {
  "use-strict";

  // register event listener for back button
  function initialize() {
    document
      .getElementById("game-over-main-menu")
      .addEventListener("click", function () {
        game.showScreen("main-menu");
      });
    document
      .getElementById("game-over-restart")
      .addEventListener("click", function () {
        game.showScreen("gameplay");
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

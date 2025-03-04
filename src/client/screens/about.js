MyGame.screens["about"] = (function (game) {
  "use-strict";

  // register event listener for back button
  function initialize() {
    document
      .getElementById("about-back")
      .addEventListener("click", function () {
        game.showScreen("main-menu");
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

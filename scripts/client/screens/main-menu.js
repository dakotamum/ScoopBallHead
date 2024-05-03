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
    assets.mainMenuMusic.loop = true;
    assets.mainMenuMusic.play();
  }
  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game, MyGame.assets);

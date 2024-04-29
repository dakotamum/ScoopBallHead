// Controls screen
MyGame.screens["username"] = (function (game, persistence) {
  "use-strict";

  // register event listener for back button
  function initialize() {
    document.getElementById("username-input").value = persistence.username
    document.getElementById("username-back").addEventListener("click", function () {
      game.showScreen("main-menu")
    });
    document.getElementById("enter").addEventListener("click", function () {
      persistence.setUsername(document.getElementById("username-input").value)
      game.showScreen("gameplay")
    });
  }

  // displays the current controls and allows the user to change them
  function run() {
  }
  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game, MyGame.persistence);

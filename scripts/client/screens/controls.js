// Controls screen
MyGame.screens["controls"] = (function (game, persistence) {
  "use-strict";

  // register event listener for back button
  function initialize() {
    document
      .getElementById("controls-back")
      .addEventListener("click", function () {
        game.showScreen("main-menu");
      });
  }

  // displays the current controls and allows the user to change them
  function run() {
    let ids = ["up", "down", "left", "right"];
    for (let i = 0; i < ids.length; i++) {
      document.getElementById(ids[i]).innerHTML = persistence.controls[ids[i]];
      document.getElementById(ids[i]).addEventListener("click", function () {
        document.getElementById(ids[i]).innerHTML = "Press a key";
        document
          .getElementById(ids[i])
          .addEventListener("keydown", function (event) {
            persistence.changeControl(ids[i], event.key);
            document.getElementById(ids[i]).innerHTML =
              persistence.controls[ids[i]];
          });
      });
    }
  }
  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game, MyGame.persistence);

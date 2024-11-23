// Victory screen shown after winning the game
MyGame.screens["victory"] = (function (game, persistence, gameModel) {
  "use-strict";
  let victoryNameInput = document.getElementById("victory-name");
  let victorySaveButton = document.getElementById("victory-submit");

  // register event listers for buttons
  function initialize() {
    document
      .getElementById("victory-back")
      .addEventListener("click", function () {
        game.showScreen("main-menu");
      });
    document
      .getElementById("victory-restart")
      .addEventListener("click", function () {
        game.showScreen("gameplay");
      });
    victorySaveButton.addEventListener("click", function () {
      persistence.addScore(victoryNameInput.value, gameModel.currentScore);

      highScoreNotice.style.display = "none";
      victoryNameInput.style.display = "none";
      victorySaveButton.style.display = "none";
    });
  }

  // shows the score and shows name entry option if score is in the top 5 highscores
  function run() {
    if (persistence.isTopFive(gameModel.currentScore)) {
      highScoreNotice.style.display = "block";
      victorySaveButton.style.display = "block";
      victoryNameInput.style.display = "block";
      victoryNameInput.value = "";
      victorySaveButton.disabled = true;
      victoryNameInput.addEventListener("input", function () {
        if (victoryNameInput.value.length > 0) {
          victorySaveButton.disabled = false;
        } else {
          victorySaveButton.disabled = true;
        }
      });
    } else {
      highScoreNotice.style.display = "none";
      victoryNameInput.style.display = "none";
      victorySaveButton.style.display = "none";
    }
  }

  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game, MyGame.persistence, MyGame.gameModel);

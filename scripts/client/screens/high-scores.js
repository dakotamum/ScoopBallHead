// High-scores screen
MyGame.screens["high-scores"] = (function (game, persistence) {
  "use strict";

  // register event listener for back button
  function initialize() {
    document
      .getElementById("high-scores-back")
      .addEventListener("click", function () {
        game.showScreen("main-menu");
      });
  }

  // displays the top 5 highscores
  function run() {
    let scores = persistence.getOrderedScores();
    let table = document.getElementById("high-scores-table");

    while (table.children.length > 1) {
      table.removeChild(table.lastChild);
    }
    for (let i = 0; i < 5; i++) {
      if (scores[i] === undefined) {
        break;
      }

      let tableRow = document.getElementById(`rank-${i + 1}`);
      tableRow.innerHTML = "";
      let rank = document.createElement("td");
      rank.innerHTML = i + 1;
      tableRow.appendChild(rank);
      let name = document.createElement("td");
      name.innerHTML = scores[i].name;
      tableRow.appendChild(name);
      let score = document.createElement("td");
      score.innerHTML = scores[i].score;
      tableRow.appendChild(score);
    }
  }
  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game, MyGame.persistence);

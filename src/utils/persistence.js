// Provides methods for storing and accessing high scores and control settings
MyGame.persistence = (function () {
  "use-strict";
  // get high scores and control settings from local storage if they exist
  let highScores = localStorage.getItem("MyGame.highScores");
  if (highScores !== null) {
    highScores = JSON.parse(highScores);
  } else {
    highScores = {};
  }
  let controls = localStorage.getItem("MyGame.controls");
  if (controls !== null) {
    controls = JSON.parse(controls);
  } else {
    controls = {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
    };
  }
  let username = localStorage.getItem("MyGame.username");
  if (username !== null) {
    username = JSON.parse(username);
  } else {
    username = "";
  }

  // add score to local storage, removing the lowest score if necessary
  function addScore(key, value) {
    let orderedScores = getOrderedScores();
    if (orderedScores.length < 5 || value > orderedScores[4].score) {
      // if there are already 5 scores, remove the lowest one
      if (orderedScores.length >= 5 && value > orderedScores[4].score) {
        let valueToDelete = orderedScores[4].score;
        highScores[orderedScores[4].name] = highScores[
          orderedScores[4].name
        ].filter((item) => item !== valueToDelete);
      }
      if (highScores[key] === undefined) {
        highScores[key] = [value];
      } else {
        highScores[key].push(value);
      }
      localStorage["MyGame.highScores"] = JSON.stringify(highScores);
    }
  }

  // remove a score from local storage
  function remove(key) {
    delete highScores[key];
    localStorage["MyGame.highScores"] = JSON.stringify(highScores);
  }

  // change a control setting
  function changeControl(key, value) {
    controls[key] = value;
    localStorage["MyGame.controls"] = JSON.stringify(controls);
  }

  // get the high scores in descending order
  function getOrderedScores() {
    let unorderedScores = [];
    for (let i in highScores) {
      for (let j = 0; j < highScores[i].length; j++) {
        unorderedScores.push({
          name: i,
          score: highScores[i][j],
        });
      }
    }
    let orderedScores = unorderedScores.sort(function (a, b) {
      return b.score - a.score;
    });
    return orderedScores;
  }

  // check if a score is in the top 5
  function isTopFive(score) {
    let orderedScores = getOrderedScores();
    if (orderedScores.length < 5 || score > orderedScores[4].score) {
      return true;
    }
    return false;
  }

  function setUsername(name) {
    username = name;
    localStorage["MyGame.username"] = JSON.stringify(username);
  }

  return {
    addScore: addScore,
    remove: remove,
    changeControl: changeControl,
    isTopFive: isTopFive,
    getOrderedScores: getOrderedScores,
    setUsername: setUsername,
    get controls() {
      return controls;
    },
    get highScores() {
      return highScores;
    },
    get username() {
      return username;
    },
  };
})();

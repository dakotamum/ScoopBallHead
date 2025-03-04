// MyGameplay screen
MyGame.screens["gameplay"] = (function (
  game,
  input,
  gameModel,
  graphics,
  assets,
) {
  "use-strict";
  let elapsedTime = 0;
  let previousTime = performance.now();
  let myKeyboard = input.Keyboard();
  let cancelNextRequest = false;

  function processKeyboardInput(elapsedTime) {
    myKeyboard.update(elapsedTime);
    gameModel.processKeyboardInput(elapsedTime);
  }

  function update(elapsedTime) {
    gameModel.update(elapsedTime);
  }

  function render(elapsedTime) {
    graphics.clear();
    gameModel.render(elapsedTime);
  }

  function gameLoop(time) {
    elapsedTime = time - previousTime;
    previousTime = time;
    processKeyboardInput(elapsedTime);
    update(elapsedTime);
    render(elapsedTime);
    if (!cancelNextRequest) requestAnimationFrame(gameLoop);
  }

  function initialize() {
    myKeyboard.register("Escape", function () {
      cancelNextRequest = true;
      gameModel.disconnect();
      gameModel.disableControls();
      game.showScreen("main-menu");
    });
  }

  function run() {
    previousTime = performance.now();
    cancelNextRequest = false;
    gameModel.setupMyGame();
    requestAnimationFrame(gameLoop);
  }

  return {
    initialize: initialize,
    run: run,
  };
})(MyGame.game, MyGame.input, MyGame.gameModel, MyGame.graphics, MyGame.assets);

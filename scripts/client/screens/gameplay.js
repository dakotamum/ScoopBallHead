// MyGameplay screen
MyGame.screens["gameplay"] = (function (
  game,
  input,
  gameModel,
  graphics,
  assets
) {
  "use-strict";
  let elapsedTime = 0;
  let previousTime = performance.now();
  let myKeyboard = input.Keyboard();
  let cancelNextRequest = false;

  // process input from keyboard
  function processInput(elapsedTime) {
    myKeyboard.update(elapsedTime);
    gameModel.processInput(elapsedTime);
  }

  // update game model
  function update(elapsedTime) {
    gameModel.update(elapsedTime);
  }

  // render game model
  function render(elapsedTime) {
    graphics.clear();
    gameModel.render(elapsedTime);
  }

  // main game loop
  function gameLoop(time) {
    elapsedTime = time - previousTime;
    previousTime = time;
    processInput(elapsedTime);
    update(elapsedTime);
    render(elapsedTime);
    if (!cancelNextRequest) requestAnimationFrame(gameLoop);
  }

  // register event listeners for buttons
  function initialize() {
    myKeyboard.register("Escape", function () {
      cancelNextRequest = true;
      gameModel.disconnect();
      gameModel.disableControls();
      game.showScreen("main-menu");
    });
  }

  // setup game model and start game loop
  function run() {
    assets.mainMenuMusic.pause();
    assets.mainMenuMusic.currentTime = 0;
    previousTime = performance.now();
    cancelNextRequest = false;
    gameModel.setupMyGame();
    requestAnimationFrame(gameLoop);
  }

  return {
    initialize: initialize,
    run: run,
  };
})(
  MyGame.game,
  MyGame.input,
  MyGame.gameModel,
  MyGame.graphics,
  MyGame.assets
);

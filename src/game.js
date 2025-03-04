// top level game manager
MyGame.game = (function (screens) {
  "use-strict";

  // show the screen with the given id
  function showScreen(id) {
    let activeScreens = document.getElementsByClassName("active");
    for (let screen = 0; screen < activeScreens.length; screen++) {
      activeScreens[screen].classList.remove("active");
    }
    screens[id].run();
    document.getElementById(id).classList.add("active");
  }

  // initialize all screens
  function initialize() {
    let screen = null;
    for (screen in screens) {
      if (screens.hasOwnProperty(screen)) {
        screens[screen].initialize();
      }
    }
    // TODO: switch back to main-menu after debuggering :)
    showScreen("gameplay");
  }
  return {
    initialize: initialize,
    showScreen: showScreen,
  };
})(MyGame.screens);

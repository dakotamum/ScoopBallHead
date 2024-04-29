// renderer for a player
MyGame.renderer.player = (function (graphics, assets) {
  "use-strict";

  // render the player
  function render(spec) {
    graphics.drawCircle(spec);
  }

  return {
    render: render,
  };
})(MyGame.graphics, MyGame.assets);

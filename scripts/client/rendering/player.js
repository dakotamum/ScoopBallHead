// renderer for a player
MyGame.renderer.player = (function (graphics, assets) {
  "use-strict";

  // render the player
  function render(spec) {
    graphics.drawHead(spec);
    graphics.drawTexture(assets.player, spec.center, 0, spec.radius * 3.75);
  }

  return {
    render: render,
  };
})(MyGame.graphics, MyGame.assets);

const handlePlayers = (data) => {
  data.players.forEach(player => {
    handlePlayerMovement(data, player);
  });
}

const handlePlayerMovement = (data, player) => {
  if (
    player.isFrozen
  ) {
    /* Player did not move this frame or is frozen */
    return;
  }

  let mousePos = data.game.input.mousePointer;

  /* The clamping is a bad solution but necessary for fluent mouse controls. */
  player.x = Phaser.Math.Clamp(
    mousePos.x,
    FLOOR_EDGE_POINTS.topLeft.x,
    FLOOR_EDGE_POINTS.topRight.x
  );

  player.y = Phaser.Math.Clamp(
    mousePos.y,
    FLOOR_EDGE_POINTS.topLeft.y,
    FLOOR_EDGE_POINTS.bottomLeft.y
  );

  player.$data.light.x = player.x;
  player.$data.light.y = player.y;
}
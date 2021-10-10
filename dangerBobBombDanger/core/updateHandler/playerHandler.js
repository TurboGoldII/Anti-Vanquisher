const handlePlayers = (data) => {
  handlePlayerMovement(data, data.players);
}

let handlePlayerMovement = () => { }

const handlePlayerMovementCoop = (data, players) => {
  for (let i = 0; i < players.length; i++) {
    players[i].setImmovable();
    players[i].setVelocity(0, 0);

    if (players[i].isFrozen) {
      continue;
    }

    for (const key in data.keys[i]) {
      if (data.keys[i][key].keyObject.isDown) {
        data.keys[i][key].function(players[i]);
      }
    }

    players[i].$data.firefly.x = Phaser.Math.Clamp(
      players[i].x,
      FLOOR_EDGE_POINTS.topLeft.x,
      FLOOR_EDGE_POINTS.topRight.x
    );

    players[i].$data.firefly.y = Phaser.Math.Clamp(
      players[i].y,
      FLOOR_EDGE_POINTS.topLeft.y,
      FLOOR_EDGE_POINTS.bottomLeft.y
    );

    players[i].$data.firefly.$data.light.x = players[i].$data.firefly.x;
    players[i].$data.firefly.$data.light.y = players[i].$data.firefly.y;
    players[i].x = players[i].$data.firefly.x;
    players[i].y = players[i].$data.firefly.y
    players[i].$data.light.x = players[i].x;
    players[i].$data.light.y = players[i].y;
  }
}

const handlePlayerMovementSinglePlayer = (data, players) => {
  const player = players[0];

  let mousePos = data.game.input.mousePointer;

  /*
   * The firefly moves independent of the frozen status. The clamping is a bad
   * solution but necessary for fluent mouse controls.
   */
  player.$data.firefly.x = Phaser.Math.Clamp(
    mousePos.x,
    FLOOR_EDGE_POINTS.topLeft.x,
    FLOOR_EDGE_POINTS.topRight.x
  );

  player.$data.firefly.y = Phaser.Math.Clamp(
    mousePos.y,
    FLOOR_EDGE_POINTS.topLeft.y,
    FLOOR_EDGE_POINTS.bottomLeft.y
  );

  player.$data.firefly.$data.light.x = player.$data.firefly.x;
  player.$data.firefly.$data.light.y = player.$data.firefly.y;

  if (player.isFrozen) {
    return;
  }

  player.x = player.$data.firefly.x;
  player.y = player.$data.firefly.y
  player.$data.light.x = player.x;
  player.$data.light.y = player.y;
}
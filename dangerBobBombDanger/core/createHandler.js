const handlerCreate = function (data) {
  data.game.lights.enable().setAmbientColor(LIGHT_COLOR);
  ++$gameId;
  $soundHandler = new SoundHandler();
  $soundHandler.playBackgroundMusic();

  let floor = data.game.add.image(GAME_CENTER.x, GAME_CENTER.y, 'lava');
  floor.setPipeline('Light2D');
  createPlayers(data);

  /*
   * TO-DO: The current implementation sticks the player to the mouse. By
   * leaving the canvas with the mouse, the player character can be
   * teleported. A better implementation would be to accellerate the players
   * movement into the mouse cursors direction.
   */

  const limitPlayerMovementEvent = (pointer) => {
    limitPlayerMovement(data.players[0], pointer)
  }

  data.game.input.on('pointermove', limitPlayerMovementEvent);
  scoreSingleton.init(data.EventBus);
  Projectile.init(data);
  createAnimations(data.game);
}

const createPlayers = (data) => {
  for (let i = 0; i < data.playerSettings.length; i++) {
    let player = data.game.physics.add.sprite(
      START_POS[i].x,
      START_POS[i].y,
      data.playerSettings[i].sprite.name
    );

    /* Disables the automatic physics pushing from the Phaser physics */
    player.setImmovable();

    player.$data = {};
    player.setScale(data.playerSettings[i].context.scale);

    player.setSize(
      data.playerSettings[i].context.hitbox.x,
      data.playerSettings[i].context.hitbox.y
    );

    player.setOffset(
      data.playerSettings[i].context.offset.x,
      data.playerSettings[i].context.offset.y
    );

    player.setPipeline('Light2D');
    player.$data.settings = data.playerSettings[i];

    let light = data.game.lights.addLight(player.x, player.y, 200);
    player.$data.light = light;

    createPlayerAnimation(data.game, player, player.$data.settings.sprite);
    data.players.push(player);
  }
}

/**
 * Sadly, these stage bounds here always have to be fine-tuned by the
 * programmer. Test it out, once the right textures are installed.
 * 
 * @param {object} pointer 
 */
const limitPlayerMovement = function (player, pointer) {
  player.x = Phaser.Math.Clamp(
    pointer.x,
    FLOOR_EDGE_POINTS.topLeft.x,
    FLOOR_EDGE_POINTS.topRight.x
  );

  player.y = Phaser.Math.Clamp(
    pointer.y,
    FLOOR_EDGE_POINTS.topLeft.y,
    FLOOR_EDGE_POINTS.bottomLeft.y
  );

  player.$data.light.x = player.x;
  player.$data.light.y = player.y;
}

const createPlayerAnimation = function (game, player, sprite) {
  if (!game || !player || !sprite) {
    throw 'Insufficient data for player animation given (game, player or sprite was empty)';
  }

  /* animObject = { frames, frameRate, repeat } */
  const animObject = sprite.anim;
  const name = sprite.name;

  if (!name || !animObject || !animObject.frames) {
    throw 'Insufficient data for player animation given (name, animObject or animObject.frames was empty)';
  }

  const frames = animObject.frames;
  const frameRate = animObject.frameRate || 1;
  const repeat = animObject.repeat || 0;

  game.anims.create({
    key: name,
    frames: game.anims.generateFrameNumbers(name, frames),
    frameRate: frameRate,
    repeat: repeat
  });

  player.anims.play(name);
}

const createAnimations = function (game) {
  for (let i = 0; i < SPRITE_SHEETS.length; i++) {
    if (SPRITE_SHEETS[i].anim) {
      game.anims.create({
        key: SPRITE_SHEETS[i].name,
        frames: game.anims.generateFrameNumbers(SPRITE_SHEETS[i].name, SPRITE_SHEETS[i].anim.frames),
        frameRate: SPRITE_SHEETS[i].anim.frameRate,
        repeat: SPRITE_SHEETS[i].anim.repeat
      });
    }
  }
}
const handlerCreate = function (data) {
  ++$gameId;
  $soundHandler = new SoundHandler();
  $soundHandler.playBackgroundMusic();

  data.game.add.image(GAME_CENTER.x, GAME_CENTER.y, 'lava');
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
    let player = data.game.physics.add.sprite(START_POS[i].x, START_POS[i].y, data.playerSettings[i].sprite.name);
    player.$data = {};
    player.setScale(data.playerSettings[i].context.scale);
    player.setSize(data.playerSettings[i].context.hitbox.x, data.playerSettings[i].context.hitbox.y);
    player.setOffset(data.playerSettings[i].context.offset.x, data.playerSettings[i].context.offset.y);
    player.$data.settings = data.playerSettings[i];
    createPlayerAnimation(data.game, player.$data.settings.sprite);
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
}

const createPlayerAnimation = function (game, animObject) {
  /* animObject = { name, frames, frameRate, repeate } */
  if (!animObject.name || !animObject.frames) return;
  const name = animObject.name;
  const frames =  animObject.frames;
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
const handleCreate = function (data) {
  data.game.lights.enable().setAmbientColor(LIGHT_COLOR_AMBIENCE);
  ++$gameId;
  $backgroundMusic = new Sound('backgroundMusic');
  $backgroundMusic.play();

  let floor = data.game.add.image(GAME_CENTER.x, GAME_CENTER.y, 'lava');
  floor.setPipeline('Light2D');
  createPlayers(data);
  scoreSingleton.init(data.EventBus, data.playerSettings.length - 1);
  Projectile.init(data);
  createAnimations(data.game);
  printStartCountdown(data);
};

const createPlayers = (data) => {
  for (let i = 0; i < data.playerSettings.length; i++) {
    let firefly = data.game.add.sprite(
      START_POS[i].x,
      START_POS[i].y,
      'firefly'
    );

    let fireflyLight = data.game.lights.addLight(
      firefly.x,
      firefly.y,
      LIGHT_RADIUS_FIREFLY
    );

    firefly.anims.play('firefly_bobbing');
    firefly.$data = {};
    firefly.$data.light = fireflyLight;

    let player = data.game.physics.add.sprite(
      START_POS[i].x,
      START_POS[i].y,
      data.playerSettings[i].sprite.name
    );

    /* Disables the automatic physics pushing from the Phaser physics */
    player.setImmovable();
    player.$data = {};
    player.$data.firefly = firefly;
    player.setScale(data.playerSettings[i].context.scale);

    player.setSize(
      data.playerSettings[i].context.hitbox.x,
      data.playerSettings[i].context.hitbox.y
    );

    player.setOffset(
      data.playerSettings[i].context.offset.x,
      data.playerSettings[i].context.offset.y
    );

    player.$data.settings = data.playerSettings[i];

    let playerLight = data.game.lights.addLight(
      player.x, player.y, LIGHT_RADIUS_PLAYER, LIGHT_COLOR_PLAYER, LIGHT_INTENSITY_PLAYER
    );

    player.$data.light = playerLight;
    createPlayerAnimation(data.game, player, player.$data.settings.sprite);
    data.players.push(player);
  }
};

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
};

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
};

/**
 * Prints the 3 - 2 - 1 - GO start countdown. The setTimeout cluster is not
 * very beautiful.
 *
 * @param {object} data Full game data
 */
const printStartCountdown = (data) => {
  if (!SHOW_START_COUNTER) {
    data.game.scene.resume();
    return;
  }

  data.game.scene.pause();
  let texter = new TextHandler(data.game);
  let text = texter.createText(GAME_CENTER.x, GAME_CENTER.y, '3');
  text.setOrigin(0.5);

  setTimeout(() => {
    text.text = '2';

    setTimeout(() => {
      text.text = '1';

      setTimeout(() => {
        text.text = 'GO';

        setTimeout(() => {
          text.destroy();
          data.game.scene.resume();
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
};
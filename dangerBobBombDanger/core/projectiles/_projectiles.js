class Projectile {
  // public variables
  collideWithPlayers = null;
  projectileHitPlayer = null;

  // private static variables
  static #EventBus = null
  static #projectilesShot = 0;
  static #fireRate = PROJECTILE_START_FIRE_RATE;
  static #isInit = false;
  static #game = null;
  static #players = null;

  constructor(collideWithPlayers) {
    if (new.target === Projectile) {
      throw TypeError("The class Projectile is abstract and cannot be instanced.");
    }
    // const sound = new SoundHandler('projectileSfx', { volume: SOUND_VOLUME / 2 }).play({ loop: false });
    this.collideWithPlayers = collideWithPlayers;
    this.#initFunctions();
    Projectile.#increaseProjectilesShot();
    // setGameTimeout(() => { sound.destroy(); }, 100, () => { sound.destroy(); });
  }

  static get fireRate() {
    return Projectile.#fireRate;
  }

  #initFunctions() {
    this.projectileHitPlayer = Projectile.#projectileHitPlayer;
  }

  static init(data) {
    if (!Projectile.#isInit) {
      Projectile.#isInit = true;
      Projectile.#EventBus = data.EventBus;
      Projectile.#game = data.game;
      Projectile.#players = data.players;
    }
  }

  static #projectileHitPlayer() {
    if (GOD_MODE) {
      return;
    }

    return;

    $soundHandler.stopBackgroundMusic();
    $soundHandler.playGameOverJingle();
    const player = Projectile.#players[0];

    const vanquishAnim = Projectile.#game.add.sprite(
      player.x, player.y, 'dudeVanquish'
    );

    /* TO-DO: Add light to vanquish */

    player.setImmovable();
    Projectile.#game.lights.addLight(player.x, player.y, LIGHT_RADIUS_PLAYER_VANQUISH, LIGHT_COLOR_PLAYER);
    this.iceballTexture.destroy();
    this.iceballTexture = null;

    // this.#game.anims.remove(player.$data.settings.sprite.name);

    // if (player.$data.settings.frozenSprite) {
    //   player.setTexture(player.$data.settings.frozenSprite.name);
    // }

    // player.isFrozen = true;

    // setGameTimeout(() => {
    //   if (player.$data.settings.frozenSprite && player.$data.settings.frozenSprite.anim) {
    //     this.#game.anims.remove(player.$data.settings.frozenSprite.name);
    //   }

    //   player.isFrozen = false;
    //   player.setTexture(player.$data.settings.sprite.name);
    //   createPlayerAnimation(this.#game, player, player.$data.settings.sprite);
    // }, ICEBALL_FROZEN_TIME);
    //firefly.anims.play('firefly_bobbing');

    /* TO-DO: Open highscore uploader dialog */
  }

  static #resetGame() {
    /* TO-DO: Use this function again */
    Projectile.#EventBus.reset();
    scoreSingleton.reset();
    $soundHandler.stop();
    Projectile.#fireRate = PROJECTILE_START_FIRE_RATE;
    Projectile.#projectilesShot = 0;
    /* Destroy registry */
    Projectile.#game.registry.destroy();
    /* Disable all active events */
    Projectile.#game.events.off();
    /* Restart current scene */
    Projectile.#game.scene.restart();
  }

  static #increaseProjectilesShot() {
    ++this.#projectilesShot;

    if (this.#projectilesShot === PROJECTILE_FIRE_RATE_OFFSET_BEFORE_INCREASE) {
      this.#projectilesShot = 0;
      Projectile.#fireRate += PROJECTILE_FIRE_RATE_INCREMENT;
    }
  }
}

const getVelocityToPlayer = function (src, player, velocity) {
  if (!velocity) {
    velocity = PROJECTILE_VELOCITY;
  }

  var dest = {
    x: player.x,
    y: player.y
  };

  var angle = {
    x: dest.x - src.x,
    y: dest.y - src.y
  };

  var speedX = Math.abs(angle.x);
  var speedY = Math.abs(angle.y);

  var speedMultiplier = Math.sqrt(
    (velocity ** 2) /
    ((speedX ** 2) + (speedY ** 2))
  );

  return { x: angle.x * speedMultiplier, y: angle.y * speedMultiplier };
}

const getRandomBorderPos = function () {
  var x = 0;
  var y = 0;

  if (Math.random() < 0.5) {
    y = Math.floor(Math.random() * GAME_HEIGHT * 100) % GAME_HEIGHT;

    if (Math.random() < 0.5) {
      x = FIREBALL_TURRET_POSITIONS.x.left;
    } else {
      x = FIREBALL_TURRET_POSITIONS.x.right;
    }
  } else {
    x = Math.floor(Math.random() * GAME_WIDTH * 100) % GAME_WIDTH;

    if (Math.random() < 0.5) {
      y = FIREBALL_TURRET_POSITIONS.y.top;
    } else {
      y = FIREBALL_TURRET_POSITIONS.y.bottom;
    }
  }

  return { x: x, y: y };
}

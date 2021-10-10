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
  static #sceneSwitcher = null;
  static #gameOverStarted = false;

  constructor(collideWithPlayers) {
    if (new.target === Projectile) {
      throw TypeError("The class Projectile is abstract and cannot be instanced.");
    }

    this.collideWithPlayers = collideWithPlayers;
    this.#initFunctions();
    Projectile.#increaseProjectilesShot();
  }

  static get fireRate() {
    return Projectile.#fireRate;
  }

  #initFunctions() {
    this.projectileHitPlayer = Projectile.#projectileHitPlayer;
    this.resetGame = Projectile.#resetGame;
  }

  static init(data, sceneSwitcher) {
    if (!Projectile.#isInit) {
      Projectile.#isInit = true;
      Projectile.#EventBus = data.EventBus;
      Projectile.#game = data.game;
      Projectile.#players = data.players;
      Projectile.#sceneSwitcher = sceneSwitcher;
    }
  }

  static #projectileHitPlayer() {
    /*
     * "gameOverStarted" is needed here because otherwise the game over track
     * plays for every further hit, resulting in an ear rape.
     */
    if (GOD_MODE || Projectile.#gameOverStarted) {
      return;
    }

    scoreSingleton.stop();
    Projectile.#gameOverStarted = true;
    $backgroundMusic.stop();
    const gameOverJingle = new Sound('gameOverJingle');
    gameOverJingle.play({ loop: false });

    /* NOTE: It takes about 5.5 seconds to play the gameover jingle. */
    setGameTimeout(() => {
      Projectile.#sceneSwitcher.scene = SCENE_GAME_OVER;
    }, 5500);
  }

  static #resetGame() {
    Projectile.#EventBus.reset();
    scoreSingleton.reset();
    Projectile.#fireRate = PROJECTILE_START_FIRE_RATE;
    Projectile.#projectilesShot = 0;
    Projectile.#gameOverStarted = false;
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

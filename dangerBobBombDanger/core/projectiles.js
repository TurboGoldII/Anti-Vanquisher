class Projectiles {
  static #projectilesShot = 0;
  static #fireRate = FIREBALL_FIRE_RATE_INCREMENT;
  #player = null

  constructor (player) {
    if (new.target === Projectiles) throw TypeError("new of abstract class Node");
    this.#player = player;
  }

  static increaseProjectilesShot() {
    ++this.#projectilesShot;
  
    if (this.#projectilesShot === FIREBALL_FIRE_RATE_OFFSET_BEFORE_INCREASE) {
      this.#projectilesShot = 0;
      this.#fireRate += FIREBALL_FIRE_RATE_INCREMENT;
    }
  }

  static setFireRate(num) {
    if (typeof num !== 'number') {
      console.log('Warning: Projectiles.fireRate must be type number');
      return;
    }
    this.#fireRate = num;
  }

  static getFireRate() {
    return this.#fireRate;
  }

  getVelocityToPlayer(rndTurretPos) {
    var dest = {
      x: this.#player.x,
      y: this.#player.y
    };
  
    var angle = {
      x: dest.x - rndTurretPos.x,
      y: dest.y - rndTurretPos.y
    };
  
    var speedX = Math.abs(angle.x);
    var speedY = Math.abs(angle.y);
  
    var speedMultiplier = Math.sqrt(
      (FIREBALL_VELOCITY ** 2) /
      ((speedX ** 2) + (speedY ** 2))
    );

    return { x: angle.x * speedMultiplier, y: angle.y * speedMultiplier };
  }

  static shootRandomProjectile() {
    Projectiles.increaseProjectilesShot();
    var random = Math.random();
    var offset = 0;
    for (var i = 0; i < PROJECTILES_PROBABILITIES.length; i++) {
      if (random <=  PROJECTILES_PROBABILITIES[i].probability + offset) {
        PROJECTILES_PROBABILITIES[i].function();
        return;
      }
      offset += PROJECTILES_PROBABILITIES[i].probability;
    }
  }

  static getRandomBorderPositionPosition() {
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

  static projectileHitPlayer() {
    $score = 0;
    $soundHandler.stopBackgroundMusic();
    Projectiles.setFireRate(FIREBALL_START_FIRE_RATE);
    //Destroy registry
    $this.registry.destroy();
    //Disable all active events
    $this.events.off();
    //Restart current scene
    $this.scene.restart();
  }
}


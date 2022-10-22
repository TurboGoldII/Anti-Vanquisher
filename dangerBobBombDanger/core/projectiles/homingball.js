class Homingball extends Projectile {
  static numberOfHomingBalls = 0;
  static lightRange = 75;
  static scoreWhenRangeGetsBigger = 1500;
  static maxNumberOfBalls = 8;
  static maxRange = 150;
  #game = null;
  #playersHunt = null;
  #homingballTexture = null;
  #doHunt = true;
  #EventBus = null;
  #projectileHitPlayer = null;
  #currentDirection = null;
  #hash = 0;
  #speed = 0;
  #light = null;
  #lightHash = 0;
  #speedIsSet = false;


  constructor(playersHunt, collideWithPlayers, game, EventBus) {
    super(collideWithPlayers);
    ++Homingball.numberOfHomingBalls;
    this.#game = game;
    this.#playersHunt = playersHunt;
    this.#EventBus = EventBus;
    this.#projectileHitPlayer = this.projectileHitPlayer;
    this.#shootHomingball();
  }

  static reset() {
    Homingball.numberOfHomingBalls = 0;
    Homingball.lightRange = 75;
    Homingball.scoreWhenRangeGetsBigger = 1500;
  }

  #getNearesPlayerVelosity(v) {
    const ballPos = { x: this.#homingballTexture.x, y: this.#homingballTexture.y };
    let minDistance = Number.MAX_SAFE_INTEGER;
    let vel = null;
    let player = null;

    for (let i = 0; i < this.#playersHunt.length; i++) {
      const playerPos = { x: this.#playersHunt[i].x, y: this.#playersHunt[i].y };
      let dest = getVelocityToPlayer(ballPos, playerPos, v);
      const a = dest.x - ballPos.x;
      const b = dest.y - ballPos.y;
      let distance = Math.sqrt(a * a + b * b);

      if (distance < minDistance) {
        minDistance = distance;
        vel = dest;
        player = this.#playersHunt[i];
      }
    }

    return { vel, player, distance: minDistance, distance2: Phaser.Math.Distance.Between(ballPos.x, ballPos.y, player.x, player.y) };
  }

  #huntPlayers() {
    try {
      const o = this.#getNearesPlayerVelosity(50);

      if (o.distance2 < Homingball.lightRange - 25) {
        this.#speedIsSet = false
        this.#homingballTexture.setVelocityX(o.vel.x);
        this.#homingballTexture.setVelocityY(o.vel.y);
      }
      else {
        if (!this.#speedIsSet) {
          this.#speedIsSet = true
          this.#homingballTexture.body.speed = this.#speed;
          const minPos = this.#getNearesPlayerVelosity(PROJECTILE_VELOCITY).vel;
          this.#homingballTexture.setVelocityX(minPos.x);
          this.#homingballTexture.setVelocityY(minPos.y);
        }
      }

      if (this.#homingballTexture.x > GAME_WIDTH || this.#homingballTexture.x < 0 || this.#homingballTexture.y < 0 || this.#homingballTexture.y > GAME_HEIGHT) {
        this.#EventBus.updateFunctions.delete(this.#hash);
        this.#game.lights.removeLight(this.#light)
        this.#EventBus.updateFunctions.delete(this.#lightHash);
        this.#homingballTexture.destroy();
        --Homingball.numberOfHomingBalls;
      }
    } catch (e) {

    }
  }

  #updateLight() {
    this.#light.x = this.#homingballTexture.x
    this.#light.y = this.#homingballTexture.y
  }

  #shootHomingball() {
    const that = this;
    const rndTurretPos = getRandomBorderPos();

    this.#homingballTexture = this.#game.physics.add.image(
      rndTurretPos.x,
      rndTurretPos.y,
      'homingball'
    );

    this.#light = this.#game.lights.addLight(
      this.#homingballTexture.x, this.#homingballTexture.y, Homingball.lightRange, LIGHT_COLOR_HOMINGBALL, LIGHT_INTENSITY_HOMINGBALL
    );

    this.#lightHash = randomHash(10);
    const lf = function () { that.#updateLight() };
    this.#EventBus.updateFunctions.push({ h: that.#lightHash, f: lf });
    this.#homingballTexture.setImmovable();
    this.#homingballTexture.setSize(FIREBALL_HITBOX.x, FIREBALL_HITBOX.y);

    for (let i = 0; i < this.collideWithPlayers.length; i++) {
      this.#game.physics.add.collider(this.collideWithPlayers[i], this.#homingballTexture, function () { that.#projectileHitPlayer() });
    }

    const minPos = this.#getNearesPlayerVelosity(PROJECTILE_VELOCITY).vel;
    this.#currentDirection = minPos;
    this.#homingballTexture.setVelocityX(minPos.x);
    this.#homingballTexture.setVelocityY(minPos.y);
    this.#speed = this.#homingballTexture.body.speed;
    this.#hash = randomHash(10);

    const f = function () { that.#huntPlayers() };
    setTimeout(() => {
      this.#EventBus.updateFunctions.push({ h: this.#hash, f });
    }, 500);
  }
}
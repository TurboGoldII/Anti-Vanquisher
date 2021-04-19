class Homingball extends Projectile {
  #game = null;
  #playersHunt = null;
  #homingballTexture = null;
  #doHunt = true;
  #EventBus = null;
  #projectileHitPlayer = null;
  #currentDirection = null;
  #hash = 0;
  #speed = 0;

  constructor(playersHunt, collideWithPlayers, game, EventBus) {
    super(collideWithPlayers);
    this.#game = game;
    this.#playersHunt = playersHunt;
    this.#EventBus = EventBus;
    this.#projectileHitPlayer = this.projectileHitPlayer;
    this.#shootHomingball();
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
      cl(this.#homingballTexture.body)
      const o = this.#getNearesPlayerVelosity(50);
      if (o.distance2 < 50) {
        this.#homingballTexture.setVelocityX(o.vel.x);
        this.#homingballTexture.setVelocityY(o.vel.y);
      }
      else {
        this.#homingballTexture.body.speed = this.#speed;
      }
      if (this.#homingballTexture.x > GAME_WIDTH || this.#homingballTexture.x < 0 || this.#homingballTexture.y < 0 || this.#homingballTexture.y > GAME_HEIGHT) {
        this.#EventBus.updateFunctions.delete(this.#hash);
        this.#homingballTexture.destroy();
      }
    } catch (e) {

    }
  }

  #shootHomingball() {
    const rndTurretPos = getRandomBorderPos();

    this.#homingballTexture = this.#game.physics.add.image(
      rndTurretPos.x,
      rndTurretPos.y,
      'homingball'
    );

    const that = this;
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
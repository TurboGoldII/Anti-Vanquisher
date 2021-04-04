const handleProjectiles = function (EventBus) {
  if (isAllowedToShootProjectile()) {
    shootRandomProjectile(EventBus);
  }

  if (isAllowedToShootFirestream()) {
    new Firestream($player, EventBus);
    EventBus.emit('score', { score: SCORE_INCREMENT_FIRESTREAM });
  }
}

const shootRandomProjectile = function (EventBus) {
  var random = Math.random();
  var offset = 0;

  for (var i = 0; i < PROJECTILES_PROBABILITIES.length; i++) {
    if (random <= PROJECTILES_PROBABILITIES[i].probability + offset) {
      PROJECTILES_PROBABILITIES[i].function(EventBus);
      return;
    }

    offset += PROJECTILES_PROBABILITIES[i].probability;
  }
}

const isAllowedToShootProjectile = function () {
  //Convert fire rate into seconds for next shot
  var intervalForNextShot = 1 / Projectile.fireRate;
  return isSecondsPassed(intervalForNextShot, $this.game);
}
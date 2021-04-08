const handleProjectiles = function (data) {
  if (isAllowedToShootProjectile()) {
    shootRandomProjectile(data);
  }

  if (isAllowedToShootFirestream(data.game)) {
    new Firestream(data.players, data.game);
    data.EventBus.emit('score', { score: SCORE_INCREMENT_FIRESTREAM });
  }
}

const shootRandomProjectile = function (data) {
  var random = Math.random();
  var offset = 0;

  for (var i = 0; i < PROJECTILES_PROBABILITIES.length; i++) {
    if (random <= PROJECTILES_PROBABILITIES[i].probability + offset) {
      PROJECTILES_PROBABILITIES[i].function(data);
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
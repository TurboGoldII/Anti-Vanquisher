const handleProjectiles = function(queues) {
  if (isAllowedToShootProjectile()) {
      shootRandomProjectile(queues);
    }

    if (isAllowedToShootFirestream()) {
      new Firestream($player);
      queues.score.push(SCORE_INCREMENT_FIRESTREAM);
    }
}

const shootRandomProjectile = function(queues) {
  var random = Math.random();
  var offset = 0;
  for (var i = 0; i < PROJECTILES_PROBABILITIES.length; i++) {
    if (random <=  PROJECTILES_PROBABILITIES[i].probability + offset) {
      PROJECTILES_PROBABILITIES[i].function(queues);
      return;
    }
    offset += PROJECTILES_PROBABILITIES[i].probability;
  }
}

const isAllowedToShootProjectile = function() {
  //Convert fire rate into seconds for next shot
  var intervalForNextShot = 1 / Projectiles.fireRate;
  return isSecondsPassed(intervalForNextShot, $this.game);
}
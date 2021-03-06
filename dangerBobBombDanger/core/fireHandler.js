/*
 * TO-DO: Firerate must increase itself over time
 */

//The firerate is fireRate per second
var fireRate = FIREBALL_START_FIRE_RATE;

function isAllowedToShootFireball(game) {
  //Convert fire rate into seconds for next shot
  var intervalForNextShot = 1 / fireRate;
  return isSecondsPassed(intervalForNextShot, game);
}

function shootFireball(physics, player, fireballs) {
  var fireballIndex = Math.round(Math.random() * 100) % fireballs.length;
  var randomFireball = fireballs[fireballIndex];

  var fireballTexture = physics.add.image(
    randomFireball.x,
    randomFireball.y,
    'fireball'
  );

  //The fireball shall fly to the players current position
  var dest = {
    x: player.x,
    y: player.y
  };

  var angle = {
    x: dest.x - randomFireball.x,
    y: dest.y - randomFireball.y
  };

  var angleXMultiplier = 1;
  var angleYMultiplier = 1;

  var speedX = Math.abs(angle.x);
  var speedY = Math.abs(angle.y);

  if (speedX > speedY) {
    angleYMultiplier = FIREBALL_VELOCITY / speedX;

    if (angle.x < 0) {
      angle.x = FIREBALL_VELOCITY * (-1);
    } else {
      angle.x = FIREBALL_VELOCITY;
    }
  }
  else {
    angleXMultiplier = FIREBALL_VELOCITY / speedY;

    if (angle.y < 0) {
      angle.y = FIREBALL_VELOCITY * (-1);
    } else {
      angle.y = FIREBALL_VELOCITY;
    }
  }

  fireballTexture.setVelocityX(angle.x * angleXMultiplier);
  fireballTexture.setVelocityY(angle.y * angleYMultiplier);

  setTimeout(() => {
    fireballTexture.destroy();
  }, 60000);
}
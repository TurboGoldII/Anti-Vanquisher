class VelocityHandler {
  /**
   * Moves the affected object into the targets direction with the given
   * velocity. It is called "shoot" because it DOES NOT stop at the target's
   * position.
   *
   * @param {object} affectedObject
   * @param {object} target
   * @param {integer} velocity
   */
  static shoot(affectedObject, target, velocity) {
    let n = 0;

    if (getRandomNumber(0, 1) < 0.5) {
      const dif = 100;
      n = getRandomNumber(-dif, dif);
    }

    let angle = {
      x: target.x - affectedObject.x + n,
      y: target.y - affectedObject.y + n
    };

    let speedX = Math.abs(angle.x);
    let speedY = Math.abs(angle.y);

    let angleMultiplier = Math.sqrt(
      velocity ** 2 /
      (speedX ** 2 + speedY ** 2)
    );

    try {
      affectedObject.setVelocity(
        angle.x * angleMultiplier,
        angle.y * angleMultiplier
      );
    }
    catch (e) {

    }

  }

  /**
   * Moves the affected object TO the targets position and stops there.
   *
   * Note: This feature would be really hard to implement. The complete game
   * loop would have to be adjusted with the engine in mind, so that the object
   * can be stopped at the right moment in the queue. It must be implemented
   * by taking the vector length to the target point and cap the velocity
   * and therefore the actual vector length to the exact requested distance.
   *
   * @param {object} affectedObject
   * @param {object} target
   * @param {integer} velocity
   */
  static moveTo(affectedObject, target, velocity) {
    throw 'moveTo is not yet implemented';
  }

  static stop(affectedObject) {
    affectedObject.setVelocity(0, 0);
  }

}

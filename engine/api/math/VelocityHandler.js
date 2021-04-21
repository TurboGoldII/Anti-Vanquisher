class VelocityHandler {

  #affectedObject = null;

  /**
   * Creates the velocity handler with the affectedObject, it should move. The
   * object can be changed anytime with the setter.
   * 
   * Note: If you want to affect multiple objects at once, use game.add.group().
   * 
   * @param {object} affectedObject 
   */
  constructor(affectedObject) {
    this.setAffectedObject(affectedObject);
  }

  /**
   * Moves the affected object into the targets direction with the given
   * velocity. It is called "shoot" because it DOES NOT stop at the target's
   * position.
   * 
   * @param {object} target 
   * @param {integer} velocity 
   */
  shoot(target, velocity) {
    let angle = {
      x: target.x - this.#affectedObject.x,
      y: target.y - this.#affectedObject.y
    };

    let speedX = Math.abs(angle.x);
    let speedY = Math.abs(angle.y);

    let angleMultiplier = Math.sqrt(
      velocity ** 2 /
      (speedX ** 2 + speedY ** 2)
    );

    this.#affectedObject.setVelocity(
      angle.x * angleMultiplier,
      angle.y * angleMultiplier
    );
  }

  /**
   * Moves the affected object TO the targets position and stops there.
   * 
   * TO-DO: This feature would be really hard to implement. The complete game
   * loop would have to be adjusted with the engine in mind, so that the object
   * can be stopped at the right moment in the queue.
   * 
   * @param {object} target 
   * @param {integer} velocity 
   */
  moveTo(target, velocity) {
    throw 'moveTo is not yet implemented';
  }

  stop() {
    this.#affectedObject.setVelocity(0, 0);
  }

  setAffectedObject(affectedObject) {
    this.#affectedObject = affectedObject;
  }

}

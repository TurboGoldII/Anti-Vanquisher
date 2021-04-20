class VelocityHandler {

  #affectedObject = null;

  constructor(affectedObject) {
    this.setAffectedObject(affectedObject);
  }

  move(target, velocity) {
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

    this.#affectedObject.setVelocityX(angle.x * angleMultiplier);
    this.#affectedObject.setVelocityY(angle.y * angleMultiplier);
  }

  setAffectedObject(affectedObject) {
    this.#affectedObject = affectedObject;
  }

}

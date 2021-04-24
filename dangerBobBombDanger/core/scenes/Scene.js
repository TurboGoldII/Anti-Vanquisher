class Scene {

  renderer = null;
  #firefly = null;

  constructor() {
    /* This guard simulates abstraction. */
    if (new.target === Scene) {
      throw "The class Scene is abstract and cannot be instanced.";
    }
  }

  preload() {
    this.renderer.load.spritesheet(
      'firefly',
      'assets/mob/firefly.png',
      { frameWidth: 12, frameHeight: 12 }
    );
  }

  create() {
    this.renderer.anims.create({
      key: 'firefly_bobbing',
      frames: this.renderer.anims.generateFrameNumbers('firefly', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.#firefly = this.renderer.add.sprite(
      FLOOR_CENTER.x,
      FLOOR_CENTER.y,
      'firefly'
    );

    this.#firefly.anims.play('firefly_bobbing');
  }

  update() {
    const mousePos = this.renderer.input.mousePointer;
    this.#firefly.x = mousePos.x;
    this.#firefly.y = mousePos.y;
  }

}
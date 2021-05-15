class Scene {

  renderer = null;
  #firefly = null;

  preload() {
    this.renderer.load.image(
      'buttonSmall',
      '../engine/assets/callouts/flixel_button_small.png'
    );

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

    this.renderer.lights.addLight(
      this.#firefly.x,
      this.#firefly.y,
      LIGHT_RADIUS_FIREFLY
    );
  }

}
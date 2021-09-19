class MainMenu extends Scene {

  buttonFactory = null;
  #sceneSwitcher = null;
  renderer = null;

  #CHARACTERS = CHARACTERS.map(charackter => charackter.sprite);
  #activeCharackter = {
    sprite: null,
    linePos: 0
  };

  constructor(sceneSwitcher, renderer) {
    super();
    this.#sceneSwitcher = sceneSwitcher;
    this.renderer = renderer;
  }

  preload() {
    super.preload();
    this.buttonFactory = new ButtonFactory(this.renderer);
    this.#preloadCharackterSpritesheets()
  }

  create() {
    this.#createCharackterAnims()

    /* Shall be replaced by the logo */
    let gameLogo = this.buttonFactory.createText(
      GAME_CENTER.x,
      50,
      GAME_NAME,
      { fill: '#bfffff' }
    );

    gameLogo.setOrigin(0.5);
    let linePos = 150;
    let lineOffset = 130;

    this.#addMenuButton(
      linePos,
      'Play',
      () => { this.#sceneSwitcher.scene = SCENE_CORE_GAME; }
    );

    this.buttonFactory.createButton(
      GAME_CENTER.x - 136,
      (linePos += lineOffset),
      '[<]',
      { fill: '000000' },
      () => { this.#switchCharackter(1) },
      'buttonSmall'
    );

    this.buttonFactory.createButton(
      GAME_CENTER.x + 136,
      (linePos),
      '[>]',
      { fill: '000000' },
      () => { this.#switchCharackter(0) },
      'buttonSmall'
    );

    this.#activeCharackter.linePos = linePos;
    this.renderer.$charackterIndex = 0;
    this.#setCharackter(0);

    this.#addMenuButton(
      (linePos += lineOffset),
      'Highscores',
      () => { this.#sceneSwitcher.scene = SCENE_HIGHSCORES; }
    );

    this.#addMenuButton(
      (linePos += lineOffset),
      'Credits',
      () => { this.#sceneSwitcher.scene = SCENE_CREDITS; }
    );

    /* Must be called at the end, so that the cursor is above the buttons */
    super.create();
  }

  #addMenuButton(posY, label, onclick) {
    this.buttonFactory.createButton(
      GAME_CENTER.x,
      posY,
      label,
      { fill: '000000' },
      onclick
    );
  }

  #switchCharackter(toLeft) {
    this.#activeCharackter.sprite?.destroy?.();

    let index = 0;

    if (toLeft) {
      index = this.renderer.$charackterIndex ? --this.renderer.$charackterIndex : this.#CHARACTERS.length;
    }
    else {
      index = this.renderer.$charackterIndex === this.#CHARACTERS.length ? 0 : ++this.renderer.$charackterIndex;
    }

    this.renderer.$charackterIndex = index;

    if (index === this.#CHARACTERS.length) {
      this.#setCoop();
    }
    else {
      this.#setCharackter(index);
    }
  }

  #setCoop() {
    this.#activeCharackter.sprite = this.buttonFactory.createButton(
      GAME_CENTER.x,
      (this.#activeCharackter.linePos),
      'COOP',
      { fill: '000000' },
      () => { this.#sceneSwitcher.scene = SCENE_CORE_GAME; },
      'buttonSmall'
    );
  }

  #setCharackter(index) {
    this.#activeCharackter.sprite = this.renderer.physics.add.sprite(
      GAME_CENTER.x,
      this.#activeCharackter.linePos,
      this.#CHARACTERS[index].name
    );

    this.#activeCharackter.sprite.anims.play(this.#CHARACTERS[index].name);
    this.#activeCharackter.sprite.setImmovable();
    this.#activeCharackter.sprite.setScale(CHARACTERS[index].context.scale);
  }

  #preloadCharackterSpritesheets() {
    for (let i = 0; i < this.#CHARACTERS.length; i++) {
      this.renderer.load.spritesheet(
        this.#CHARACTERS[i].name,
        this.#CHARACTERS[i].path,
        this.#CHARACTERS[i].frame
      );
    }
  };

  #createCharackterAnims() {
    for (let i = 0; i < this.#CHARACTERS.length; i++) {
      if (this.#CHARACTERS[i].anim) {
        this.renderer.anims.create({
          key: this.#CHARACTERS[i].name,
          frames: this.renderer.anims.generateFrameNumbers(this.#CHARACTERS[i].name, this.#CHARACTERS[i].anim.frames),
          frameRate: this.#CHARACTERS[i].anim.frameRate,
          repeat: this.#CHARACTERS[i].anim.repeat
        });
      }
    }
  }

  update() {
    super.update();
  }


}
class MainMenu extends Scene {
  buttonFactory = null;
  #sceneSwitcher = null;
  #renderer = null;

  constructor(sceneSwitcher, renderer) {
    super();
    this.#sceneSwitcher = sceneSwitcher;
    this.#renderer = renderer;
  }

  preload() {
    this.buttonFactory = new ButtonFactory(this.#renderer);
  }

  create() {
    /* Shall be replaced by the logo */
    let gameLogo = this.buttonFactory.createText(
      GAME_CENTER.x,
      50,
      GAME_NAME,
      { fill: '#bfffff' }
    );

    gameLogo.setOrigin(0.5);
    let linePos = 170;
    let lineOffset = 100;

    this.#addMenuButton(
      linePos,
      'Play',
      () => { this.#sceneSwitcher.scene = SCENE_CORE_GAME; }
    );

    this.#addMenuButton(
      (linePos += lineOffset),
      'How to play',
      () => { this.#sceneSwitcher.scene = SCENE_HOW_TO; }
    );

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

  update() {

  }

}
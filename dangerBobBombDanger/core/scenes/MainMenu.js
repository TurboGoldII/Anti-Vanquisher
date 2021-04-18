class MainMenu extends Scene {

  renderer = null;
  buttonFactory = null;

  preload(renderer) {
    this.renderer = renderer;
    this.buttonFactory = new ButtonFactory(renderer);
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
      () => { $sceneSwitcher.switchToScene(this.renderer, SCENE_CORE_GAME); }
    );

    this.#addMenuButton(
      (linePos += lineOffset),
      'How to play',
      () => { $sceneSwitcher.switchToScene(this.renderer, SCENE_HOW_TO); }
    );

    this.#addMenuButton(
      (linePos += lineOffset),
      'Highscores',
      () => { $sceneSwitcher.switchToScene(this.renderer, SCENE_HIGHSCORES); }
    );

    this.#addMenuButton(
      (linePos += lineOffset),
      'Credits',
      () => { $sceneSwitcher.switchToScene(this.renderer, SCENE_CREDITS); }
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
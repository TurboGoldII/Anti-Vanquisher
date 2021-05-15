class MenuNavigation extends Scene {

  #sceneSwitcher = null;
  renderer = null;

  constructor(sceneSwitcher) {
    super();
    this.#sceneSwitcher = sceneSwitcher;
  }

  preload() {
    super.preload();
  }

  create() {
    let buttoner = new ButtonFactory(this.renderer);

    buttoner.createButton(
      80,
      60,
      'Back',
      { fill: '000000' },
      () => { this.#sceneSwitcher.scene = SCENE_MAIN_MENU; },
      'buttonSmall'
    );

    super.create();
  }

  update() {
    super.update();
  }

}
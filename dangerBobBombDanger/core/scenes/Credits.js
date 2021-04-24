class Credits extends Scene {

  texter = null;
  #sceneSwitcher = null;
  renderer = null;

  constructor(sceneSwitcher, renderer) {
    super();
    this.#sceneSwitcher = sceneSwitcher;
    this.renderer = renderer;
  }

  preload() {
    super.preload();
    this.texter = new TextHandler(this.renderer);

    /*
     * It takes the Phaser engine a really short time to load the font. The font
     * must be loaded asynchronously here.
     */
    setTimeout(() => {
      this.#printText();
    }, 0);
  }

  #printText() {
    let linePos = 50;
    let categoryLineOffset = 35;
    let categoryProps = { fill: '#bfffff' };

    let headline = this.texter.createText(
      GAME_CENTER.x,
      linePos,
      'CREDITS',
      categoryProps
    );

    headline.setOrigin(0.5);
    let lineOffset = 35;

    let creditsNames = [
      this.texter.createText(
        GAME_CENTER.x,
        (linePos += lineOffset + categoryLineOffset),
        'Programming',
        categoryProps
      ),
      this.texter.createText(GAME_CENTER.x, (linePos += lineOffset), 'Paul-Ludwig Wust'),
      this.texter.createText(GAME_CENTER.x, (linePos += lineOffset), 'Anton-Luis Bertram'),
      this.texter.createText(
        GAME_CENTER.x,
        (linePos += lineOffset + categoryLineOffset),
        'Design',
        categoryProps
      ),
      this.texter.createText(GAME_CENTER.x, (linePos += lineOffset), 'Maximilian Wust'),
      this.texter.createText(GAME_CENTER.x, (linePos += lineOffset), 'Paul-Ludwig Wust'),
      this.texter.createText(
        GAME_CENTER.x,
        (linePos += lineOffset + categoryLineOffset),
        'Music',
        categoryProps
      ),
      this.texter.createText(GAME_CENTER.x, (linePos += lineOffset), 'Anton-Luis Bertram'),
      this.texter.createText(
        GAME_CENTER.x,
        (linePos += lineOffset + categoryLineOffset),
        'Special thanks',
        categoryProps
      ),
      this.texter.createText(GAME_CENTER.x, (linePos += lineOffset), 'Ludwig Wildner')
    ];

    creditsNames.forEach((name) => {
      name.setOrigin(0.5)
    });
  }

  create() {
    super.create();
  }

  update() {
    super.update();
  }

}
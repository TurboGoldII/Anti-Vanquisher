class GameOver extends MenuNavigation {
  static #thoughtsOnWords = [
    'Blorpo', 'schnitzelconsistency', 'Johnny Gringostar',
    'politics', 'activism', 'philosophy', 'big bobas', 'audacity',
    'cigarettes', 'Hogwarts', 'lysenkoism', 'philantropy',
    'literature', 'game design', 'art', 'Cyberpunk 2077', 'UFO sightings',
    'Slippidy Snorkler', 'time-keeping', 'time travel', 'modern cooking',
    'transgender rights', 'cancel culture', 'Peter Stark', 'neputism'
  ];

  #sceneSwitcher = null;
  #texter = null;
  #buttonFactory = null;
  #nameInput = null;
  #uploadButton = null;

  constructor(sceneSwitcher, renderer) {
    super(sceneSwitcher);
    this.#sceneSwitcher = sceneSwitcher;
    this.renderer = renderer;
  }

  preload() {
    super.preload();
    this.renderer.load.html('nameform', 'assets/callouts/nameform.html');
    this.#buttonFactory = new ButtonFactory(this.renderer);
  }

  create() {
    super.create();
    this.#texter = new TextHandler(this.renderer);

    const headline = this.#texter.createText(
      GAME_CENTER.x,
      50,
      'GAME OVER',
      { fill: '#bfffff' }
    );

    headline.setOrigin(0.5);

    const thoughtsOnText = this.#texter.createText(
      GAME_CENTER.x,
      130,
      this.#getThought(),
      { fill: '#bfffff' }
    );

    thoughtsOnText.setOrigin(0.5);

    const yourScoreText = this.#texter.createText(
      GAME_CENTER.x,
      165,
      'BTW your score is ' + scoreSingleton.getScore(),
      { fill: '#bfffff' }
    );

    yourScoreText.setOrigin(0.5);
    scoreSingleton.reset();

    this.#nameInput = this.renderer.add.dom(GAME_CENTER.x, 230)
      .createFromCache('nameform');

    this.#nameInput.setOrigin(0.5);

    this.#uploadButton = this.#buttonFactory.createButton(
      GAME_CENTER.x,
      320,
      'Upload Score',
      { fill: '000000' },
      this.#getUploadFunction()
    );
  }

  #getThought() {
    return `These are my thoughts on ${GameOver.#thoughtsOnWords[getRandomInt(0, GameOver.#thoughtsOnWords.length)]}.`;
  }

  #getUploadFunction() {
    return () => {
      // Regex rgx = new Regex("[^a-zA-Z0-9 -]");
      // str = rgx.Replace(str, "");
      this.#nameInput.destroy();
      this.#uploadButton.destroy();

      const uploadedMessage = this.#texter.createText(
        GAME_CENTER.x,
        230,
        'Highscore uploaded',
        { fill: '#ffdd00' }
      );

      uploadedMessage.setOrigin(0.5);
    };
  }

  update() {
    super.update();
  }

}
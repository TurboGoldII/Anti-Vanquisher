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
  #playerScore = null;
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
    /*
     * Changing the game ID here ensures that no event of an old game is
     * started after the game over.
     */
    ++$gameId;

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

    this.#playerScore = scoreSingleton.getScore();
    scoreSingleton.reset();

    const yourScoreText = this.#texter.createText(
      GAME_CENTER.x,
      165,
      'BTW your score is ' + this.#playerScore,
      { fill: '#bfffff' }
    );

    yourScoreText.setOrigin(0.5);

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
    return `These are my thoughts on ${GameOver.#thoughtsOnWords[getRandomInt(0, GameOver.#thoughtsOnWords.length - 1)]}.`;
  }

  #getUploadFunction() {
    return () => {
      const uploadRequest = new XMLHttpRequest();

      uploadRequest.onreadystatechange = (event) => {
        let response = event.currentTarget;

        if (response.readyState === 4 && response.status === 200) {
          try {
            response = JSON.parse(response.responseText);
            this.#printUploadedMessage();
          }
          catch (ex) {
            console.error({ response: response.responseText, message: ex });
            this.#printUploadFailedMessage();
          }
        }
      };

      uploadRequest.open('POST', 'rest/executeRestserviceRequest.php', true);

      uploadRequest.setRequestHeader(
        'Content-type', 'application/x-www-form-urlencoded'
      );

      let playerName = document.getElementById('nameField').value;
      const nonAllowedChars = /[^a-zA-Z0-9 -]/g;
      playerName = playerName.replace(nonAllowedChars, '');

      uploadRequest.send(
        'restservice=HighscoreRestservice'
        + '&restserviceMethod=storeHighscore'
        + '&parameters=["' + playerName + '",' + this.#playerScore + ']'
      );

      this.#nameInput.destroy();
      this.#uploadButton.destroy();
    };
  }

  #printUploadedMessage() {
    const uploadedMessage = this.#texter.createText(
      GAME_CENTER.x, 230, 'Highscore uploaded.', { fill: '#ffdd00' }
    );

    uploadedMessage.setOrigin(0.5);
  }

  #printUploadFailedMessage() {
    const uploadedMessage = this.#texter.createText(
      GAME_CENTER.x, 230, 'Sorry, your highscore got vanquished.', { fill: '#ff1100' }
    );

    uploadedMessage.setOrigin(0.5);
  }

  update() {
    super.update();
  }

  getBackButtonFunction() {
    return () => {
      Projectile.resetGame();
      /* Destroy registry */
      this.renderer.registry.destroy();
      /* Disable all active events */
      this.renderer.events.off();
      super.getBackButtonFunction()();
      /* Restart current scene */
      this.renderer.scene.restart();
    };
  }

}
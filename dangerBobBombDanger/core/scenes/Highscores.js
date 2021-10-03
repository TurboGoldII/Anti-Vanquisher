class Highscores extends MenuNavigation {

  #sceneSwitcher = null;
  renderer = null;

  constructor(sceneSwitcher, renderer) {
    super(sceneSwitcher);
    this.#sceneSwitcher = sceneSwitcher;
    this.renderer = renderer;
  }

  preload() {
    super.preload();
  }

  create() {
    super.create();
    this.texter = new TextHandler(this.renderer);

    const headline = this.texter.createText(
      GAME_CENTER.x,
      50,
      'HIGHSCORES',
      { fill: '#bfffff' }
    );

    headline.setOrigin(0.5);
    this.#requestAndPrintHighscores();
  }

  #requestAndPrintHighscores() {
    const highscoreRequest = new XMLHttpRequest();

    highscoreRequest.onreadystatechange = (event) => {
      const response = event.currentTarget;

      if (response.readyState === 4 && response.status === 200) {
        try {
          const highscores = JSON.parse(response.responseText);
          this.#printHighscores(highscores);
        }
        catch (ex) {
          /* NOTE: This is no debug. */
          cl(ex);
          this.#printNoHighscoreMessage();
        }
      }
    };

    highscoreRequest.open('POST', 'rest/executeRestserviceRequest.php', true);
    highscoreRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    highscoreRequest.send(
      'restservice=HighscoreRestservice'
      + '&restserviceMethod=getHighscores'
      + '&parameters={}'
    );
  }

  #printHighscores(highscores) {
    if (!highscores.length) {
      this.#printNoHighscoreMessage();
      return;
    }

    let increasingLinePos = 130;
    const lineOffset = 35;

    for (let place = 0; place < highscores.length; place++) {
      /* NOTE: The first place shall shine. */
      const currentLinePos = (increasingLinePos += lineOffset);
      const properties = place === 0 ? { fill: '#ffdd00' } : {};
      const highscoreText = (place + 1) + '. ' + highscores[place].playerName;

      this.texter.createText(
        GAME_CENTER.x - 270, currentLinePos, highscoreText, properties
      );

      this.texter.createText(
        GAME_CENTER.x + 200, currentLinePos, highscores[place].score, properties
      );
    }
  }

  #printNoHighscoreMessage() {
    const noHighscoreMessage = this.texter.createText(
      GAME_CENTER.x, 120, 'No highscores found. Go play!'
    );

    noHighscoreMessage.setOrigin(0.5);
  }

  update() {
    super.update();
  }

}
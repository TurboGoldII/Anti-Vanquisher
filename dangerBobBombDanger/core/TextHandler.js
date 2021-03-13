class TextHandler {
  game = null;

  constructor(game) {
    this.game = game;
  }

  createText(posX, posY, text) {
    return this.game.add.text(
      posX,
      posY,
      text,
      {
        fontFamily: FONT,
        fontSize: '30px',
        fill: '#ffffff'
      }
    );
  }
}
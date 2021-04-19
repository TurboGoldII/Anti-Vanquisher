class TextHandler {
  game = null;

  constructor(game) {
    this.game = game;
  }

  createText(posX, posY, text, fontProps) {
    if (!fontProps) {
      fontProps = {};
    }

    if (!fontProps.fontFamily) {
      fontProps.fontFamily = FONT;
    }

    if (!fontProps.fontSize) {
      fontProps.fontSize = '30px';
    }

    if (!fontProps.fill) {
      fontProps.fill = FONT_FILL;
    }

    return this.game.add.text(posX, posY, text, fontProps);
  }

  /**
   * This function creates a line below the given text object.
   * 
   * TO-DO: For some reason, this is currently buggy and not working but I like
   * this prototype, so I won't delete for now.
   * 
   * @param {TextObject} text 
   */
  underlineText(text) {
    let underline = this.game.add.graphics(text.left, text.bottom - 7);
    /* Specify the line (size, color) */
    underline.lineStyle(2, 0x000000);
    underline.moveTo(0, 0);
    underline.lineTo(text.width, 0);
  }
}
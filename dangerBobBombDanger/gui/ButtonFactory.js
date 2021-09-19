class ButtonFactory extends TextHandler {

  createButton(posX, posY, text, fontProps, onclick, texture) {
    if (!texture) {
      texture = 'button';
    }

    let buttonBackground = this.game.add.image(posX, posY, texture)
      .setInteractive();

    buttonBackground.on('pointerover', function (event) {
      this.setTintFill(0xebb92f);
    });

    buttonBackground.on('pointerout', function (event) {
      this.clearTint();
    });

    buttonBackground.on('pointerdown', onclick);
    let buttonLabel = super.createText(posX, posY, text, fontProps);
    /* setOrigin places the text in the middle of the button */
    buttonLabel.setOrigin(0.5);

    return buttonBackground;
  }
}
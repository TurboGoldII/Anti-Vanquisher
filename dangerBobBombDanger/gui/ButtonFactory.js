class ButtonFactory extends TextHandler {

  createButton(posX, posY, text, fontProps, onclick) {
    let buttonBackground = this.game.add.image(posX, posY, 'button')
      .setInteractive();

    /* TO-DO The buttons look horrible. Create textures for these! */

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
  }

}
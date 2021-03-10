class Soundhandler {
  game = null;
  backgroundMusic = null;
  gameOverMusic = null;

  constructor(game) {
    this.game = game;
  }

  playBackgroundMusic() {
    this.backgroundMusic = this.playSound('backgroundMusic');
    this.backgroundMusic.play({ loop: true });
  }

  stopBackgroundMusic() {
    this.backgroundMusic.stop();
  }

  /**
   * TO-DO: The game over music is not implemented yet, just a digital sticky
   * note.
   */
  playGameOverMusic() {
    this.gameOverMusic = this.playSound('gameOverMusic');
    this.gameOverMusic.play();
  }

  stopGameOverMusic() {
    this.gameOverMusic.stop();
  }

  playSound(soundName) {
    return this.game.sound.add(soundName, { volume: SOUND_VOLUME });
  }
}

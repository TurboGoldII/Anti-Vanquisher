class SoundHandler {
  backgroundMusic = null;
  gameOverJingle = null;

  constructor() {
    this.backgroundMusic = this.createSound('backgroundMusic');
    this.gameOverJingle = this.createSound('gameOverJingle');
  }

  playBackgroundMusic() {
    this.backgroundMusic.play({ loop: true });
  }

  stopBackgroundMusic() {
    this.backgroundMusic.stop();
  }

  playGameOverJingle() {
    this.gameOverJingle.play();
  }

  createSound(soundName) {
    return $this.sound.add(soundName, { volume: SOUND_VOLUME });
  }
}

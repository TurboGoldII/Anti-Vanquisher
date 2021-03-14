class SoundHandler {
  backgroundMusic = null;

  constructor() {
    this.backgroundMusic = this.createSound('backgroundMusic');
  }

  playBackgroundMusic() {
    this.backgroundMusic.play({ loop: true });
  }

  stopBackgroundMusic() {
    this.backgroundMusic.stop();
  }

  createSound(soundName) {
    return $this.sound.add(soundName, { volume: SOUND_VOLUME });
  }
}

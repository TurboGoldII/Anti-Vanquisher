const handlePreload = function (data) {
  setWebsiteSettings();
  preloadImages(data.game);
  preloadSpritesheets(data.game);
  preloadAudio(data.game);
}

const setWebsiteSettings = () => {
  document.addEventListener('contextmenu', event => event.preventDefault());
};

const IMAGES = getReadOnlyObject([
  { name: 'debug_x', path: 'assets/callouts/debug_x.png' },
  { name: 'lava', path: 'assets/stage/game_background.png' },
  { name: 'iceball', path: 'assets/mob/iceball.png' },
  { name: 'homingball', path: 'assets/mob/homingball.png' },
  { name: 'chaosball', path: 'assets/mob/chaosball.png' },
  { name: 'loudspeaker_on', path: 'assets/callouts/loudspeaker_on.png' },
  { name: 'loudspeaker_off', path: 'assets/callouts/loudspeaker_off.png' }
]);

const preloadImages = function (game) {
  for (let i = 0; i < IMAGES.length; i++) {
    game.load.image(IMAGES[i].name, IMAGES[i].path);
  }
};

const AUDIO = getReadOnlyObject([
  { name: 'backgroundMusic', path: 'assets/music/danger_bomb_danger_demo_soundtrack.mp3' },
  { name: 'gameOverJingle', path: 'assets/music/game_over.mp3' }
]);

const preloadAudio = function (game) {
  for (let i = 0; i < AUDIO.length; i++) {
    game.load.audio(AUDIO[i].name, AUDIO[i].path);
  }
};

const SPRITE_SHEETS = getReadOnlyObject([
  {
    name: 'fireball',
    path: 'assets/mob/fireball.png',
    frame: { frameWidth: 16, frameHeight: 16 },
    anim: {
      frames: { start: 0, end: 1 },
      frameRate: 5,
      repeat: -1
    }
  },
  {
    name: 'crystal',
    path: 'assets/mob/red_crystal.png',
    frame: { frameWidth: 80, frameHeight: 80 },
    anim: {
      frames: { start: 0, end: 2 },
      frameRate: 1,
      repeat: 0
    }
  },
  {
    name: 'firelaser_building',
    path: 'assets/mob/firelaser_building.png',
    frame: { frameWidth: 27, frameHeight: 332 },
    anim: {
      frames: { start: 0, end: 2 },
      frameRate: 1,
      repeat: 0
    }
  },
  {
    name:
      'firelaser_full_size',
    path: 'assets/mob/firelaser_full_size.png',
    frame: { frameWidth: 27, frameHeight: 332 },
    anim: {
      frames: { start: 0, end: 3 },
      frameRate: 10,
      repeat: -1
    }
  }
]);

const preloadSpritesheets = function (game) {
  for (let i = 0; i < SPRITE_SHEETS.length; i++) {
    game.load.spritesheet(
      SPRITE_SHEETS[i].name,
      SPRITE_SHEETS[i].path,
      SPRITE_SHEETS[i].frame
    );
  }

  for (let i = 0; i < CHARACTERS.length; i++) {
    game.load.spritesheet(
      CHARACTERS[i].sprite.name,
      CHARACTERS[i].sprite.path,
      CHARACTERS[i].sprite.frame
    );

    if (CHARACTERS[i].frozenSprite) {
      game.load.spritesheet(
        CHARACTERS[i].frozenSprite.name,
        CHARACTERS[i].frozenSprite.path,
        CHARACTERS[i].frozenSprite.frame
      );
    }
  }
};
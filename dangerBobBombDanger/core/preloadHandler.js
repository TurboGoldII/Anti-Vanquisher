const handlePreload = function() {
  preloadImages();
  preloadSpritesheets();
}

const preloadImages = function() {
    $this.load.image('debug_x', '../engine/assets/callouts/debug_x.png');
    $this.load.image('lava', 'assets/stage/game_background.png');
    $this.load.image('fireball', 'assets/mob/fireball.png');
    $this.load.image('iceball', 'assets/mob/iceball.png');
    $this.load.image('loudspeaker_on', 'assets/callouts/loudspeaker_on.png');
    $this.load.image('loudspeaker_off', 'assets/callouts/loudspeaker_off.png');
    $this.load.audio('backgroundMusic', 'assets/music/danger_bomb_danger_demo_soundtrack.mp3');
  }

const preloadSpritesheets = function() {
  $this.load.spritesheet(
    'bob_omb',
    'assets/bobOmb.png',
    { frameWidth: 21, frameHeight: 24 }
  );

  $this.load.spritesheet(
    'frozenBobOmb',
    'assets/frozenBobOmb.png',
    { frameWidth: 32, frameHeight: 32 }
  );

  $this.load.spritesheet(
    'crystal',
    'assets/mob/red_crystal.png',
    { frameWidth: 80, frameHeight: 80 }
  );

  $this.load.spritesheet(
    'firelaser_building',
    'assets/mob/firelaser_building.png',
    { frameWidth: 27, frameHeight: 332 }
  );

  $this.load.spritesheet(
    'firelaser_full_size',
    'assets/mob/firelaser_full_size.png',
    { frameWidth: 27, frameHeight: 332 }
  );
}
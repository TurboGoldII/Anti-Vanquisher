function startGame() {
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0xbababa,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  var game = new Phaser.Game(config);
  var player = null;

  function preload() {
    this.load.spritesheet('bob_omb', 'assets/bob_omb.png', { frameWidth: 21, frameHeight: 24 });
  }

  function create() {
    player = this.physics.add.sprite(400, 300, 'bob_omb')
      .setScale(SCALE_PLAYER);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('bob_omb', { start: 0, end: 7 }),
      frameRate: ANIMATION_FRAMERATE_PLAYER,
      repeat: -1
    });

    player.anims.play('idle', true);

    this.input.on('pointermove', function (pointer) {
      //TO-DO: Set stage bounds here
      /*
       * For x use 14px, for y use 17px
       */
      player.x = Phaser.Math.Clamp(pointer.x, 14, 786);
      player.y = Phaser.Math.Clamp(pointer.y, 17, 583);
    }, this);
  }

  //The firerate is fireRate per second
  var fireRate = FIREBALL_START_FIRE_RATE;
  var score = 0;

  function update() {
    resetTimer();

    if (isAllowedToShootFireball()) {
      shootFireball();
      score += SCORE_INCREMENT_FIREBALL;
    }
  }

  function isAllowedToShootFireball() {
    //Convert fire rate into seconds for next shot
    var intervalForNextShot = 1 / fireRate;
    return isSecondsPassed(intervalForNextShot, game);
  }

  function shootFireball() {
    cl('Shoot fireball');
  }
}
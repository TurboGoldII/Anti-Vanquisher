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

  function preload() {
    this.load.image('bobOmb', 'assets/bobOmb.png');
    this.load.image('lava', 'assets/stage/lava.png');
    this.load.image('floatingFloor', 'assets/stage/floatingFloor.png');
    this.load.image('scoreBar', 'assets/hud/scoreBar.png');
  }

  var game = new Phaser.Game(config);
  var player = null;
  var score = 0;
  var scoreCounterText = null;

  function create() {
    this.add.image(STAGE_CENTER.x, 30, 'scoreBar');

    this.add.text(
      595,
      15,
      'Score:',
      {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '30px larger',
        fill: '#ffffff'
      }
    );

    scoreCounterText = this.add.text(
      690,
      15,
      formatScore(),
      {
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '30px larger',
        fill: '#ffffff'
      }
    );

    const stages = this.physics.add.staticGroup();

    stages.create(
      STAGE_CENTER.x,
      STAGE_CENTER.y,
      'lava'
    );

    stages.create(
      STAGE_CENTER.x,
      STAGE_CENTER.y,
      'floatingFloor'
    );

    player = this.physics.add.image(
      STAGE_CENTER.x,
      STAGE_CENTER.y,
      'bobOmb'
    )
      .setScale(2);

    this.input.on('pointermove', function (pointer) {
      /*
       * Sadly, these stage bounds here always have to be fine-tuned by the
       * programmer. Test it out, once the right textures are installed.
       */
      player.x = Phaser.Math.Clamp(pointer.x, 112, 688);
      player.y = Phaser.Math.Clamp(pointer.y, 142, 518);
    },
      this
    );
  }

  //The firerate is fireRate per second
  var fireRate = FIREBALL_START_FIRE_RATE;

  function update() {
    resetTimer();

    if (isAllowedToShootFireball()) {
      shootFireball();
      increaseScoreForFireball();
    }
  }

  function isAllowedToShootFireball() {
    //Convert fire rate into seconds for next shot
    var intervalForNextShot = 1 / fireRate;
    return isSecondsPassed(intervalForNextShot, game);
  }

  function shootFireball() {
    //TO-DO
  }

  /**
   * Increases the score by the fireball increment.
   * 
   * TO-DO: Implement a new scorer class for more future scoring mechanics.
   */
  function increaseScoreForFireball() {
    score += SCORE_INCREMENT_FIREBALL;
    var formattedScore = formatScore();
    scoreCounterText.setText(formattedScore);
  }

  /**
   * According to the current score length, zeros are added to make the score
   * look cooler.
   */
  function formatScore() {
    if (score >= SCORE_MAXIMUM) {
      return SCORE_MAXIMUM;
    }

    var formattedScore = score.toString();
    var formattedScoreLength = formattedScore.length;
    var formattedMaxScoreLength = SCORE_MAXIMUM.toString().length;

    if (formattedScoreLength < formattedMaxScoreLength) {
      var lengthDifference = formattedMaxScoreLength - formattedScoreLength;

      for (var i = 0; i < lengthDifference; i++) {
        formattedScore = '0' + formattedScore;
      }
    }

    return formattedScore;
  }
}
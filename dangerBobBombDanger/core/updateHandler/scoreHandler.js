const handleScore = function () {
  scoreSingleton.increaseScore();
}

// singleton
const scoreSingleton = (function () {
  // private interface
  var scoreCounterText = null;
  var actualScore = 0;
  var displayedScore = 0;
  var scoreQ = [];
  var flow = true;

  const handleScoreQ = function () {
    if (flow && scoreQ.length) {
      flow = false;
      --scoreQ[0];
      formatScore(++displayedScore);

      if (scoreQ[0] === 0) {
        scoreQ.shift();
      }

      setGameTimeout(() => {
        flow = true;
      }, 25);
    }
  }

  /**
   * According to the current score length, zeros are added to make the score
   * look cooler.
   */
  const formatScore = function (score) {
    if (score >= SCORE_MAXIMUM) {
      return SCORE_MAXIMUM;
    }

    //TO-DO: Improve this with string padding
    var formattedScore = score.toString();
    var formattedScoreLength = formattedScore.length;

    var formattedMaxScoreLength = SCORE_MAXIMUM
      .toString()
      .length;

    if (formattedScoreLength < formattedMaxScoreLength) {
      var lengthDifference = formattedMaxScoreLength - formattedScoreLength;

      for (var i = 0; i < lengthDifference; i++) {
        formattedScore = '0' + formattedScore;
      }
    }
    if (scoreCounterText) {
      scoreCounterText.setText(formattedScore);
    }
  }

  // public interface
  return getReadOnlyObject({
    increaseScore: function () {
      handleScoreQ();
    },
    /**
     * reset should be called if the game is over
     */
    reset: function () {
      scoreCounterText = null;
      actualScore = 0;
      displayedScore = 0;
      flow = true;
      scoreQ = [];
    },
    /**
     * init function should be called in the create function
     * @param {*} q = queues to communicate
     */
    init: function (EventBus) {
      if (scoreCounterText) return;
      EventBus.on('score', ev => {
        var score = ev.score;
        actualScore += score;
        scoreQ.push(score);
      });
      var textHandler = new TextHandler($this);
      const scoreBoardTextPosY = 17;
      textHandler.createText(10, scoreBoardTextPosY, GAME_NAME);
      textHandler.createText(575, scoreBoardTextPosY, 'Score:');
      var sratrScore = '';
      for (var i = 0; i < SCORE_MAXIMUM.toString().length; i++) {
        sratrScore += '0';
      }
      scoreCounterText = textHandler.createText(
        685,
        scoreBoardTextPosY,
        sratrScore
      );
    },
    getScore: function () {
      return actualScore;
    }
  });
})();
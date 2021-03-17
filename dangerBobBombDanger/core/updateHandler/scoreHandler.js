const handleScore = function() {
  scoreSingleton.increaseScore();
}

// singleton
const scoreSingleton = (function() {
  // private interface
  var scoreCounterText = null;
  var actualScore = 0;
  var displayedScore = 0;
  var scoreQ = [];
  var flow = true;
  var queues = null;

  const handleScoreQ = function() {
    if (flow && scoreQ.length) {
      flow = false;
      --scoreQ[0];
      formatScore(++displayedScore);
      if (scoreQ[0] === 0) {
        scoreQ.shift();
      }
      var gameID = $gameID;
      setTimeout(() => {
        if (gameID !== $gameID) return;
        flow = true;
      }, 25);
    }
  }

   /**
   * According to the current score length, zeros are added to make the score
   * look cooler.
   */
  const formatScore = function(score) {
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
    increaseScore: function() {
      if (!scoreCounterText || !queues || !queues.score.length) {
        handleScoreQ();
        return;
      }
      var score = queues.score.shift();
      actualScore += score;
      scoreQ.push(score);
      handleScoreQ();
    },
    reset: function() {
      scoreCounterText = null;
      actualScore = 0;
      displayedScore = 0;
      flow = true;
      scoreQ = [];
      queues.score = [];
    },
    init: function(q) {
      if (scoreCounterText) return;
      queues = q;
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
    getScore: function() {
      return actualScore;
    }
  });
})();
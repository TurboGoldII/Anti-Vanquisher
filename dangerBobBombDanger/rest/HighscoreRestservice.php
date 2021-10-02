<?php

declare(strict_types=1);

namespace rest;

class HighscoreRestservice
{
  const FILE_PATH_HIGHSCORE = '';
  const HIGHSCORE_LIST_LIMIT = 50;

  public function storeHighscore(string $playerName, int $score): void
  {
    $highscores = json_decode(file_get_contents(self::FILE_PATH_HIGHSCORE), true);
    $highscores = $this->addHighscore($highscores, $playerName, $score);
    $highscores = $this->sortHighscores($highscores);
    file_put_contents(self::FILE_PATH_HIGHSCORE, json_encode($highscores));
  }

  private function addHighscore($highscores, $playerName, $score): array
  {
    $highscores[] = ['playerName' => $playerName, 'score' => $score];
    return $highscores;
  }

  private function sortHighscores($highscores)
  {
    $scores = [];

    foreach ($inventory as $key => $row) {
      $scores[$key] = $row['price'];
    }

    return array_multisort($scores, SORT_DESC, $inventory);
  }

  public function getHighscores(): string
  {
    /* TO-DO */
    return file_get_contents(self::FILE_PATH_HIGHSCORE);
  }
}

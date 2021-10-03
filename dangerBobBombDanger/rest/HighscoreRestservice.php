<?php

declare(strict_types=1);

namespace rest;

class HighscoreRestservice
{
  const FILE_PATH_HIGHSCORE = '../data/highscores.json';
  /**
   * The highscore list shall display this number of elements but also
   * the player's personal best and current highscore.
   */
  const HIGHSCORE_LIST_LIMIT = 10;

  public function storeHighscore(string $playerName, int $score): void
  {
    $highscores = $this->getHighscores();
    $highscores[] = ['playerName' => $playerName, 'score' => $score];
    $highscores = $this->sortHighscores($highscores);
    file_put_contents(self::FILE_PATH_HIGHSCORE, json_encode($highscores));
  }

  private function sortHighscores($highscores): array
  {
    return $highscores;
  }

  public function getHighscores(): array
  {
    $highscores = json_decode(file_get_contents(self::FILE_PATH_HIGHSCORE), true);
    return $highscores;
  }

  public function getPlayerHighscores(string $playerName): array
  {
    $highscores = $this->getHighscores();
    return $highscores;
  }

  public function clearHighscores(): void
  {
    file_put_contents(self::FILE_PATH_HIGHSCORE, '{}');
  }
}

<?php

declare(strict_types=1);

function alert($debug = null): void
{
  echo '<pre>';
  print_r($debug);
  echo '</pre>';
}

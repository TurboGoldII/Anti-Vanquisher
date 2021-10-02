<?php

declare(strict_types=1);

$restservice = $_POST['restservice'];
$restserviceMethod = $_POST['restserviceMethod'];
$playerName = json_decode($_POST['parameterPayload'], true);

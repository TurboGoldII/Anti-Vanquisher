<?php

declare(strict_types=1);
require_once('../api/utils/Functions.php');
$restserviceName = $_POST['restservice'];
$restserviceMethod = $_POST['restserviceMethod'];
/*
 * The parameters are directly passed to the restservice and therefore they
 * have to be in a numeric array.
 *
 * NOTE: Of course, it would be cooler if the parameters could be passed
 * in an associative array like so:
 *
 * "playerName": "Blorpo"
 */
$restserviceParameters = json_decode($_POST['parameters'], true);
require_once('./' . $restserviceName . '.php');
$namespaceRestserviceName = 'rest\\' . $restserviceName;
$restservice = new $namespaceRestserviceName();
$response = $restservice->$restserviceMethod(...$restserviceParameters);

if (is_array($response)) {
  echo json_encode($response);
} else {
  echo $response;
}

const handleUpdate = function (data) {
  handleProjectiles(data);
  handleScore();
  handlePlayers(data);

  data.EventBus.updateFunctions.do();
}
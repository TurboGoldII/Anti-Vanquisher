const handleUpdate = function (data) {
  handleProjectiles(data);
  handleScore();

  data.EventBus.updateFunctions.do();
}
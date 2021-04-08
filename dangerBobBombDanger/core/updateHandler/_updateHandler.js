const handleUpdate = function (data) {
  handleProjectiles(data);
  handleScore();

  for (let i = 0; i < data.EventBus.updateFunctions.length; i++) {
    data.EventBus.updateFunctions[i]();
  }
}
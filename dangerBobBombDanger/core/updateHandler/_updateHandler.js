const handleUpdate = function (p) {
  handleProjectiles(p.EventBus);
  handleScore();

  for (let i = 0; i < p.EventBus.updateFunctions.length; i++) {
    p.EventBus.updateFunctions[i]();
  }
}
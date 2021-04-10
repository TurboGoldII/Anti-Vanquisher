const PLAYER_HITBOX = {
  x: 10,
  y: 10
};

const PLAYER_HITBOX_OFFSET = {
  x: PLAYER_HITBOX.x - 4.5,
  y: PLAYER_HITBOX.y - 0.5
};

const FIREBALL_HITBOX = getReadOnlyObject({
  x: 10,
  y: 10
});

const FIRESTREAM_BUILDING_HITBOX = getReadOnlyObject({
  x: 5,
  y: 332
});

const FIRESTREAM_HITBOX = getReadOnlyObject({
  x: 20,
  y: FIRESTREAM_BUILDING_HITBOX.y
});

const CHARACTERS = getReadOnlyObject([
  {
    context: {
      scale: 2.4,
      hitbox: { x: 10, y: 10 },
      offset: { x: 10 - 4.5, y: 10 - 0.5 }
    },
    sprite: {
      name: 'bobOmb',
      path: 'assets/bobOmb.png',
      frame: { frameWidth: 21, frameHeight: 24 },
      anim: {
        frames: { start: 0, end: 7 },
        frameRate: 10,
        repeat: -1
      }
    },
    frozenSprite: {
      name: 'frozenBobOmb',
      path: 'assets/frozenBobOmb.png',
      frame: { frameWidth: 21, frameHeight: 24 },
      anim: null
    },
  }
]);
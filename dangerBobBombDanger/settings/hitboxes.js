const PLAYER_HITBOX = {
  x: 9,
  y: 9
};

/**
 * The hitbox offset is used to place the hitbox in the middle of the sprite.
 */
const PLAYER_HITBOX_OFFSET = {
  x: PLAYER_HITBOX.x - 3,
  y: PLAYER_HITBOX.y + 1
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
      hitbox: { x: PLAYER_HITBOX.x, y: PLAYER_HITBOX.y },
      offset: { x: PLAYER_HITBOX_OFFSET.x, y: PLAYER_HITBOX_OFFSET.y }
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
    }
  }
]);
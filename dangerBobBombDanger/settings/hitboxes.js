const PLAYER_HITBOX = {
  x: 9,
  y: 9
};

/**
 * The hitbox offset is used to place the hitbox in the middle of the sprite.
 */
const PLAYER_HITBOX_OFFSET = {
  x: PLAYER_HITBOX.x - 2,
  y: PLAYER_HITBOX.y
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

const FIRESTREAM_HITBOX_OFFSET = getReadOnlyObject({
  x: 4,
  y: 0
});

const CHARACTERS = getReadOnlyObject([
  {
    context: {
      scale: 2,
      hitbox: { x: PLAYER_HITBOX.x, y: PLAYER_HITBOX.y },
      offset: { x: PLAYER_HITBOX_OFFSET.x, y: PLAYER_HITBOX_OFFSET.y }
    },
    sprite: {
      name: 'bobOmb',
      path: 'assets/bobOmb.png',
      frame: { frameWidth: 24, frameHeight: 24 },
      anim: {
        frames: { start: 0, end: 7 },
        frameRate: 8,
        repeat: -1
      }
    },
    frozenSprite: {
      name: 'frozenBobOmb',
      path: 'assets/frozenBobOmb.png',
      frame: { frameWidth: 24, frameHeight: 24 },
      anim: null
    },
    vanquishSprite: {
      name: 'dudeVanquish',
      path: 'assets/mob/fire_dude_vanquish.png',
      frame: { frameWidth: 24, frameHeight: 24 },
      anim: {
        frames: { start: 0, end: 5 },
        frameRate: 6,
        repeat: -1
      }
    }
  },
  {
    context: {
      scale: 2,
      hitbox: { x: PLAYER_HITBOX.x, y: PLAYER_HITBOX.y },
      offset: { x: PLAYER_HITBOX_OFFSET.x + 1, y: PLAYER_HITBOX_OFFSET.y }
    },
    sprite: {
      name: 'bobOmb2',
      path: 'assets/bobOmb2.png',
      frame: { frameWidth: 24, frameHeight: 24 },
      anim: {
        frames: { start: 0, end: 7 },
        frameRate: 8,
        repeat: -1
      }
    },
    frozenSprite: {
      name: 'frozenBobOmb2',
      path: 'assets/frozenBobOmb2.png',
      frame: { frameWidth: 24, frameHeight: 24 },
      anim: {
        frames: { start: 0, end: 4 },
        frameRate: 8,
        repeat: -1
      }
    },
    vanquishSprite: {
      name: 'dudeVanquish',
      path: 'assets/mob/particle_flame_vanquish.png',
      frame: { frameWidth: 24, frameHeight: 24 },
      anim: {
        frames: { start: 0, end: 5 },
        frameRate: 6,
        repeat: -1
      }
    }
  }
]);
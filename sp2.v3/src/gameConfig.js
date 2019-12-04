import Phaser from 'phaser';
import TitleScene from './TitleScene';
import GameScene from './GameScene';
import GameOverScene from './GameOverScene';

import PreloadScene from './PreloadScene';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: [TitleScene, PreloadScene, GameScene, GameOverScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

export default config;

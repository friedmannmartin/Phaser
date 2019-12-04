import { Scene } from 'phaser';

class GameOverScene extends Scene {
  constructor() {
    super('gameOver');

    this.score = 0;
    this.highScore = 0;
  }

  init(data) {
    this.score = data.score;
    this.highScore = localStorage.getItem('highScore');
    if (this.highScore === 0 || this.highScore < this.score) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore);
    }
  }

  create() {
    const background = this.add.graphics();
    background.fillGradientStyle(0x1d2671, 0xc33764);
    background.fillRect(0, 0, 800, 600);

    this.gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px' });
    this.gameOverText.setOrigin(0.5);

    this.scoreText = this.add.text(200, 400, `Your score: ${this.score}`);

    this.highScoreText = this.add.text(400, 400, `Your high score: ${this.highScore}`);

    this.restartButton = this.add.text(200, 500, 'Restart');
    this.restartButton.setInteractive({ useHandCursor: true });
    this.restartButton.on('pointerdown', () => this.scene.start('game'));

    this.shareButton = this.add.text(400, 500, 'Share on Twitter');
    this.shareButton.setInteractive({ useHandCursor: true });
    this.shareButton.on('pointerdown', () => {
      $.ajax({
        type: 'post',
        crossDomain: true,
        dataType: 'jsonp',
        jsonpCallback: 'jsonp_callback',
        url: 'https://api.twitter.com/1.1/statuses/update.json',
        data: { statuts: `Hi i just played this amazing game and scored ${this.score}. Can you beat me? https://eso.vse.cz/~frim00/sp2.v3/` },
        headers: {
          consumer_key: 'cEmAwP4JpvEpywMhkwLv74j3i',
          consumer_secret: 'CMO6EpfI00PsNy3Aw6BIO7csXJzUH45JHz4KIBRSCqdZS2QxmH',
          access_token: '2364091712-emchSYoQ9qE5MHCXuzMPJ6goXl3uvrVKMEfodDn',
          access_token_secret: 'aZlSrf5Quy6pbgjyNV00AwFMkMzycufeHZ41Y98kkmF4O',
        },
        success: (data) => {
          console.log(data);
        },
      });
    });
  }
}

export default GameOverScene;

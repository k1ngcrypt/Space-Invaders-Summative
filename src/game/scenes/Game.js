import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
        this.enemyDirection = 1; // 1 for right, -1 for left
        this.enemySpeed = 50;    // pixels per second
        this.lives = 3;
    }

    create() {
        let score = 0;
        const enemies = ['A', 'B', 'B', 'C', 'C'];

        // Create a physics group for enemies
        this.enemyGroup = this.physics.add.group();

        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 5; j++) {
                const enemy = this.enemyGroup.create(
                    window.innerWidth / 8 + i * window.innerWidth / 15,
                    window.innerHeight / 8 + j * window.innerHeight / 15,
                    enemies[j] + '-Animation'
                ).setOrigin(0.5, 0.5);
                enemy.play(`${enemies[j]}-Animation`);
                enemy.type = j;
                enemy.name = enemies[j];
            }
        }

        this.enemyGroup.scaleXY(window.innerWidth / 800, window.innerHeight / 800);
        //player
        this.player = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 1.5, 'Player');
        this.player.setScale(window.innerWidth / 800, window.innerHeight / 800);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown-LEFT', () => {
            this.player.setVelocityX(-300);
        });
        this.input.keyboard.on('keyup-LEFT', () => {
            if (!this.cursors.right.isDown) this.player.setVelocityX(0);
        });
        this.input.keyboard.on('keydown-RIGHT', () => {
            this.player.setVelocityX(300);
        });
        this.input.keyboard.on('keyup-RIGHT', () => {
            if (!this.cursors.left.isDown) this.player.setVelocityX(0);
        });

        this.playerBullets = this.physics.add.group();

        this.input.keyboard.on('keydown-SPACE', () => {
            const bullet = this.playerBullets.create(this.player.x, this.player.y, 'Projectile_Player');
            bullet.setScale(window.innerWidth / 800, window.innerHeight / 800);
            bullet.setVelocityY(-500);
        });

        this.physics.add.collider(this.enemyGroup, this.playerBullets, onEnemyHit, null, this);

        //collision callback
        function onEnemyHit(enemy, bullet) {
            enemy.destroy();
            bullet.destroy();
            score += Math.round(
                (
                    (1 / 6) * (enemy.type ** 5)
                    - (15 / 2) * (enemy.type ** 3)
                    + 25 * (enemy.type ** 2)
                    - (83 / 3) * enemy.type
                    + 30
                )
            );
            this.events.emit('updateScore', score);
        }

        const scoreText = this.add.text(
            16, 16,
            'Score: 0',
            { fontSize: '32px', fill: '#fff' }
        );

        const updateScoreHandler = (newScore) => {
            scoreText.setText('Score: ' + newScore);
        };
        this.events.on('updateScore', updateScoreHandler);

        // Displays life

        const Livesdisplay = this.add.text(16, 50, 'Lives: 3', { font: '32px ', fill: '#fff' });



        // Remove event listener when scene shuts down
        this.events.once('shutdown', () => {
            this.events.off('updateScore', updateScoreHandler);
        });

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.enemyGroup.getChildren().length === 0) {
                    this.scene.start('GameOver', { score });
                }
            },
            loop: true
        });

        this.enemyProjectiles = this.physics.add.group();
        this.physics.add.collider(this.enemyProjectiles, this.player, (player, proj) => {
            proj.destroy();
            this.lives--;
            if (this.lives < 1) {
                player.destroy();
                this.scene.start('GameOver');
            }
        });

        // Create shelters
        this.shelterBlocks = this.physics.add.staticGroup();
        const shelterPositions = [200, 400, 600]; //X positions
        shelterPositions.forEach(x => {
            for (let i = 0; i < 8; i++) { // width
                for (let j = 0; j < 4; j++) { // height
                    const block = this.shelterBlocks.create(
                        x + i * 8, // adjust spacing as needed
                        window.innerHeight / 1.2 + j * 8,
                        'ShelterBlock'
                    );
                    block.setOrigin(0.5, 0.5);
                }
            }
        });

        // Collide player bullets with shelter blocks
        this.physics.add.collider(this.playerBullets, this.shelterBlocks, (bullet, block) => {
            bullet.destroy();
            block.destroy(); // Remove block to create a gap
        });

        // Collide enemy bullets with shelter blocks
        this.physics.add.collider(this.enemyProjectiles, this.shelterBlocks, (bullet, block) => {
            bullet.destroy();
            block.destroy();
        });
    }

    update(time, delta) {
        const group = this.enemyGroup;
        const speed = this.enemySpeed * (delta / 1000) * this.enemyDirection;

        group.children.iterate(enemy => {
            enemy.x += speed;
            if (Math.random() < 0.0015) {
                const projectile = this.enemyProjectiles.create(
                    enemy.x,
                    enemy.y,
                    `Projectile${enemy.name}_1`
                );
                projectile.setScale(window.innerWidth / 400, window.innerHeight / 400);
                projectile.setVelocityY(200);
                projectile.play(`Projectile${enemy.name}-Animation`);
            }
        });

        let hitEdge = false;
        group.children.iterate(enemy => {
            if (enemy.x <= 0 + enemy.displayWidth / 2 || enemy.x >= this.sys.game.config.width - enemy.displayWidth / 2) {
                hitEdge = true;
            }
        });
        if (hitEdge) {
            this.enemyDirection *= -1;
        }
    }
}
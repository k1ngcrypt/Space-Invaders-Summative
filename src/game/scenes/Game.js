import { Scene } from 'phaser';

// Main game scene
export class Game extends Scene {
    constructor() {
        super('Game');
        this.enemyDirection = 1; // Enemy movement direction
        this.enemySpeed = 50;    // Enemy speed
        this.lives = 3;          // Player lives
        this.ufodirection = 1;   // UFO movement direction
    }

    create() {
        this.score = 0;
        this.lives = 3;
        const enemies = ['A', 'B', 'B', 'C', 'C'];

        // Enemy group setup
        this.enemyGroup = this.physics.add.group();

        // Spawn enemies in grid
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

        // Player setup
        this.player = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 1.2, 'Player');
        this.player.setScale(window.innerWidth / 800, window.innerHeight / 800);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player.setImmovable(true);

        // Player movement controls
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

        // Player bullets group
        this.playerBullets = this.physics.add.group();
        this.bulletDb = true;
        this.input.keyboard.on('keydown-SPACE', () => {
            if (this.bulletDb) {
                const bullet = this.playerBullets.create(this.player.x, this.player.y, 'Projectile_Player');
                bullet.setScale(window.innerWidth / 800, window.innerHeight / 800);
                bullet.setVelocityY(-1000);
                this.bulletDb = false;
            }
        });

        // Enemy hit by player bullet
        this.physics.add.collider(this.enemyGroup, this.playerBullets, onEnemyHit, null, this);

        // Score calculation on enemy hit
        function onEnemyHit(enemy, bullet) {
            enemy.destroy();
            bullet.destroy();
            this.score += Math.round(
                (
                    (1 / 6) * (enemy.type ** 5)
                    - (15 / 2) * (enemy.type ** 3)
                    + 25 * (enemy.type ** 2)
                    - (83 / 3) * enemy.type
                    + 30
                )
            );
            this.bulletDb = true;
            this.events.emit('updateScore', this.score);
        }

        // Score display
        const scoreText = this.add.text(
            16, 16,
            'Score: 0',
            { fontSize: '32px', fill: '#fff' }
        );

        // Update score text
        const updateScoreHandler = (newScore) => {
            scoreText.setText('Score: ' + newScore);
        };
        this.events.on('updateScore', updateScoreHandler);

        // Lives display
        const Livesdisplay = this.add.text(16, 50, 'Lives: ' + String(this.lives), { font: '32px ', fill: '#fff' });

        // Update lives text
        const updateLivesDisplay = () => {
            Livesdisplay.setText('Lives: ' + String(this.lives));
        };

        // Remove event listener on shutdown
        this.events.once('shutdown', () => {
            this.events.off('updateScore', updateScoreHandler);
        });

        // Win condition check
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.enemyGroup.getChildren().length === 0) {
                    this.scene.start('Win');
                }
            },
            loop: true
        });

        // Enemy projectiles group
        this.enemyProjectiles = this.physics.add.group();

        // Player hit by enemy projectile
        this.physics.add.collider(this.enemyProjectiles, this.player, (player, proj) => {
            proj.destroy();
            this.lives--;
            updateLivesDisplay();
            if (this.lives < 1) {
                player.destroy();
                this.scene.start('Lose');
                this.registry.set('score', this.score);
            }
        });

        // Create shelters
        this.shelterBlocks = this.physics.add.staticGroup();
        const numShelters = 4;
        const shelterWidth = 5 * 30;
        const spacing = (window.innerWidth - numShelters * shelterWidth) / (numShelters + 1);
        const shelterPositions = [];
        for (let i = 0; i < numShelters; i++) {
            shelterPositions.push(spacing + i * (shelterWidth + spacing));
        }

        // Spawn shelter blocks
        shelterPositions.forEach(x => {
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 3; j++) {
                    const block = this.shelterBlocks.create(
                        x + i * 30,
                        window.innerHeight / 1.5 + j * 30,
                        'ShelterBlock'
                    );
                    block.setOrigin(0.5, 0.5);
                }
            }
        });

        // Player bullets destroy shelter blocks
        this.physics.add.collider(this.playerBullets, this.shelterBlocks, (bullet, block) => {
            bullet.destroy();
            block.destroy();
            this.bulletDb = true;
        });

        // Enemy bullets destroy shelter blocks
        this.physics.add.collider(this.enemyProjectiles, this.shelterBlocks, (bullet, block) => {
            bullet.destroy();
            block.destroy();
        });

        // UFO setup
        this.ufo = this.physics.add.sprite(window.innerWidth, window.innerHeight / 1.2, 'UFO')
            .setScale(window.innerWidth / 800, window.innerHeight / 800);
        this.ufo.setVisible(false);
        this.ufo.setActive(false);

        // UFO movement logic
        this.scheduleUfoAppearance();

        // UFO hit by player bullet
        this.physics.add.collider(this.playerBullets, this.ufo, (ufo, bullet) => {
            bullet.destroy();
            this.score += 100;
            this.events.emit('updateScore', this.score);
            ufo.destroy();
        });
    }

    // Schedule UFO appearance
    scheduleUfoAppearance() {
        const delay = Phaser.Math.Between(5000, 15000);
        this.time.delayedCall(delay, () => {
            this.showUfo();
        });
    }

    // Show and move UFO
    showUfo() {
        this.ufo.x = -this.ufo.displayWidth / 2;
        this.ufo.y = window.innerHeight / 12;
        this.ufo.setVisible(true);
        this.ufo.setActive(true);
        this.ufo.setVelocityX(225 * this.ufodirection);

        // Hide UFO after leaving screen
        this.ufoTimer = this.time.addEvent({
            delay: 16,
            callback: () => {
                if (this.ufo.x > this.sys.game.config.width + this.ufo.displayWidth / 2) {
                    this.ufo.setVisible(false);
                    this.ufo.setActive(false);
                    this.ufo.setVelocityX(0);
                    this.ufoTimer.remove();
                    this.ufodirection *= -1;
                    this.scheduleUfoAppearance();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    update(time, delta) {
        const group = this.enemyGroup;
        const speed = this.enemySpeed * (delta / 1000) * this.enemyDirection;

        // Move enemies and randomly shoot
        group.children.iterate(enemy => {
            enemy.x += speed;
            if (Math.random() < 0.0015) {
                const projectile = this.enemyProjectiles.create(
                    enemy.x,
                    enemy.y,
                    `Projectile${enemy.name}_1`
                );
                projectile.setScale(window.innerWidth / 400, window.innerHeight / 400);
                projectile.setVelocityY(800);
                projectile.play(`Projectile${enemy.name}-Animation`);
            }
        });

        // Change direction if any enemy hits edge
        let hitEdge = false;
        group.children.iterate(enemy => {
            if (enemy.x <= 0 + enemy.displayWidth / 2 || enemy.x >= this.sys.game.config.width - enemy.displayWidth / 2) {
                hitEdge = true;
            }
        });
        if (hitEdge) {
            this.enemyDirection *= -1;
        }

        // Destroy player bullets off screen
        this.playerBullets.getChildren().forEach(bullet => {
            if (bullet.y < 0) {
                bullet.destroy();
                this.bulletDb = true;
            }
        });

        // Destroy enemy projectiles off screen
        this.enemyProjectiles.getChildren().forEach(bullet => {
            if (bullet.y > this.sys.game.config.height) {
                bullet.destroy();
            }
        });
    }
}
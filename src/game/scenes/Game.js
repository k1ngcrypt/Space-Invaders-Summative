import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        let score = 0;
        const enemies = ['A', 'B','B','C', 'C'];

        // Create a physics group for enemies
        this.enemyGroup = this.physics.add.group();

        for (let i=0; i<12; i++) {
            for (let j=0; j<5; j++) {
                const enemy = this.enemyGroup.create(
                    window.innerWidth/8 + i * window.innerWidth/15,
                    window.innerHeight/8 + j * window.innerHeight/15,
                    enemies[j] + '-Animation'
                ).setOrigin(0.5, 0.5);
                enemy.play(`${enemies[j]}-Animation`);
                enemy.type = j;
            }
        }

        this.enemyGroup.scaleXY(window.innerWidth/800,window.innerHeight/800);
        //player
        this.player = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/1.5, 'Player');
        this.player.setScale(window.innerWidth/800,window.innerHeight/800);
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
            bullet.setVelocityY(-500);
        });

        this.physics.add.collider(this.enemyGroup, this.playerBullets, onEnemyHit, null, this);

        //collision callback
        function onEnemyHit(enemy, bullet) {
            enemy.destroy();
            bullet.destroy();
            score += (7*enemy.type**5-115*enemy.type**4+715*enemy.type**3-2075*enemy.type**2+2788*enemy.type-1260)/6;
        }

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }
}

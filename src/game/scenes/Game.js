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
        const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        const downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        const rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        const leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        const enemies = ['A', 'B','B','C', 'C'];

        // Create a physics group for enemies
        this.enemyGroup = this.physics.add.group();

        for (let i=0; i<12; i++) {
            for (let j=0; j<5; j++) {
                const enemy = this.enemyGroup.create(
                    100 + i * 50,
                    100 + j * 50,
                    enemies[j] + '-Animation'
                ).setOrigin(0.5, 0.5);
                enemy.play(`${enemies[j]}-Animation`);
                enemy.type = j;
            }
        }

        //player
        this.player = this.physics.add.sprite(400, 500, 'Player');

        this.playerBullets = this.physics.add.group();

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

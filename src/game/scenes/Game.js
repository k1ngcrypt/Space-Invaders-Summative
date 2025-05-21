import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        const downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        const rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        const leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        const enemies = ['A', 'B','B','C', 'C'];
        let enemymap = [];
        for (let i=0; i<12; i++) {
            enemymap[i] = [];
            for (let j=0; j<5; j++) {
                enemymap[i][j] = this.add.sprite(100 + i * 50, 100 + j * 50, enemies[j] + '-Animation').setOrigin(0.5, 0.5);
            }
        }
        

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}

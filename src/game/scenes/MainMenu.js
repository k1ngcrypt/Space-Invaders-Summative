import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {

        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo');

        this.add.text(window.innerWidth / 2, window.innerHeight / 3 * 2, 'SPACE INVADERS',
            font - family: "Workbench", fontSize: 38, color: '#ffffff', {
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        setInterval (() => {current += full[i++];
            Display.setText(current); 
        }, 100); 

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}

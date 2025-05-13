import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {

        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo');

        this.add.text(window.innerWidth/2, window.innerHeight/3*2, 'SPACE INVADERS', {
            fontFamily: 'Workbench, sans-serif', fontSize: 38, color: '#FFFFFF',
            stroke: '#000000', strokeThickness: 15,
            align: 'center'
        }).setOrigin(0.5);
let spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.once(spaceKey.isDown, () => {

            this.scene.start('Game');

        });
    }
}

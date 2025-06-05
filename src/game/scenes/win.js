import { Scene } from 'phaser';

// Win scene displayed when the player wins
export class Win extends Scene {
    constructor() {
        super('Win'); // Scene key
    }
    create() {
        this.cameras.main.setBackgroundColor(0xff0000); // Set background color

        // Display "You Win!" text
        this.add.text(512, 384, ('You Win!'), {
            fontFamily: 'Workbench', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Listen for SPACE key to return to MainMenu
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down', () => {
            this.scene.start('MainMenu');
        });
    }
}

import { Scene } from 'phaser';

// Lose scene, shown when the player loses
export class Lose extends Scene {
    constructor() {
        super('Lose'); // Set scene key
    }
    create() {
        this.cameras.main.setBackgroundColor(0xff0000); // Red background

        // Show final score
        this.add.text(512, 384, ('Score: ' + String(this.registry.get('score'))), {
            fontFamily: 'Workbench', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Listen for SPACE key to return to main menu
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down', () => {
            this.scene.start('MainMenu');
        });

    }
}
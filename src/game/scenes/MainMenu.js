import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Add logo image
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo');

        // Add title text
        const titleText = this.add.text(
            window.innerWidth / 2,
            (window.innerHeight / 4) * 3,
            ' PLAY \nSPACE INVADERS',
            {
                fontFamily: 'Workbench, sans-serif',
                fontSize: '38px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 15,
                align: 'center',
            }
        ).setOrigin(0.5);

        // Example of animating text (if needed)
        let current = '';
        const full = 'SPACE INVADERS';
        let i = 0;

        this.time.addEvent({
            delay: 100,
            callback: () => {
                if (i < full.length) {
                    current += full[i++];
                    titleText.setText(current);
                }
            },
            repeat: full.length - 1,
        });

        // Add space key input to start the game
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down', () => {
            this.scene.start('Game');
        });
    }
}

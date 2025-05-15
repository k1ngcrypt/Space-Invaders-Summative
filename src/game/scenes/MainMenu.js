import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Add title text
        const titleText = this.add.text(
            window.innerWidth / 2,
            (window.innerHeight / 4) * 3,
            'PLAY\nSPACE INVADERS',
            {
                fontFamily: 'Workbench, sans-serif',
                fontSize: '38px',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 15,
                align: 'center',
            }
        ).setOrigin(0.5,0.5);

        // Example of animating text (if needed)
        let current = '';
        const full = 'PLAY\nSPACE INVADERS';
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

        const subTitleText = this.add.text(
            window.innerWidth /2 , 
            (window.innerHeight /5)*3 ,
            'PRESS SPACE TO START',
            {
                fontFamily: 'Workbench, sans-serif',
                fontSize: '30px',
                color: '#FFFFFF',
                strokeThickness: 12,
                align: 'center'
            }
        ).setOrigin(0.5,0.5);

        current = '';
        const full1 = "PRESS SPACE TO START";
        i = 0;

        this.time.addEvent({
            delay: 100,
            callback: () => {
                if (i < full1.length) {
                    current += full1[i++];
                    subTitleText.setText(current);
                }
            },
            repeat: full1.length - 1
        });

        // Add space key input to start the game
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down', () => {
            this.scene.start('Game');
        });
    }
}

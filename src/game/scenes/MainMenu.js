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
                align: 'center'
            }
        ).setOrigin(0.5,0.5);

        // Title animation variables
        let currentTitle = '';
        const fullTitle = 'PLAY\nSPACE INVADERS';
        let iTitle = 0;

        this.time.addEvent({
            delay: 100,
            callback: () => {
                if (iTitle < fullTitle.length) {
                    currentTitle += fullTitle[iTitle++];
                    titleText.setText(currentTitle);
                }
            },
            repeat: fullTitle.length - 1,
        });

        const subTitleText = this.add.text(
            window.innerWidth / 2,
            (window.innerHeight / 5) * 3,
            'PRESS SPACE TO START',
            {
                fontFamily: 'Workbench, sans-serif',
                fontSize: '30px',
                color: '#FFFFFF',
                align: 'center'
            }
        ).setOrigin(0.5, 0.5);

        // Subtitle animation variables
        let currentSub = '';
        const fullSub = "PRESS SPACE TO START";
        let iSub = 0;

        this.time.addEvent({
            delay: 100,
            callback: () => {
                if (iSub < fullSub.length) {
                    currentSub += fullSub[iSub++];
                    subTitleText.setText(currentSub);
                }
            },
            repeat: fullSub.length - 1
        });

        // Add space key input to start the game
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down', () => {
            this.scene.start('Game');
        });
    }
}

import { Scene } from 'phaser';

// Main menu scene for the game
export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        // Animated title text
        const titleText = this.add.text(
            window.innerWidth / 2,
            window.innerHeight / 5,
            'PLAY\nSPACE INVADERS',
            {
                fontFamily: 'Workbench, sans-serif',
                fontSize: '38px',
                color: '#FFFFFF',
                align: 'center'
            }
        ).setOrigin(0.5, 0.5);

        // Title animation logic
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

        // Animated subtitle text
        const subTitleText = this.add.text(
            window.innerWidth / 2,
            (window.innerHeight / 4) + 20,
            'PRESS SPACE TO START',
            {
                fontFamily: 'Workbench, sans-serif',
                fontSize: '30px',
                color: '#FFFFFF',
                align: 'center'
            }
        ).setOrigin(0.5, 0.5);

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

        // Enemy sprites and animations
        this.badGuy1 = this.add.sprite(window.innerWidth / 2 - window.innerWidth / 12, window.innerHeight * 4 / 7, 'A-Animation');
        this.badGuy2 = this.add.sprite(window.innerWidth / 2 - window.innerWidth / 12, window.innerHeight * 4 / 7 + window.innerHeight / 12, "B-Animation");
        this.badGuy3 = this.add.sprite(window.innerWidth / 2 - window.innerWidth / 12, window.innerHeight * 4 / 7 + window.innerHeight / 6, "C-Animation");
        this.badGuy4 = this.add.image(window.innerWidth / 2 - window.innerWidth / 12, window.innerHeight * 4 / 7 + window.innerHeight / 4, "UFO");

        this.badGuy1.play('A-Animation');
        this.badGuy2.play('B-Animation');
        this.badGuy3.play('C-Animation');

        // Start game on space key press
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on('down', () => {
            this.scene.start('Game');
        });

        // Points text for each enemy type
        const minitext = this.add.text(
            window.innerWidth / 2,
            window.innerHeight * 4 / 7,
            '= 30 points',
            {
                fontFamily: 'Workbench,sans-serif',
                fontSize: '28px',
                color: '#ffffff'
            }
        ).setOrigin(0.5, 0.5);

        const minitext1 = this.add.text(
            window.innerWidth / 2,
            window.innerHeight * 4 / 7 + window.innerHeight / 12,
            '= 20 points',
            {
                fontFamily: 'Workbench,sans-serif',
                fontSize: '28px',
                color: '#ffffff'
            }
        ).setOrigin(0.5, 0.5);

        const minitext4 = this.add.text(
            window.innerWidth / 2,
            window.innerHeight * 4 / 7 + window.innerHeight / 6,
            '= 10 points',
            {
                fontFamily: 'Workbench,sans-serif',
                fontSize: '28px',
                color: '#ffffff'
            }
        ).setOrigin(0.5, 0.5);

        const minitext3 = this.add.text(
            window.innerWidth / 2,
            window.innerHeight * 4 / 7 + window.innerHeight / 4,
            '= ? points',
            {
                fontFamily: 'Workbench,sans-serif',
                fontSize: '28px',
                color: '#ffffff'
            }
        ).setOrigin(0.5, 0.5);

    }
}

import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');

        // anims
        this.load.image('A1', 'A1.png');
        this.load.image('A2', 'A2.png');
        this.load.image('B1', 'B1.png');
        this.load.image('B2', 'B2.png');
        this.load.image('C1', 'C1.png');
        this.load.image('C2', 'C2.png');

        // Remaining images
        this.load.image('EnemyExplosion', 'EnemyExplosion.png');
        this.load.image('Player', 'Player.png');
        this.load.image('PlayerExplosion', 'PlayerExplosion.png');
        this.load.image('ShieldFull', 'ShieldFull.png');
        this.load.image('UFO', 'UFO.png');
    }

    create ()
    {
        //global anims
        this.anims.create({
            key: 'A-Animation',
            frames: [{key: 'A1'}, {key: 'A2'}],
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'B-Animation',
            frames: [{key: 'B1'}, {key: 'B2'}],
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'C-Animation',
            frames: [{key: 'C1'}, {key: 'C2'}],
            frameRate: 20,
            repeat: -1
        });
        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}

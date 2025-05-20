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
        this.add.rectangle((window.innerWidth/2), (window.innerHeight/2), 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle((window.innerWidth/2)-(window.innerHeight/2-468), (window.innerHeight/2), 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets/Sprites/Invaders');
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

        // Load projectile images
        this.load.setPath('assets/Sprites/Projectiles');

        // Main projectile images
        this.load.image('missile_1', 'missile_1.png');
        this.load.image('missile_2', 'missile_2.png');
        this.load.image('missile_3', 'missile_3.png');
        this.load.image('missile_4', 'missile_4.png');
        this.load.image('Projectile_Player', 'Projectile_Player.png');
        this.load.image('ProjectileA_2', 'ProjectileA__2.png');
        this.load.image('ProjectileA_1', 'ProjectileA_1.png');
        this.load.image('ProjectileA_3', 'ProjectileA_3.png');
        this.load.image('ProjectileA_4', 'ProjectileA_4.png');
        this.load.image('ProjectileB_1', 'ProjectileB_1.png');
        this.load.image('ProjectileB_2', 'ProjectileB_2.png');
        this.load.image('ProjectileB_3', 'ProjectileB_3.png');
        this.load.image('ProjectileB_4', 'ProjectileB_4.png');
        this.load.image('ProjectileC_1', 'ProjectileC_1.png');
        this.load.image('ProjectileC_2', 'ProjectileC_2.png');
        this.load.image('ProjectileC_3', 'ProjectileC_3.png');
        this.load.image('ProjectileC_4', 'ProjectileC_4.png');

        // Subfolder projectile images
        this.load.setPath('assets/Sprites/Projectiles/ProjectileA');
        this.load.image('ProjectileA_1', '1.png');
        this.load.image('ProjectileA_2', '2.png');
        this.load.image('ProjectileA_3', '3.png');
        this.load.image('ProjectileA_4', '4.png');
        this.load.image('ProjectileA_Layer1', 'Layer 1.png');
        this.load.image('ProjectileA_Layer2', 'Layer 2 copy 3.png');

        this.load.setPath('assets/Sprites/Projectiles/ProjectileB');
        this.load.image('ProjectileB_1', '1.png');
        this.load.image('ProjectileB_2', '2.png');
        this.load.image('ProjectileB_3', '3.png');
        this.load.image('ProjectileB_4', '4.png');
        this.load.image('ProjectileB_Layer1', 'Layer 1.png');

        this.load.setPath('assets/Sprites/Projectiles/ProjectileC');
        this.load.image('ProjectileC_1', '1.png');
        this.load.image('ProjectileC_2', '2.png');
        this.load.image('ProjectileC_3', '3.png');
        this.load.image('ProjectileC_4', '4.png');
        this.load.image('ProjectileC_Layer1', 'Layer 1.png');
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

        this.anims.create({
            key: 'Missile-Animation',
            frames: [{key: 'missile_1'}, {key: 'missile_2'}, {key: 'missile_3'}, {key: 'missile_4'}],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'ProjectileA-Animation',
            frames: [
            { key: 'ProjectileA_1' },
            { key: 'ProjectileA_2' },
            { key: 'ProjectileA_3' },
            { key: 'ProjectileA_4' }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'ProjectileB-Animation',
            frames: [
            { key: 'ProjectileB_1' },
            { key: 'ProjectileB_2' },
            { key: 'ProjectileB_3' },
            { key: 'ProjectileB_4' }
            ],
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'ProjectileC-Animation',
            frames: [
            { key: 'ProjectileC_1' },
            { key: 'ProjectileC_2' },
            { key: 'ProjectileC_3' },
            { key: 'ProjectileC_4' }
            ],
            frameRate: 20,
            repeat: -1
        });

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}

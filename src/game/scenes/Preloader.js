import { Scene } from 'phaser';

// Preloader scene: loads assets and sets up animations
export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        // Center coordinates for progress bar
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Progress bar dimensions
        const barWidth = 468;
        const barHeight = 32;
        const innerBarWidth = 464;
        const innerBarHeight = 28;

        // Draw progress bar outline
        this.add.rectangle(centerX, centerY, barWidth, barHeight)
            .setStrokeStyle(2, 0xffffff);

        // Progress bar fill
        const progressBar = this.add.graphics();

        // Update progress bar on load progress
        this.load.on('progress', (progress) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(
                centerX - innerBarWidth / 2,
                centerY - innerBarHeight / 2,
                innerBarWidth * progress,
                innerBarHeight
            );
        });

        // Remove progress bar when loading is complete
        this.load.on('complete', () => {
            progressBar.destroy();
        });

        // Load invader sprites
        this.load.setPath('assets/Sprites/Invaders');
        this.load.image('A1', 'A1.png');
        this.load.image('A2', 'A2.png');
        this.load.image('B1', 'B1.png');
        this.load.image('B2', 'B2.png');
        this.load.image('C1', 'C1.png');
        this.load.image('C2', 'C2.png');
        this.load.image('EnemyExplosion', 'EnemyExplosion.png');
        this.load.image('Player', 'Player.png');
        this.load.image('PlayerExplosion', 'PlayerExplosion.png');
        this.load.image('ShieldFull', 'ShieldFull.png');
        this.load.image('UFO', 'UFO.png');

        // Load projectile sprites
        this.load.setPath('assets/Sprites/Projectiles');
        this.load.image('missile_1', 'missile_1.png');
        this.load.image('missile_2', 'missile_2.png');
        this.load.image('missile_3', 'missile_3.png');
        this.load.image('missile_4', 'missile_4.png');
        this.load.image('Projectile_Player', 'Projectile_Player.png');
        this.load.image('ProjectileA_2', 'ProjectileA_2.png');
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
    }

    create() {
        // Invader animations
        this.anims.create({
            key: 'A-Animation',
            frames: [{ key: 'A1' }, { key: 'A2' }],
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'B-Animation',
            frames: [{ key: 'B1' }, { key: 'B2' }],
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'C-Animation',
            frames: [{ key: 'C1' }, { key: 'C2' }],
            frameRate: 3,
            repeat: -1
        });

        // Missile animation
        this.anims.create({
            key: 'Missile-Animation',
            frames: [{ key: 'missile_1' }, { key: 'missile_2' }, { key: 'missile_3' }, { key: 'missile_4' }],
            frameRate: 20,
            repeat: -1
        });

        // Projectile animations
        this.anims.create({
            key: 'ProjectileA-Animation',
            frames: [
                { key: 'ProjectileA_1' },
                { key: 'ProjectileA_2' },
                { key: 'ProjectileA_3' },
                { key: 'ProjectileA_4' }
            ],
            frameRate: 5,
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
            frameRate: 5,
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
            frameRate: 5,
            repeat: -1
        });

        // Generate shelter block texture
        const gfx = this.make.graphics({ x: 0, y: 0, add: false });
        gfx.fillStyle(0xffffff, 1);
        gfx.fillRect(0, 0, 30, 30);
        gfx.generateTexture('ShelterBlock', 30, 30);
        gfx.destroy();

        // Start main menu scene
        this.scene.start('MainMenu');
    }
}

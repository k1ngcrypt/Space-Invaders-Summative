import { Scene } from 'phaser';

export class Win extends Scene
{
    constructor ()
    {
        super('Win');
    }
init(){
    this.score = score;
}
    create ()
    {
        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.text(512, 384, ('You Win!'), {
            fontFamily: 'Workbench', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}

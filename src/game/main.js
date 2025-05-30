import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { Win } from './scenes/win';
import { Lose } from './scenes/lose';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { AUTO, Game } from 'phaser';

let highscore = 0;

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    backgroundColor: '#000000', //black canvas
    scale: {
        mode: Phaser.Scale.RESIZE, // resizes with window
        autoCenter: Phaser.Scale.CENTER_BOTH // optional: center canvas
    },

    physics: {
        default: 'arcade'
    },

    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        Win,
        Lose
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;

import Style from "../styles/main.less";
import * as PIXI from "pixi.js";
import Game from "../src/game.js";

const GAME_HEIGHT = 1024;
const GAME_WIDTH = 768;

const renderer = PIXI.autoDetectRenderer(GAME_HEIGHT, GAME_WIDTH);
const stage = new PIXI.Container();
document.getElementById("gameContainer").appendChild(renderer.view);

const game = new Game(renderer, stage, GAME_HEIGHT, GAME_HEIGHT);
game.start();

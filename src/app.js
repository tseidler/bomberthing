import Style from "../styles/main.less";

import Game from "../src/game.js";

const GAME_HEIGHT = 1024;
const GAME_WIDTH = 768;

const gameContainer = document.getElementById("gameContainer");
const game = new Game(gameContainer, GAME_HEIGHT, GAME_WIDTH);
game.start();

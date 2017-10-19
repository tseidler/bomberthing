import Style from "../styles/main.less";

import Game from "../src/game.js";

const GAME_HEIGHT = 704;
const GAME_WIDTH = 1088;

const gameContainer = document.getElementById("gameContainer");
const game = new Game(gameContainer, GAME_WIDTH, GAME_HEIGHT);
game.load();

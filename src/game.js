import Bomb from './bomb';
import * as consts from './consts';
import GameControls from './gamecontrols';
import Level from './level';
import Player from './player';
import * as PIXI from 'pixi.js';
import * as sound from 'pixi-sound';
import { CHAR_WIDTH } from './consts';

class Game {
    constructor(container, width, height) {
        this.container = container;

        this.height = height;
        this.width = width;
        this.renderer = PIXI.autoDetectRenderer(width, height);
        this.stage = new PIXI.Container();
        
        this.container.appendChild(this.renderer.view);
    }

    load() {
        this.loadResources(consts.TEXTURE_MAP);

        // select a random level for loading
        this.level = new Level(consts.LEVELS[Math.floor(Math.random() * consts.LEVELS.length)]);
    }
    
    loadResources(resources) {
        this.music = PIXI.sound.Sound.from({
            url: 'sounds/theme.mp3',
            autoPlay: true,
            volume: 0.5,
            loop: true
        });

        for(const key in resources) {
            PIXI.loader.add(resources[key]);
        }
        PIXI.loader.load(this.start.bind(this));
    }

    start() {
        this.level.loadLayout();
        this.stage.addChild(this.level);
        this.setupPlayer();

        this.stage.addChild(this.player.sprite);
        this.bombs = [];

        this.setupControls();

        this.lastUpdate = Date.now();
        this.gameLoop();
    }

    gameLoop() {
        let elapsed = Date.now() - this.lastUpdate;

        this.player.update(elapsed);

        this.bombs.forEach(bombInGame => {
            bombInGame.bomb.update(elapsed);
            if(bombInGame.bomb.isDead()) {
                this.stage.removeChild(bombInGame.container);
            }
        });
        this.bombs = this.bombs.filter(bombInGame => bombInGame.bomb.isDead() === false);

        this.renderer.render(this.stage);
        this.lastUpdate = Date.now();
        requestAnimationFrame( () => { this.gameLoop() });
    }

    setupControls() {
        this.controls = new GameControls();

        // up (38)
        this.controls.setKey(38, () => { this.player.setMovement("up") }, () => { this.player.clearMovement("up") });
        // down (40)
        this.controls.setKey(40, () => { this.player.setMovement("down") }, () => { this.player.clearMovement("down") });
        // left (37)
        this.controls.setKey(37, () => { this.player.setMovement("left") }, () => { this.player.clearMovement("left") });
        // right (39)
        this.controls.setKey(39, () => { this.player.setMovement("right" )}, () => { this.player.clearMovement("right") });

        // space (32)
        this.controls.setKey(32, () => { this.spawnBomb() }, undefined);
    }

    setupPlayer() {
        let playerTexture = consts.TEXTURE_MAP['cat'];
        let playerSprite = new PIXI.Sprite(PIXI.loader.resources[playerTexture].texture);

        this.player = new Player("Player1", 
            consts.TILE_HEIGHT + 5, 
            consts.TILE_WIDTH + 5, 
            playerSprite);
        this.player.setBlockedTiles(this.level.getWalls());
    }

    spawnBomb() {
        let bombTexture = consts.TEXTURE_MAP['bomb'];
        let bombSprite = new PIXI.Sprite(PIXI.loader.resources[bombTexture].texture);
        let bomb = new Bomb(this.player.X(), this.player.Y(), bombSprite);

        let bombContainer = new PIXI.Container();
        bombContainer.addChild(bomb.sprite);
        this.stage.addChild(bombContainer);

        this.bombs.push({
            bomb: bomb,
            container: bombContainer
        });
    }
}

export default Game;

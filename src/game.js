import * as consts from './consts';
import GameControls from './gamecontrols';
import Level from './level';
import Player from './player';
import * as PIXI from "pixi.js";

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
        for(const key in resources) {
            PIXI.loader.add(resources[key]);
        }
        PIXI.loader.load(this.start.bind(this));
    }

    start() {
        this.level.load_layout();
        this.stage.addChild(this.level);

        this.player = new Player("Player1", consts.TILE_HEIGHT, consts.TILE_WIDTH, consts.TEXTURE_MAP['cat']);
        this.stage.addChild(this.player.sprite);

        this.setupControls();

        this.lastUpdate = Date.now();
        this.gameLoop();
    }

    gameLoop() {
        let elapsed = Date.now() - this.lastUpdate;

        this.player.update(elapsed);
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
    }
}

export default Game;

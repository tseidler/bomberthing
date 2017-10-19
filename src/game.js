import * as consts from './consts';
import Level from './level';
import Player from './player';
import * as PIXI from "pixi.js";

class Game {
    constructor(container, width, height) {
        this.container = container;

        this.height = height;
        this.width = width;
        this.renderer = PIXI.autoDetectRenderer(width, height);
        this.gameStage = new PIXI.Container();
        
        this.container.appendChild(this.renderer.view);

        this.time_since_color_change = 0;
    }

    load() {
        // select a random level for loading        
        this.level = new Level(30, 20, consts.LEVELS[Math.floor(Math.random() * consts.LEVELS.length)]);
        this.loadResources(consts.TEXTURE_MAP);
    }
    
    loadResources(resources) {
        for(const key in resources) {
            PIXI.loader.add(resources[key]);
        }
        PIXI.loader.load(this.start.bind(this));
    }

    start() {
        // get the level stage once (will never change)
        this.gameStage = this.level.getStage();

        this.player = new Player("Player1", consts.TILE_HEIGHT, consts.TILE_WIDTH, consts.TEXTURE_MAP['cat']);
        this.gameStage.addChild(this.player.sprite);

        this.lastUpdate = Date.now();
        this.gameLoop();
    }

    gameLoop() {
        let elapsed = Date.now() - this.lastUpdate;

        this.renderer.render(this.gameStage);

        this.lastUpdate = Date.now();
        requestAnimationFrame( () => { this.gameLoop() });
    }
}
function get_random_color() {
    let c = () => {
        var hex = Math.floor(Math.random()*256).toString(16);
        return ("0"+String(hex)).substr(-2); // pad with zero
    }
    return parseInt(c()+c()+c(), 16);
}

export default Game;

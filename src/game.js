import * as consts from './consts';
import Level from './level';
import * as PIXI from "pixi.js";

class Game {
    constructor(container, width, height) {
        this.container = container;

        this.height = height;
        this.width = width;
        this.renderer = PIXI.autoDetectRenderer(width, height);
        this.gameStage = new PIXI.Container();
        this.levelStage = new PIXI.Container();
        
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
        this.levelStage = this.level.getStage();
        this.lastUpdate = Date.now();
        this.gameLoop();
    }

    gameLoop() {
        let elapsed = Date.now() - this.lastUpdate;
        // this.time_since_color_change += elapsed;

        // if(this.time_since_color_change >= consts.COLOR_CHANGE_TIME) {
        //     this.time_since_color_change = 0;
        //     this.renderer.backgroundColor = get_random_color();
        // }

        this.renderer.render(this.levelStage);
        // this.renderer.render(this.gameStage);

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

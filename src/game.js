const COLOR_CHANGE_TIME = 150;

class Game {
    constructor(renderer, stage, height, width) {
        this.renderer = renderer;
        this.height = height;
        this.width = width;
        this.stage = stage;

        this.time_since_color_change = 0;
    }

    start() {
        this.lastUpdate = Date.now();
        this.gameLoop();
    }

    gameLoop() {
        let elapsed = Date.now() - this.lastUpdate;
        this.time_since_color_change += elapsed;

        if(this.time_since_color_change >= COLOR_CHANGE_TIME) {
            this.time_since_color_change = 0;
            this.renderer.backgroundColor = get_random_color();
        }

        this.renderer.render(this.stage);

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

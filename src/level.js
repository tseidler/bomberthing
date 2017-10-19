import * as PIXI from "pixi.js";
import {TEXTURE_MAP, TILE_WIDTH, TILE_HEIGHT} from "./consts";

export default class Level {
    constructor(width = 17, height = 12, layout) {
        this.num_horizontal_tiles = width;
        this.num_vertical_tiles = height;
        this.layout = layout;
    }

    getStage() {
        let stage = new PIXI.Container();
        let y = 0;
        for(let row of this.layout) {
            let x = 0;
            for(let tile of row) {
                let texture_filename = TEXTURE_MAP[tile];
                let sprite = new PIXI.Sprite(PIXI.loader.resources[texture_filename].texture);
                sprite.x = x;
                sprite.y = y;
                sprite.height = TILE_HEIGHT;
                sprite.width = TILE_WIDTH;
                stage.addChild(sprite);

                x += TILE_WIDTH;
            }
            y += TILE_HEIGHT;
        }
        return stage;
    }
}

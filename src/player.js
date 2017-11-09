import * as PIXI from "pixi.js";
import {TILE_WIDTH, TILE_HEIGHT} from "./consts";

export default class Player {
    constructor(name, x, y, texture) {
        this.name = name;

        this.sprite = new PIXI.Sprite(PIXI.loader.resources[texture].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = TILE_WIDTH;
        this.sprite.height = TILE_HEIGHT;
    }
}

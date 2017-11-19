import * as PIXI from "pixi.js";
import {TILE_WIDTH, TILE_HEIGHT, PLAYER_MOVE_SPEED} from "./consts";

export default class Player {
    constructor(name, x, y, texture) {
        this.name = name;

        this.sprite = new PIXI.Sprite(PIXI.loader.resources[texture].texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = TILE_WIDTH/1.25;
        this.sprite.height = TILE_HEIGHT/1.25;

        this.movement = {x: 0, y: 0};
    }

    update(elapsedTime) {
        this.sprite.x += this.movement.x * elapsedTime;
        this.sprite.y += this.movement.y * elapsedTime;
    }

    setMovement(direction) {
        switch(direction) {
            case "up":
                this.movement.y = -PLAYER_MOVE_SPEED;
                break;
            case "down":
                this.movement.y = PLAYER_MOVE_SPEED;
                break;
            case "left":
                this.movement.x = -PLAYER_MOVE_SPEED;
                break;
            case "right":
                this.movement.x = PLAYER_MOVE_SPEED;
                break;
        }
    }

    clearMovement(direction) {
        switch(direction) {
            case "up":
                this.movement.y = Math.max(this.movement.y, 0);
                break;
            case "down":
                this.movement.y = Math.min(this.movement.y, 0);
                break;
            case "left":
                this.movement.x = Math.max(this.movement.x, 0);
                break;
            case "right":
                this.movement.x = Math.min(this.movement.x, 0);
                break;
        }
    }
}

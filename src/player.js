import {TILE_WIDTH, TILE_HEIGHT, PLAYER_MOVE_SPEED} from './consts';
import {rectangle_intersect} from './helpers/intersect';

export default class Player {
    constructor(name, x, y, sprite) {
        this.name = name;

        this.sprite = sprite;
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = TILE_WIDTH/1.25;
        this.sprite.height = TILE_HEIGHT/1.25;

        this.movement = {x: 0, y: 0};
        this.blocked_tiles = [];
    }

    update(elapsedTime) {
        let new_x = this.sprite.x + this.movement.x * elapsedTime;
        let new_y = this.sprite.y + this.movement.y * elapsedTime;

        // only set the new x/y position if it's not blocked (wall, bomb, etc.)
        this.sprite.x = this.is_position_blocked({x: new_x, y: this.sprite.y}) ? this.sprite.x : new_x;
        this.sprite.y = this.is_position_blocked({x: this.sprite.x, y: new_y}) ? this.sprite.y : new_y;
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

    setBlockedTiles(wallSprites) {
        this.blocked_tiles = wallSprites;
    }

    is_position_blocked(position) {
        let player_rect = {
            top: position.y,
            left: position.x,
            right: position.x + this.sprite.width,
            bottom: position.y + this.sprite.height
        }
        return this.blocked_tiles.some((tile) => {
            let tile_rect = {
                top: tile.y,
                left: tile.x,
                right: tile.x + tile.width,
                bottom: tile.y + tile.height,
            }
            return rectangle_intersect(player_rect, tile_rect);
        });
    }
}

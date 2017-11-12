export default class GameControls {
    constructor() {
        this.keys = {};
    }

    setKey(keyCode, pressCallback = undefined, releaseCallback = undefined) {
        if(!this.keys.hasOwnProperty(keyCode)) {
            this.keys[keyCode] = {
                isDown:     false,
                isUp:       true,
                onPress:    [],
                onRelease:  []
            };
        }

        let key = this.keys[keyCode];
        if(pressCallback) { key.onPress.push(pressCallback); }
        if(releaseCallback) { key.onRelease.push(releaseCallback); }

        // Call onPress callbacks
        key.downHandler = function (oEvent) {
            if(oEvent.keyCode === keyCode) {
                if(key.isUp && key.onPress) {
                    key.onPress.forEach(callback => {
                        callback();
                    });
                }
                key.isDown = true;
                key.isUp = false;
            }
            oEvent.preventDefault();
        }

        // Call onRelease callbacks
        key.upHandler = function (oEvent) {
            if(oEvent.keyCode === keyCode) {
                if(key.isDown && key.onRelease) {
                    key.onRelease.forEach(callback => {
                        callback();
                    })
                }
                key.isDown = false;
                key.isUp = true;
            }
            oEvent.preventDefault();
        }

        window.addEventListener("keydown", key.downHandler.bind(this));
        window.addEventListener("keyup", key.upHandler.bind(this));
    }

    clearKey(keyCode) {
        let key = this.keys[keyCode];
        window.removeEventListener("keydown", key.downHandler);
        window.removeEventListener("keyup", key.upHandler)
    }
}

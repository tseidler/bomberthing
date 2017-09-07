const PIXI = require("pixi.js");
const PixiApp = require("pixiapp");
const inherits = require("inherits");

function BomberThing() {
    PixiApp.call(this, 1024, 768);
    let t = new PIXI.Text("Hello PIXI.js!");
    this.addChild(t);
}

inherits(BomberThing, PixiApp);

new BomberThing();
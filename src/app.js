const PIXI = require("pixi.js");
const inherits = require("inherits");

function BomberThing() {
    let t = new PIXI.Text("Hello PIXI.js!");
    this.addChild(t);
}

new BomberThing();
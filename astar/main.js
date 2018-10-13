var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

}

var bmd;

function create() {

	bmd = game.add.bitmapData(800, 600);

	bmd.context.fillStyle = 'rgba(255, 0, 0, 0.3)';

	//	Add the bmd as a texture to an Image object.
	//	If we don't do this nothing will render on screen.
	game.add.sprite(0, 0, bmd);

}

function update() {

	if (game.input.activePointer.isDown)
	{
        var size = 20;
        var x = game.input.activePointer.position.x - (size/2);
        var y = game.input.activePointer.position.y - (size/2);
		bmd.context.fillRect(x, y, 20, 20);

		//	Because we're changing the context manually, we need to tell Phaser the texture is dirty.
		//	You only need to do this in WebGL mode. In Canvas it's not needed.
		bmd.dirty = true;
	}

}


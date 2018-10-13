
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function createUI() {

    game.create.grid('uiGrid', 32 * 16, 32, 32, 32, 'rgba(255,255,255,0.5)');

    //  Create some icons
    var arrow = [
        '  22  ',
        ' 2222 ',
        '222222',
        '  22  ',
        '  22  '
    ];

    var plus = [
        '2222222',
        '2.....2',
        '2..3..2',
        '2.222.2',
        '2..2..2',
        '2.....2',
        '2222222'
    ];

    var minus = [
        '2222222',
        '2.....2',
        '2.....2',
        '2.222.2',
        '2.....2',
        '2.....2',
        '2222222'
    ];

    var disk = [
        'DDDDDDDDDD',
        'DED1111DED',
        'DED1111DDD',
        'DEDDDDDDED',
        'DEEEEEEEED',
        'DEFFFFFFED',
        'DEFF222FED',
        'DEFF222FED',
        'DEFF222FED',
        'DDDDDDDDDD'
    ];

    game.create.texture('arrow', arrow, 2);
    game.create.texture('plus', plus, 3);
    game.create.texture('minus', minus, 3);
    game.create.texture('save', disk, 4);

    ui = game.make.bitmapData(800, 32); 
    ui.addToWorld();

    var style = { font: "20px Courier", fill: "#fff", tabs: 80 };
    var widthUp = game.add.sprite(100, 60, 'plus');
    widthUp.name = 'width';
    widthUp.inputEnabled = true;
    widthUp.input.useHandCursor = true;
    var widthUp2 = game.add.sprite(200, 60, 'save');
    widthUp2.name = 'disk';
    widthUp2.inputEnabled = true;
    widthUp2.input.useHandCursor = true;
    //widthUp.events.onInputDown.add(increaseSize, this);


    //game.add.text(12, 9, pmap.join("\t"), { font: "14px Courier", fill: "#000", tabs: 32 });
    //game.add.text(11, 8, pmap.join("\t"), { font: "14px Courier", fill: "#ffff00", tabs: 32 });


}
function create() {

    //   So we can right-click to erase
    document.body.oncontextmenu = function() { return false; };

    Phaser.Canvas.setUserSelect(game.canvas, 'none');
    Phaser.Canvas.setTouchAction(game.canvas, 'none');

    game.stage.backgroundColor = '#505050';

    createUI();

}

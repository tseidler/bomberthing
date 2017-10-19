const TEXTURE_MAP = {
    'G':    'images/grass.png',
    'W':    'images/wall.png'
};

const LEVELS = [
    // 0:
    [    
        ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W'],
        ['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
        ['W','G','W','G','W','G','W','G','W','G','W','G','W','G','W','G','W'],
        ['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
        ['W','G','W','G','W','G','W','G','W','G','W','G','W','G','W','G','W'],
        ['W','G','G','G','G','G','G','G','W','G','G','G','G','G','G','G','W'],
        ['W','G','W','G','W','G','W','G','W','G','W','G','W','G','W','G','W'],
        ['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
        ['W','G','W','G','W','G','W','G','W','G','W','G','W','G','W','G','W'],
        ['W','G','G','G','G','G','G','G','G','G','G','G','G','G','G','G','W'],
        ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W']
    ]
];

const COLOR_CHANGE_TIME = 150;

export {
    LEVELS,
    TEXTURE_MAP,
    COLOR_CHANGE_TIME
}

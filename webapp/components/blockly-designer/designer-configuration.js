import toolbox from './toolbox.js';

const designerConfiguration = {
    media: '../node_modules/blockly/media/',
    toolbox,
    zoom: {
        controls: false,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    grid: {
        spacing: 45,
        length: 7,
        colour: 'rgba(189, 195, 199, 0.30)',
        snap: true
    },
    trashcan: false
};

export default designerConfiguration;

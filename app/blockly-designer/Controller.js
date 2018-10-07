import toolbox from './Toolbox.js';


const designerConfiguration = {
    media: '../node_modules/blockly/media/',
    toolbox,
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    grid: {
        spacing: 25,
        length: 3,
        colour: '#ccc',
        snap: true
    },
    trashcan: true
};


export class Controller {

    constructor(domContainer) {

        this.blockly = Blockly.inject(domContainer, designerConfiguration);

        window.addEventListener('resize', () => this.resize(), false);
        this.resize();
    }

    resize() {
        Blockly.svgResize(this.blockly);
    }

    addChangeListener(cb) {
        this.blockly.addChangeListener(cb);
    }

    getPythonCode() {
        return Blockly.Python.workspaceToCode(this.blockly);
    }

    getJSCode() {
        return Blockly.JavaScript.workspaceToCode(this.blockly);
    }

}
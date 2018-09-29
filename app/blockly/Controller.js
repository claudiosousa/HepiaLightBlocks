import config from './Config.js';
import './custom-blocks.js';

export default class {

    constructor(domContainer) {

        this.blockly = Blockly.inject(domContainer, config);

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
}
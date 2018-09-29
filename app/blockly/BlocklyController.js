export default class BlocklyController {

    constructor(domContainer, config) {

        this.blockly = Blockly.inject(domContainer, config);

        window.addEventListener('resize', () => this.resize(), false);
        this.resize();
    }

    resize() {
        Blockly.svgResize(this.blockly);
    }

    addChangeListener(cb) {
        this.blockly.addChangeListener(() => {
            const pythonCode = PR.prettyPrintOne(Blockly.Python.workspaceToCode(this.blockly), 'py');
            cb(pythonCode);
        });
    }
}
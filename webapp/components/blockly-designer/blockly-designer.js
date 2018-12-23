import configuration from './designer-configuration.js';

class BlocklyDesigner extends HTMLElement {
    // retrieves the current BlocklyDesigner designer instance
    static get instance() {
        return BlocklyDesigner._instance;
    }

    constructor() {
        super();

        BlocklyDesigner._instance = this;

        this.render();
    }

    render() {
        this.blockly = Blockly.inject(this, configuration);

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

    getXml() {
        const xml = Blockly.Xml.workspaceToDom(this.blockly);
        return Blockly.Xml.domToPrettyText(xml);
    }

    loadXml(xmlText) {
        this.blockly.clear();
        const xml = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(xml, this.blockly);
    }

    zoomIn() {
        this.blockly.zoomCenter(1);
    }

    zoomOut() {
        this.blockly.zoomCenter(-1);
    }
}

customElements.define('blockly-designer', BlocklyDesigner);

export default BlocklyDesigner;

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

class BlocklyDesigner extends HTMLElement {
    constructor() {
        super();

        this.render();
    }

    render() {
        this.blockly = Blockly.inject(this, designerConfiguration);

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

import toolbox from './Toolbox.js';
import downloadFile from '../tools/downloadFile.js';
import uploadFile from '../tools/uploadFile.js';

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

    static get DEFAULT_WORKSPACE_FILE() {
        return 'hepialight.xml';
    }

    constructor(domContainer) {
        this.workspace_file = Controller.DEFAULT_WORKSPACE_FILE;
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

    getXml() {
        const xml = Blockly.Xml.workspaceToDom(this.blockly);
        return Blockly.Xml.domToPrettyText(xml);
    }

    loadXml(xmlText, filename) {
        this.blockly.clear();
        const xml = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(xml, this.blockly);
        this.workspace_file = filename;
    }

    downloadXml() {
        downloadFile(this.workspace_file, this.getXml());
    }

    async loadFromFile() {
        const [filename, fileContent] = await uploadFile('.xml');
        this.loadXml(fileContent, filename);
    }
}
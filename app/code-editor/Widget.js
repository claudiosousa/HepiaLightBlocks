import download from '../tools/downloadFile.js';

class PythonWidget extends HTMLElement {
    constructor() {
        super();
        this;
    }

    setBlockly(blockly) {
        this.blockly = blockly;
        this.blockly.addChangeListener(code => this.displayCode(code));
    }

    displayCode() {
        this.innerHTML = PR.prettyPrintOne(this.blockly.getPythonCode(), 'py');
    }

    download() {
        download('MAIN.PY', this.blockly.getPythonCode());
    }
}

customElements.define('python-widget', PythonWidget);

export default PythonWidget;

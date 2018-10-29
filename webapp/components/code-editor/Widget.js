import downloadFile from '../../tools/downloadFile.js';

class PythonWidget extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.appendChild($('<pre class="prettyprint">')[0]);
        this.root = this.firstChild;
    }

    setBlockly(blockly) {
        this.blockly = blockly;
        this.blockly.addChangeListener(code => this.displayCode(code));
    }

    displayCode() {
        this.root.innerHTML = PR.prettyPrintOne(
            this.blockly.getPythonCode(),
            'py',
            true
        );
    }

    download() {
        downloadFile('MAIN.PY', this.blockly.getPythonCode());
    }
}

customElements.define('python-widget', PythonWidget);

export default PythonWidget;

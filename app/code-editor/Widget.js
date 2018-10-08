import download from '../tools/downloadFile.js';

export class Widget {

    constructor(domContainer, blockly) {

        this.domContainer = domContainer;
        this.blockly = blockly;
        this.blockly.addChangeListener(code => this.displayCode(code));
    }


    displayCode() {
        this.domContainer.innerHTML = PR.prettyPrintOne(this.blockly.getPythonCode(), 'py');
    }

    download() {
        download('MAIN.PY', this.blockly.getPythonCode());
    }
}
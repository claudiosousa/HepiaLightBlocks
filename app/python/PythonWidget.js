export default class PythonWidget {

    constructor(domContainer, blockly) {

        this.domContainer = domContainer;
        this.blockly = blockly;
        this.blockly.addChangeListener(code => this.displayCode(code));
    }


    displayCode(code) {
        this.domContainer.innerHTML = code;
    }
}
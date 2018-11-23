import BlocklyDesigner from '../blockly-designer/index.js';
import { downloadFile } from '../tools/file-tools.js';
class PythonWidget extends HTMLElement {
    connectedCallback() {
        PythonWidget.instance = this;

        this.codeWidget = CodeMirror(this, {
            mode: 'python',
            theme: 'midnight'
        });
        BlocklyDesigner.instance.addChangeListener(code =>
            this.displayCode(code)
        );
    }

    getCode() {
        return this.codeWidget.getValue();
    }

    displayCode() {
        this.codeWidget.setValue(BlocklyDesigner.instance.getPythonCode());
    }

    download() {
        downloadFile('MAIN.PY', this.getCode());
    }
}

customElements.define('python-widget', PythonWidget);

export default PythonWidget;

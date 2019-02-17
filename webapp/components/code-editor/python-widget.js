import BlocklyDesigner from '../blockly-designer/index.js';
import { downloadFile } from '../tools/file-tools.js';
class PythonWidget extends HTMLElement {
    connectedCallback() {
        PythonWidget.instance = this;

        this.codeWidget = CodeMirror(this, {
            mode: 'python',
            theme: 'midnight'
        });
        $('#python-override-modal').on('show.bs.modal', event => {
            debugger;
            this.displayCode(code);
        });

        BlocklyDesigner.instance.addChangeListener(code => {
            if (this.isClean()) {
                this.displayCode(code);
            } else {
                $('#python-override-modal').modal('show');
            }
        });
        this.codeWidget.markClean();
    }

    getCode() {
        return this.codeWidget.getValue();
    }

    displayCode() {
        this.codeWidget.setValue(BlocklyDesigner.instance.getPythonCode());
        this.codeWidget.markClean();
    }

    isClean() {
        return this.codeWidget.isClean();
    }

    download() {
        downloadFile('MAIN.PY', this.getCode());
    }
}

customElements.define('python-widget', PythonWidget);

export default PythonWidget;

import BlocklyDesigner from '../blockly-designer/index.js';
import { downloadFile } from '../tools/file-tools.js';
class PythonWidget extends HTMLElement {
    connectedCallback() {
        PythonWidget.instance = this;

        this.codeWidget = CodeMirror(this, {
            mode: 'python',
            theme: 'midnight'
        });

        $('#python-override-modal .btn-override-code').on('click', () =>
            this.displayCode()
        );

        BlocklyDesigner.instance.addChangeListener(code => {
            if (this.isClean()) {
                this.displayCode();
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

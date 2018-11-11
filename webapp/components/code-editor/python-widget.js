import BlocklyDesigner from '../blockly-designer/index.js';
import { downloadFile } from '../tools/file-tools.js';

class PythonWidget extends HTMLElement {
    connectedCallback() {
        this.appendChild($('<pre class="prettyprint">')[0]);
        this.root = this.firstChild;
        BlocklyDesigner.instance.addChangeListener(code =>
            this.displayCode(code)
        );
    }

    displayCode() {
        this.root.innerHTML = PR.prettyPrintOne(
            BlocklyDesigner.instance.getPythonCode(),
            'py',
            true
        );
    }

    download() {
        downloadFile('MAIN.PY', BlocklyDesigner.instance.getPythonCode());
    }
}

customElements.define('python-widget', PythonWidget);

export default PythonWidget;

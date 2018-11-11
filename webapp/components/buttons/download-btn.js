import { downloadFile } from '../tools/fileTools.js';
import BlocklyDesigner from '../blockly-designer/index.js';

class DownloadBtn extends HTMLButtonElement {
    connectedCallback() {
        $(this).click(() => this.downloadFile());
    }

    downloadFile() {
        downloadFile('MAIN.PY', BlocklyDesigner.instance.getPythonCode());
    }
}

customElements.define('download-btn', DownloadBtn, { extends: 'button' });

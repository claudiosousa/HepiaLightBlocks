import PythonWidget from '../code-editor/python-widget.js';
import { communicationService } from '../../services/CommunicationService.js';

class ExecuteBtn extends HTMLButtonElement {
    connectedCallback() {
        $(this).click(() => this.execute());
    }

    async execute() {
        const code = PythonWidget.instance.getCode();
        $(this).attr('disabled', 'disabled');
        communicationService.send('RUN', code);
        setTimeout(() => $(this).removeAttr('disabled'), 600);
    }
}

customElements.define('execute-btn', ExecuteBtn, { extends: 'button' });

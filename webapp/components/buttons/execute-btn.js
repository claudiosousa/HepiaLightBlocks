import BlocklyDesigner from '../blockly-designer/index.js';

class ExecuteBtn extends HTMLButtonElement {
    connectedCallback() {
        $(this).click(() => this.execute());
    }

    async execute() {
        const code = BlocklyDesigner.instance.getPythonCode();
        $(this).attr('disabled', 'disabled');
        try {
            await fetch('write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({ code })
            });
        } catch (err) {}
        $(this).removeAttr('disabled');
    }
}

customElements.define('execute-btn', ExecuteBtn, { extends: 'button' });

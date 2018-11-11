import BlocklyDesigner from '../blockly-designer/index.js';

class ZoomButtons extends HTMLElement {
    constructor() {
        super();

        $(this).addClass('btn-group');

        this.innerHTML = `
        <button class="btn btn-primary zoom-in-btn">
            <i class="fa fa-plus-circle"></i>
        </button>
        <button class="btn btn-primary zoom-out-btn">
          <i class="fa fa-minus-circle"></i>
        </button>
        `;
    }

    connectedCallback() {
        $(this)
            .find('.zoom-in-btn')
            .click(() => BlocklyDesigner.instance.zoomIn());
        $(this)
            .find('.zoom-out-btn')
            .click(() => BlocklyDesigner.instance.zoomOut());
    }
}

customElements.define('zoom-buttons', ZoomButtons);

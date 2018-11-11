import BlocklyDesigner from './blockly-designer/index.js';
import ProjectName from './project-name.js';

const INNER_HTML = `
<style>
    .dropping-file {
        display: none;
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 9999;
    }

    [dropping='true'] .dropping-file {
        display: block;
    }
</style>

<div class="dropping-file">
    <div class="drop-welcome"><span>Ouvrir le fichier</span></div>
</div>
`;

class DroppableArea extends HTMLBodyElement {
    constructor() {
        super();

        $(this).append(INNER_HTML);
    }

    connectedCallback() {
        $(this)
            .on('dragover', ({ originalEvent: e }) => this.dragover(e))
            .on('dragleave', ({ originalEvent: e }) => this.dragleave(e))
            .on('drop', ({ originalEvent: e }) => this.drop(e));
    }

    hideDropArea(timeout = 1000) {
        this.hideDropAreaTimeout = setTimeout(
            () => this.removeAttribute('dropping'),
            timeout
        );
    }

    showDropArea() {
        clearTimeout(this.hideDropAreaTimeout);

        this.setAttribute('dropping', 'true');
    }

    dragover(e) {
        e.stopPropagation();
        e.preventDefault();

        if (e.dataTransfer.items.length < 1) return;
        const file = e.dataTransfer.items[0];
        if (file.kind != 'file' || file.type != 'text/xml') {
            e.dataTransfer.dropEffect = 'none';
            return;
        }
        e.dataTransfer.dropEffect = 'copy';
        this.showDropArea();
    }

    dragleave(e) {
        this.hideDropArea();

        e.stopPropagation();
        e.preventDefault();
    }

    drop(e) {
        e.stopPropagation();
        e.preventDefault();

        this.hideDropArea(0);

        if (e.dataTransfer.files.length < 1) return;
        const file = e.dataTransfer.files[0];
        if (file.type != 'text/xml') return;

        const reader = new FileReader();
        reader.onload = e => {
            BlocklyDesigner.instance.loadXml(e.target.result);
            ProjectName.instance.setProjectName(file.name.replace(/\.xml/, ''));
        };
        reader.readAsText(file);
    }
}

customElements.define('droppable-area', DroppableArea, { extends: 'body' });

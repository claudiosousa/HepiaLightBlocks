import BlocklyDesigner from './blockly-designer/index.js';
import { downloadFile } from './tools/file-tools.js';

const INNER_HTML = `
<style>
    project-name input{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

</style>

<input name="project-name" type="text" class="form-control" placeholder="Choisit un nom de projet">
<button class="btn save-btn btn-primary">
    <i class="fa fa-save"></i>
</button>
`;

class ProjectName extends HTMLElement {
    static get DEFAULT_NAME() {
        return 'hepialight-untitled';
    }

    static get instance() {
        return ProjectName._instance;
    }

    constructor() {
        super();

        ProjectName._instance = this;

        $(this).append(INNER_HTML);
    }

    get projectName() {
        if (!this.projectNameInput.val())
            this.setProjectName(ProjectName.DEFAULT_NAME);
        return this.projectNameInput.val();
    }

    connectedCallback() {
        this.projectNameInput = $(this).find('[name="project-name"]');
        this.saveBtn = $(this)
            .find('.save-btn')
            .click(() => this.save());
    }

    setProjectName(name) {
        this.projectNameInput.val(name);
    }

    save() {
        const projectName = this.projectName;
        downloadFile(`${projectName}.xml`, BlocklyDesigner.instance.getXml());
    }
}

customElements.define('project-name', ProjectName);

export default ProjectName;

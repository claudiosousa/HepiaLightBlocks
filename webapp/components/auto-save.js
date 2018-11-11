import BlocklyDesigner from './blockly-designer/index.js';
import ProjectName from './project-name.js';

const LOCAL_STORAGE_ITEM = 'HEPIA_BLOCKLY_LAST';

class AutoSaveService {
    constructor() {
        this.loadAutoSaved();
        BlocklyDesigner.instance.addChangeListener(code => this.autoSave());
    }

    loadAutoSaved() {
        const savedStr = localStorage.getItem(LOCAL_STORAGE_ITEM);
        if (!savedStr) return;
        try {
            const saved = JSON.parse(savedStr);
            BlocklyDesigner.instance.loadXml(saved.xml);
            ProjectName.instance.setProjectName(saved.projectName);
        } catch (err) {}
    }

    autoSave() {
        localStorage.setItem(
            LOCAL_STORAGE_ITEM,
            JSON.stringify({
                projectName: ProjectName.instance.projectName,
                xml: BlocklyDesigner.instance.getXml()
            })
        );
    }
}

const autoSaveService = new AutoSaveService();

export default autoSaveService;

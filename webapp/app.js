import './components/index.js';

import BlocklyDesigner from './components/blockly-designer/index.js';
import { downloadFile } from './components/tools/file-tools.js';

const projectName = $('[name="project-name"]');
const saveBtn = $('.save-btn');
saveBtn.click(() => {
    projectName.val(projectName.val() || 'hepialight-untitled');
    downloadFile(projectName.val() + '.xml', BlocklyDesigner.instance.getXml());
});

$('.left-panel').resizable({
    handleSelector: '.splitter',
    resizeHeight: false,
    resizeWidthFrom: 'right',
    onDragEnd: () => BlocklyDesigner.instance.resize()
});
